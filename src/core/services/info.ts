const EventEmitter = require("events");
import { ipcChannels } from "../../shared/ipc-channels";
import { iInfoService, iInfoState, iInfoLog } from "../../shared/types/info";

export function info(): iInfoService {
	const eventEmitter = new EventEmitter();

	let infoTimeout: any = undefined;
	const state: iInfoState = {
		current_log: {
			type: "info",
			code: 0,
			message: "",
			details: "",
			timestamp: null,
		},
		logs: [],
	};

	function stateChange() {
		eventEmitter.emit(ipcChannels.info.data, state.current_log);
	}

	function getStateEmitter() {
		return eventEmitter;
	}

	function addLog(log: iInfoLog) {
		state.logs = [log, ...state.logs];
		state.current_log = state.logs[0];
		stateChange();
	}

	function clearLog() {
		state.current_log = {
			type: null,
			code: null,
			message: "",
			details: "",
			timestamp: null,
		};
		stateChange();
	}

	function info(message: string, details: string = "", timeout: number = 5000) {
		if (infoTimeout !== undefined) {
			clearTimeout(infoTimeout);
		}

		addLog({ type: "info", message: message, details: details, code: 0, timestamp: Date.now() });

		infoTimeout = setTimeout(() => {
			clearLog();
			clearTimeout(infoTimeout);
		}, timeout);
	}

	function error(message: string, details = "", code = 0, timeout: number = 30000) {
		if (infoTimeout !== undefined) {
			clearTimeout(infoTimeout);
		}

		addLog({ type: "error", message: message, details: details, code: code, timestamp: Date.now() });

		infoTimeout = setTimeout(() => {
			clearLog();
			clearTimeout(infoTimeout);
		}, timeout);
	}

	return { getStateEmitter, info, error };
}
