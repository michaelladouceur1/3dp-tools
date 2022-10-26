import { info } from "../../../../src/core/services/info";
import { ipcChannels } from "../../../../src/shared/ipc-channels";
import { iInfoLog, iInfoService } from "../../../../src/shared/types/info";

let infoService: iInfoService | undefined;
let infoState: iInfoLog | undefined;

describe("info service", () => {
	beforeEach(() => {
		infoService = info();

		infoService.getStateEmitter().on(ipcChannels.info.data, (data: any) => {
			infoState = data;
		});
	});

	afterEach(() => {
		infoService = undefined;
		infoState = undefined;
	});

	describe("info", () => {
		it("sets an info log", () => {
			const msg = "Data Saved";
			infoService?.info({ message: msg });

			expect(infoState?.type).toBe("info");
			expect(infoState?.message).toBe(msg);
		});

		it("sets an info log and clears it after a given timeout", async () => {
			const timeout = 500;
			const msg = "Data Updated";
			infoService?.info({ message: msg, timeout: timeout });

			expect(infoState?.type).toBe("info");
			expect(infoState?.message).toBe(msg);

			// sleep for timeout to clear log
			await new Promise((r) => setTimeout(r, timeout + 100));

			expect(infoState?.type).toBe(null);
			expect(infoState?.message).toBe("");
		});
	});

	describe("error", () => {
		it("sets an error log", () => {
			const msg = "Data Saved";
			infoService?.error({ message: msg });

			expect(infoState?.type).toBe("error");
			expect(infoState?.message).toBe(msg);
		});

		it("sets an error log and clears it after a given timeout", async () => {
			const timeout = 500;
			const msg = "Data Updated";
			infoService?.error({ message: msg, timeout: timeout });

			expect(infoState?.type).toBe("error");
			expect(infoState?.message).toBe(msg);

			// sleep for timeout to clear log
			await new Promise((r) => setTimeout(r, timeout + 100));

			expect(infoState?.type).toBe(null);
			expect(infoState?.message).toBe("");
		});
	});
});
