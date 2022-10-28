import { iStorageService } from "./storage";

export interface iPrintsService {
	store: () => iStorageService;
	getPrints: () => Promise<iPrint[]>;
	addPrint: (print: iPrint) => Promise<iPrint[]>;
	updatePrint: (print: iPrint) => Promise<iPrint[]>;
	updatePrintField: <T extends keyof iPrint>(id: number, field: T, value: iPrint[T]) => Promise<iPrint[]>;
	deletePrint: (print: iPrint | number) => Promise<iPrint[]>;
}

export interface iPrints {
	prints: iPrint[];
}

export interface iPrint {
	id?: number;
	name: string;
	description: string;
	// units: "mm" | "cm";
	// volume: number;
	// duration: number;
	// parts: {
	// 	position: {
	// 		x: number;
	// 		y: number;
	// 	};
	// 	footprint: {
	// 		x: number;
	// 		y: number;
	// 	};
	// };
}
