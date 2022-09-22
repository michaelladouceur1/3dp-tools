import * as utils from "../../../utils";

import { iStorageService } from "../../../../src/shared/types/storage";
import { storage } from "../../../../src/core/services/storage";

const TMP_PATH = "./test/unit/core/services/storage-service-tmp.tdp";

let store: iStorageService;

const TEST_DATA = { autoUpdate: false, themeMode: "dark" };

describe("storage service", () => {
	beforeEach(async () => {
		store = storage("file", "", { path: TMP_PATH });
		await store.createStore();
	});

	afterEach(async () => {
		await store.destroyStore();
	});

	describe("getState", () => {
		it("should return nothing from empty saved state", async () => {
			const data = await store.getState();
			expect(data).toBe("");
		});
	});
});
