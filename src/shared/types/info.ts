const EventEmitter = require("events");

export interface iInfoService {
	getStateEmitter: () => typeof EventEmitter;
	info: (message: string, details?: string, timeout?: number) => void;
	error: (message: string, details?: string, code?: number, timeout?: number) => void;
}

export interface iInfoState {
	current_log: iInfoLog;
	logs: iInfoLog[];
}

export interface iInfoLog {
	type: "info" | "error" | null;
	message: string;
	details?: string;
	code?: number | null;
	timestamp: number | null;
}
