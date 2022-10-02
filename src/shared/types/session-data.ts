import { iStorageService } from "./storage";

export interface iSessionDataService {
	store: () => iStorageService;
	getSessionData: () => Promise<iSessionData>;
	updateSessionData: (sessionData: iSessionData) => Promise<iSessionData>;
	updateSessionDataField: <T extends keyof iSessionData>(field: T, value: iSessionData[T]) => Promise<iSessionData>;
}

export interface iSessionData {
	window: {
		width: number;
		height: number;
		x: number;
		y: number;
	};
	lastBackup: number;
}
