import * as utils from "../../../utils";

import { info } from "../../../../src/core/services/info";
import { iStorageSaveService } from "../../../../src/shared/types/storage";
import { fileStorage } from "../../../../src/lib/file-storage";

const TMP_PATH = "./test/unit/core/services/storage-service-tmp.tdp";

let store: iStorageSaveService;

const TEST_DATA = { autoUpdate: false, themeMode: "dark" };

describe("storage service (file)", () => {
	describe("createStore", () => {
		it("creates a new file store at given path", async () => {
			store = fileStorage(info(), { path: TMP_PATH });
			await store.createStore();
			expect(utils.fileExists(TMP_PATH)).toBe(true);
		});

		it("creates a new file store at given path with provided data", async () => {
			store = fileStorage(info(), { path: TMP_PATH });
			await store.createStore(TEST_DATA);
			expect(utils.fileExists(TMP_PATH)).toBe(true);
			expect(await utils.getData(TMP_PATH)).toMatchObject(TEST_DATA);
		});

		it("throws error when empty path is provided", async () => {
			expect(() => {
				store = fileStorage(info(), { path: "" });
			}).toThrow();
		});
	});

	describe("destroyStore", () => {
		it("destroys file store", async () => {
			store = fileStorage(info(), { path: TMP_PATH });
			await store.createStore();
			expect(utils.fileExists(TMP_PATH)).toBe(true);

			await store.destroyStore();
			expect(utils.fileExists(TMP_PATH)).toBe(false);
		});
	});

	describe("getSavedState", () => {
		beforeEach(async () => {
			store = fileStorage(info(), { path: TMP_PATH });
			await store.createStore();
		});

		afterEach(async () => {
			await store.destroyStore();
		});

		it("reads saved state", async () => {
			await utils.writeData(TMP_PATH, TEST_DATA);
			const result = await store.getSavedState();
			expect(result).toMatchObject(TEST_DATA);
		});
	});

	describe("setSavedState", () => {
		beforeEach(async () => {
			store = fileStorage(info(), { path: TMP_PATH });
			await store.createStore();
		});

		afterEach(async () => {
			await store.destroyStore();
		});

		it("updates saved object state", async () => {
			await store.setSavedState(TEST_DATA, { type: "ow" });
			const result = await utils.getData(TMP_PATH);
			expect(result).toMatchObject(TEST_DATA);
		});

		it("updates saved string state", async () => {
			const data = "test data";
			await store.setSavedState(data, { type: "ow" });
			const result = await utils.getData(TMP_PATH);
			expect(typeof result).toBe("string");
			expect(result).toBe(data);
		});
	});
});
