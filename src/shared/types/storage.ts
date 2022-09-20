const EventEmitter = require("events");

export interface iStorageService {
	getStateEmitter: () => typeof EventEmitter;
	createStore: (data?: any) => void;
	destroyStore: () => void;
	getState: () => Promise<any>;
	setState: (data: any, options: iFSSetState) => Promise<any>;
	setStateField: (field: any, value: any, options: iFSSetState) => Promise<any>;
	setStateItem: (item: any, options: iFSSetState) => Promise<any>;
	setStateItemField: (id: number, field: any, value: any, options: iFSSetState) => Promise<any>;
}

export interface iStorageSaveService {
	createStore: (data?: any) => void;
	destroyStore: () => void;
	getSavedState: () => Promise<any>;
	setSavedState: (data: any, options: iFSSetState) => Promise<any>;
}

export interface iFSOptions {
	path: string;
	encoding?: BufferEncoding;
}

export interface iFSSetState {
	type: "ow" | "now";
	save?: boolean;
	saveDelay?: number;
}
