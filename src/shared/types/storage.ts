export interface iStorageService {
	createStore: (data?: any) => void;
	destroyStore: () => void;
	getState: () => Promise<any>;
	setState: (data: any, options: iFSSetState) => Promise<any>;
	setStateField: (field: any, value: any, options: iFSSetState) => Promise<any>;
	setSavedState: (data: any, options: iFSSetState) => Promise<void>;
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
