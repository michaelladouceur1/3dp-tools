import { info } from "../../../../src/core/services/info";
import { iFSSetState, iStorageService } from "../../../../src/shared/types/storage";
import { storage } from "../../../../src/core/services/storage";

const TMP_PATH = "./test/unit/core/services/storage-service-tmp.tdp";

let store: iStorageService;

const TEST_DATA = { autoUpdate: false, themeMode: "dark" };

describe("storage service", () => {
	beforeEach(async () => {
		store = storage(info(), "file", "", { path: TMP_PATH });
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

	describe("setState", () => {
		it("should update state", async () => {
			expect(await store.getState()).toBe("");
			await store.setState(TEST_DATA, { type: "now", save: false });
			expect(await store.getState()).toMatchObject(TEST_DATA);
		});
	});

	describe("setStateField", () => {
		it("should update state field", async () => {
			const options: iFSSetState = { type: "now", save: false };

			await store.setState(TEST_DATA, options);
			expect(await store.getState()).toMatchObject(TEST_DATA);

			await store.setStateField("autoUpdate", true, options);
			await store.setStateField("themeMode", "light", options);
			const updatedData = await store.getState();
			expect(updatedData["autoUpdate"]).toBe(true);
			expect(updatedData["themeMode"]).toBe("light");
		});
	});
});
