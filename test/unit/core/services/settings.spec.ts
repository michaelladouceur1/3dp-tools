import * as utils from "../../../utils";

import { defaults } from "../../../../src/shared/defaults";
import { iSettings, iSettingsService } from "../../../../src/shared/types/settings";
import { iStorageService } from "../../../../src/shared/types/storage";
import * as settingsService from "../../../../src/core/services/settings";
import * as storageService from "../../../../src/core/services/storage";

const TMP_PATH = "./test/unit/core/services/settings-service-tmp.tdp";

let settings: iSettingsService;
let storage: iStorageService;

const TEST_DATA = { autoSave: { description: "", value: false }, autoSaveDelay: { description: "", value: 0 }, uiMode: { description: "", value: "dark" } };

describe("settings service", () => {
	// beforeAll(async () => {
	// 	storage = storageService.storage("file", "", { path: TMP_PATH });
	// });

	beforeEach(async () => {
		storage = storageService.storage("file", "", { path: TMP_PATH });
		await storage.createStore(TEST_DATA);
		settings = await settingsService.settings(storage);
	});

	afterEach(async () => {
		storage.destroyStore();
	});

	describe("updateSettingsField", () => {
		it("updates individual settings fields", async () => {
			const resultBefore = await settings.getSettings();
			expect(resultBefore["autoSave"]["value"]).toBe(false);

			await settings.updateSettingsField("autoSave.value", true);
			const resultAfter = await settings.getSettings();
			expect(resultAfter["autoSave"]["value"]).toBe(true);
			// await updateAndCheckField("autoSave.value", false, true);
			// await updateAndCheckField("uiMode.value", "dark", "light");
		});
	});
});
