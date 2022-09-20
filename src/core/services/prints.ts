import { iPrint, iPrintsService } from "../../shared/types/prints";
import { iSettingsService } from "../../shared/types/settings";
import { iFSSetState, iStorageService } from "../../shared/types/storage";

export function prints(storage: iStorageService, settings: iSettingsService): iPrintsService {
	function store() {
		return storage;
	}

	async function getPrints() {
		return await storage.getState();
	}

	async function addPrint(print: iPrint) {
		const { autoSave, autoSaveDelay } = await settings.getSettings();
		const prints: iPrint[] = await getPrints();
		await storage.setState([...prints, print], { type: "ow", save: autoSave.value, saveDelay: autoSaveDelay.value });
		return await getPrints();
	}

	async function updatePrint(print: iPrint): Promise<iPrint[]> {
		const { autoSave, autoSaveDelay } = await settings.getSettings();
		await storage.setStateItem(print, { type: "ow", save: autoSave.value, saveDelay: autoSaveDelay.value });
		return await getPrints();
	}

	async function updatePrintField<T extends keyof iPrint>(id: number, field: T, value: iPrint[T]) {
		const { autoSave, autoSaveDelay } = await settings.getSettings();
		await storage.setStateItemField(id, field, value, { type: "ow", save: autoSave.value, saveDelay: autoSaveDelay.value });
		return await getPrints();
	}

	async function deletePrint(print: iPrint) {
		return storage.getState();
	}

	return { store, getPrints, addPrint, updatePrint, updatePrintField, deletePrint };
}
