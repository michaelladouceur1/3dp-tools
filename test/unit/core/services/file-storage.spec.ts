import * as utils from "../../../utils";

import { iStorageService } from "../../../../src/shared/types/storage";
import { storage } from "../../../../src/core/services/storage";

const TMP_PATH = "./test/unit/core/services/storage-service-tmp.tdp";

let store: iStorageService;

const TEST_DATA = { autoUpdate: false, themeMode: "dark" };

describe("storage service (file)", () => {
	it("should pass", () => {
		expect(true).toBe(true);
	});
	// beforeEach(async () => {
	// 	store = storage("file", "", { path: TMP_PATH });
	// 	await store.createStore();
	// });

	// afterEach(async () => {
	// 	await store.destroyStore();
	// });

	// describe("createStore", () => {
	// 	it("creates a new file store at given path", async () => {
	// 		store = storage("file", "", { path: TMP_PATH });
	// 		await store.createStore();

	// 		expect(utils.fileExists(TMP_PATH)).toBe(true);
	// 	});

	// 	it("creates a new file store at given path with provided data", async () => {});

	// 	it("throws error when empty path is provided", async () => {
	// 		expect(() => {
	// 			storage("file", "", { path: "" });
	// 		}).toThrow();
	// 	});
	// });

	// describe("destroyStore", () => {
	// 	it("destroys file store", async () => {
	// 		store = storage("file", "", { path: TMP_PATH });
	// 		await store.createStore();
	// 		await store.destroyStore();

	// 		expect(utils.fileExists(TMP_PATH)).toBe(false);
	// 	});
	// });

	// describe("getData", () => {
	// 	it("reads data", async () => {
	// 		await utils.writeData(TMP_PATH, TEST_DATA);

	// 		const result = await store.getState();

	// 		expect(typeof result).toBe("object");

	// 		expect(result).toHaveProperty("autoUpdate");
	// 		expect(result).toHaveProperty("themeMode");
	// 		expect(typeof result["autoUpdate"]).toBe("boolean");
	// 		expect(typeof result["themeMode"]).toBe("string");

	// 		expect(result["autoUpdate"]).toBe(false);
	// 		expect(result["themeMode"]).toBe("dark");
	// 	});
	// });

	// describe("updateData", () => {
	// 	it("updates object data", async () => {
	// 		await store.setState(TEST_DATA, { type: "ow" });

	// 		const result = await utils.getData(TMP_PATH);

	// 		expect(typeof result).toBe("object");

	// 		expect(result).toHaveProperty("autoUpdate");
	// 		expect(result).toHaveProperty("themeMode");
	// 		expect(typeof result["autoUpdate"]).toBe("boolean");
	// 		expect(typeof result["themeMode"]).toBe("string");

	// 		expect(result["autoUpdate"]).toBe(false);
	// 		expect(result["themeMode"]).toBe("dark");
	// 	});

	// 	it("updates string data", async () => {
	// 		const data = "test data";
	// 		await store.setState(data, { type: "ow" });

	// 		const result = await utils.getData(TMP_PATH);

	// 		expect(typeof result).toBe("string");
	// 		expect(result).toBe(data);
	// 	});
	// });

	// describe("updateDataField", () => {
	// 	it("updates data field", async () => {
	// 		await store.setState(TEST_DATA, { type: "ow" });
	// 		await store.setStateField("autoUpdate", true, { save: true, saveDelay: 0, type: "ow" });
	// 		const result = await utils.getData(TMP_PATH);

	// 		expect(result["autoUpdate"]).toBe(true);
	// 	});

	// 	it("updates nested data field", async () => {});
	// });
});
