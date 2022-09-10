import * as utils from "../../../utils";

import { defaults } from "../../../../src/shared/defaults";
import { iSettings, iSettingsService } from "../../../../src/shared/types/settings";
import { iStorageService } from "../../../../src/shared/types/storage";
import * as settingsService from "../../../../src/core/services/settings";
import * as storageService from "../../../../src/core/services/storage";

const TMP_PATH = "./test/unit/core/services/settings-service-tmp.tdp";

let settings: iSettingsService;
let storage: iStorageService;

const TEST_DATA = { autoUpdate: false, themeMode: "dark" };

describe("settings service", () => {
	beforeAll(async () => {
		storage = storageService.storage("file", { path: TMP_PATH });
	});

	beforeEach(async () => {
		storage.createStore(TEST_DATA);
		settings = settingsService.settings(storage);
	});

	afterEach(async () => {
		storage.destroyStore();
	});

	async function updateAndCheckField<T extends keyof iSettings>(field: T, initialValue: iSettings[T]["value"], value: iSettings[T]["value"]) {
		const resultBefore = await settings.getSettings();
		expect(resultBefore[field]).toBe(initialValue);

		await settings.updateSettingsField(field, value);
		const resultAfter = await settings.getSettings();
		expect(resultAfter[field]).toBe(value);
	}

	describe("updateSettingsField", () => {
		it("updates individual settings fields", async () => {
			await updateAndCheckField("autoUpdate", false, true);
			await updateAndCheckField("themeMode", "dark", "light");
		});
	});
});
