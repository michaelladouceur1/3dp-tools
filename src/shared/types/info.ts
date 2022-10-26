const EventEmitter = require("events");

export interface iInfoService {
	getStateEmitter: () => typeof EventEmitter;
	info: ({ message, details, timeout }: iInfoOptions) => void;
	error: ({ message, details, code, timeout }: iErrorOptions) => void;
}

export interface iInfoOptions {
	message: string;
	details?: string;
	timeout?: number;
}

export interface iErrorOptions {
	message: string;
	details?: string;
	code?: number;
	timeout?: number;
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
