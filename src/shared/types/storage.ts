export interface iStorageService {
	updateData: (data: any, options: iFSUpdateData) => void;
	updateDataField: (field: any, value: any) => void;
	getData: () => any;
	createStore: (data?: any) => void;
	destroyStore: () => void;
}

export interface iFSOptions {
	path: string;
	encoding?: BufferEncoding;
}

export interface iFSUpdateData {
	type: "ow" | "now";
}
