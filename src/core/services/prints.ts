import { iPrint, iPrintsService } from "../../shared/types/prints";
import { iSettingsService } from "../../shared/types/settings";
import { iFSSetState, iStorageService } from "../../shared/types/storage";
import { getAvailableID } from "../../lib/utils";

export function prints(storage: iStorageService, settings: iSettingsService): iPrintsService {
	function store() {
		return storage;
	}

	async function getPrints() {
		return await storage.getState();
	}

	async function getSetStateSettings(): Promise<iFSSetState> {
		const { autoSave, autoSaveDelay } = await settings.getSettings();
		return { type: "ow", save: autoSave.value, saveDelay: autoSaveDelay.value };
	}

	async function addPrint(print: iPrint) {
		const prints: iPrint[] = await getPrints();
		print.id = getAvailableID(prints);
		await storage.setState([...prints, print], await getSetStateSettings());
		return await getPrints();
	}

	async function updatePrint(print: iPrint): Promise<iPrint[]> {
		await storage.setStateItem(print, await getSetStateSettings());
		return await getPrints();
	}

	async function updatePrintField<T extends keyof iPrint>(id: number, field: T, value: iPrint[T]) {
		await storage.setStateItemField(id, field, value, await getSetStateSettings());
		return await getPrints();
	}

	async function deletePrint(print: iPrint | number) {
		const id = typeof print === "number" ? print : print.id;
		const prints: iPrint[] = await getPrints();
		await storage.setState(
			prints.filter((print) => print.id !== id),
			await getSetStateSettings()
		);
		return await getPrints();
	}

	return { store, getPrints, addPrint, updatePrint, updatePrintField, deletePrint };
}
