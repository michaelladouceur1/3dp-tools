const EventEmitter = require("events");

import { iInfoService } from "../../shared/types/info";
import { iStorageService, iFSOptions, iFSSetState } from "../../shared/types/storage";
import { fileStorage } from "../../lib/file-storage";

interface iStorageTypes {
	file: iFSOptions;
}

// TODO: add storageModule for memory storage
export function storage<T extends keyof iStorageTypes>(
	infoService: iInfoService,
	storageType: T,
	stateChangeEvent: string,
	options: iStorageTypes[T]
): iStorageService {
	const eventEmitter = new EventEmitter();
	const storageModules = { file: fileStorage(infoService, options) };
	const storageModule = storageModules[storageType];

	let state: any;

	async function stateChange() {
		eventEmitter.emit(stateChangeEvent, state);
	}

	function getStateEmitter() {
		return eventEmitter;
	}

	async function createStore(data: any) {
		return await storageModule.createStore(data);
	}

	async function destroyStore() {
		return await storageModule.destroyStore();
	}

	async function getState() {
		if (!state) {
			const result = await storageModule.getSavedState();
			await setStateWithoutSave(result);
		}

		return state;
	}

	async function setState(data: any, options: iFSSetState) {
		await setStateWithoutSave(data);
		return await storageModule.setSavedState(state, options);
	}

	async function setStateField(field: any, value: any, options: iFSSetState) {
		const reducedState = reduceData(state, field, value);
		await setStateWithoutSave(reducedState);
		return await storageModule.setSavedState(state, options);
	}

	// TODO: throw errors for not array and item.id === undefined
	async function setStateItem(item: any, options: iFSSetState) {
		if (!Array.isArray(state)) return;
		if (item.id === undefined) return;

		await setStateWithoutSave([...state.filter((i: any) => i.id !== item.id), item]);
		return await storageModule.setSavedState(state, options);
	}

	// TODO: throw errors for not array
	async function setStateItemField(id: number, field: any, value: any, options: iFSSetState) {
		if (!Array.isArray(state)) return;

		const item = state.filter((i: any) => i.id === id);
		const reducedItem = reduceData(item, field, value);
		await setStateWithoutSave([...state.filter((i) => i.id !== id), reducedItem]);
		return await storageModule.setSavedState(state, options);
	}

	async function setStateWithoutSave(data: any) {
		state = data;
		stateChange();
	}

	// Function for updating values of nested objects
	// "fields" value is passed as a string that can represent object dot notation (ie: autoUpdatePlugins.value)
	//
	// TODO: Check if the field exists before updating
	// TODO: Check typeof field value being updated and ensure it's being cast as that type
	function reduceData(data: any, fields: any, value: any) {
		const fieldsArr = fields.split(".");

		if (fieldsArr.length === 1) return { ...data, [fieldsArr[0]]: value };

		const leftReduced = fieldsArr.reduce(
			(acc: any, cv: any, idx: number, arr: any) => {
				if (idx === arr.length - 1) return [...acc[1]];
				return [acc[0][cv], [...acc[1], acc[0][cv]]];
			},
			[data, []]
		);

		const rightReduced = leftReduced.reduceRight((acc: any, cv: any, idx: number, arr: any) => {
			if (idx === arr.length - 1) return { ...cv, [fieldsArr[idx + 1]]: value };
			return { ...cv, [fieldsArr[idx + 1]]: acc };
		}, leftReduced[leftReduced.length - 1]);

		return { ...data, [fieldsArr[0]]: rightReduced };
	}

	return { getStateEmitter, createStore, destroyStore, getState, setState, setStateField, setStateItem, setStateItemField };
}
