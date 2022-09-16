import { iServices } from "../../shared/types/services";
import { iPluginInvokeRequest, iPluginInvokeTargets } from "../../shared/types/plugins";
import { iSettings } from "../../shared/types/settings";

export class BasePlugin {
	services: iServices;

	constructor(services: iServices) {
		this.services = services;
	}

	async invoke({ target, data }: iPluginInvokeRequest) {
		const { settings } = this.services;

		const targets: iPluginInvokeTargets = {
			"settings.getSettings": async (data: void) => {
				return await settings.getSettings();
			},
			"settings.updateSettings": async (data: iSettings) => {
				return await settings.updateSettings(data);
			},
			"settings.updateSettingsField": async <T extends keyof iSettings>({ field, value }: { field: T; value: iSettings[T]["value"] }) => {
				return await settings.updateSettingsField(field, value);
			},
		};

		if (!Object.keys(targets).includes(target)) {
			let errorString = `BasePlugin invoke parameter: ${target} is not a valid entry. Following are valid targets:\n`;

			Object.keys(targets).forEach((target) => {
				errorString += `  -${target}\n`;
			});

			throw new Error(errorString);
		}

		try {
			return await targets[target](data);
		} catch (error) {
			console.log(error);
		}
	}
}
