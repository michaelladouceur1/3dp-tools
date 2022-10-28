import { iStorageService } from "../../../../src/shared/types/storage";
import { iSettingsService } from "../../../../src/shared/types/settings";
import { iPrint, iPrintsService } from "../../../../src/shared/types/prints";
import { defaults } from "../../../../src/shared/defaults";
import { info } from "../../../../src/core/services/info";
import * as storageService from "../../../../src/core/services/storage";
import * as settingsService from "../../../../src/core/services/settings";
import * as printsService from "../../../../src/core/services/prints";

const TMP_SETTINGS_PATH = "./test/unit/core/services/settings-service-tmp.tdp";
const TMP_PRINTS_PATH = "./test/unit/core/services/prints-service-tmp.tdp";

let settingsStorage: iStorageService;
let printsStorage: iStorageService;
let settings: iSettingsService;
let prints: iPrintsService;

const SETTINGS_DATA = { autoSave: { description: "", value: true }, autoSaveDelay: { description: "", value: 0 } };

describe("prints service", () => {
	beforeEach(async () => {
		settingsStorage = storageService.storage(info(), "file", "", { path: TMP_SETTINGS_PATH });
		await settingsStorage.createStore(SETTINGS_DATA);
		settings = await settingsService.settings(settingsStorage);

		printsStorage = storageService.storage(info(), "file", "", { path: TMP_PRINTS_PATH });
		await printsStorage.createStore([]);
		prints = await printsService.prints(printsStorage, settings);
	});

	afterEach(async () => {
		await settingsStorage.destroyStore();
		await printsStorage.destroyStore();
	});

	const addPrints = async (n: number) => {
		for (let i = 0; i < n - 1; i++) {
			await prints.addPrint({ name: `model-${i + 1}`, description: `model ${i + 1} stl file` });
		}
		return prints.addPrint({ name: `model-${n + 1}`, description: `model ${n + 1} stl file` });
	};

	describe("addPrint", () => {
		it("adds print", async () => {
			const [print]: iPrint[] = await addPrints(1);
			const [result] = await prints.addPrint(print);
			expect(result).toMatchObject(print);
		});

		it("adds multiple prints with unique IDs", async () => {
			const print: iPrint[] = await addPrints(2);
			const result = await prints.getPrints();
			expect(result).toHaveLength(2);
			expect(result[0]).toMatchObject(print[0]);
			expect(result[0].id).toBe(1);
			expect(result[1]).toMatchObject(print[1]);
			expect(result[1].id).toBe(2);
		});
	});

	describe("updatePrint", () => {
		it("updates print", async () => {
			const [print]: iPrint[] = await addPrints(1);
			const [addResult] = await prints.addPrint(print);
			expect(addResult).toMatchObject(print);

			print.name = "knight-model";
			const [updateResult] = await prints.updatePrint(print);
			expect(updateResult).toMatchObject(print);
		});

		// it('updates print with multiple prints in store', async () => {})
	});

	describe("updatePrintField", () => {
		// it('updates print field by ID', async () => {})
	});

	describe("deletePrint", () => {
		it("deletes print by passing print object", async () => {
			const print: iPrint[] = await addPrints(3);
			expect(await prints.getPrints()).toHaveLength(3);
			await prints.deletePrint(print[1]);
			expect(await prints.getPrints()).toHaveLength(2);
		});

		it("deletes print by id", async () => {
			await addPrints(3);
			expect(await prints.getPrints()).toHaveLength(3);
			await prints.deletePrint(2);
			expect(await prints.getPrints()).toHaveLength(2);
		});

		it("does not delete print if id is not found", async () => {
			await addPrints(3);
			expect(await prints.getPrints()).toHaveLength(3);
			await prints.deletePrint(10);
			expect(await prints.getPrints()).toHaveLength(3);
		});
	});
});
