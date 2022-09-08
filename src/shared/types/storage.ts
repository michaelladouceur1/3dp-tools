export interface iStorageService {
	saveData: (data: any, options: iFSSaveData) => void;
	getData: () => Object;
}

export interface iFSOptions {
	path: string;
	encoding?: BufferEncoding;
}

export interface iFSSaveData {
	type: "ow" | "now";
}
