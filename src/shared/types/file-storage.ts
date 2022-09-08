export interface iFS {
	saveData: (data: any, options: iFSSaveData) => void;
	getData: () => Object;
}

export interface iFSOptions {
	path: string;
}

export interface iFSSaveData {
	type: "ow" | "now";
}
