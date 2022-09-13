export interface iStorageService {
	getState: () => any;
	setState: (data: any, options: iFSUpdateData) => void;
	setStateField: (field: any, value: any) => void;
	createStore: (data?: any) => void;
	destroyStore: () => void;
}

export interface iFSOptions {
	path: string;
	encoding?: BufferEncoding;
	saveDelay?: number;
}

export interface iFSUpdateData {
	type: "ow" | "now";
}
