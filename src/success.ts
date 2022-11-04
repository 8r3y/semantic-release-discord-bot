import {TGBotConfig} from './interfaces/config';
import * as semantic from 'semantic-release';
import {asArray} from './helpers/as-array';
import {sendMessage} from './common/send-message';
import {defaultSuccessMessage} from './common/default-success-message';

export async function success(config: TGBotConfig, context: semantic.Context) {
	const {
		env: {SEMANTIC_RELEASE_PACKAGE, npm_package_name, DISCORD_WEBHOOK},
		// @ts-ignore
		branch,
		nextRelease,
	} = context;
	const packageName = config.packageName || SEMANTIC_RELEASE_PACKAGE || npm_package_name;
	console.info('Discord start success', packageName);

	for (const notification of asArray(config.notifications)) {
		const notify: boolean = notification.notifyOnSuccess ?? config.notifyOnSuccess ?? true;
		console.info('Discord notification', notification);

		if (notify) {
			const message = nextRelease && defaultSuccessMessage(packageName, nextRelease);

			console.info('Discord notification message', message);
			if (message) {
				await sendMessage(message, DISCORD_WEBHOOK, context);
			}
		}
	}
}
