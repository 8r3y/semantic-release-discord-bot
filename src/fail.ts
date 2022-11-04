import {TGBotConfig} from './interfaces/config';
import * as semantic from 'semantic-release';
import {asArray} from './helpers/as-array';
import * as micromatch from 'micromatch';
import {TGBotMessage, TGBotMessageTemplate} from './interfaces/message';
import {TGBotRenderedMessage} from './interfaces/rendered-message';
import {renderMessage} from './common/render-message';
import {sendMessage} from './common/send-message';
import {defaultFailMessage} from './common/default-fail-message';

export async function fail(config: TGBotConfig, context: semantic.Context) {
	const {
		logger,
		// @ts-ignore
		errors,
		env: {SEMANTIC_RELEASE_PACKAGE, npm_package_name, DISCORD_WEBHOOK},
		// @ts-ignore
		branch,
		lastRelease,
		nextRelease,
		commits,
	} = context;
	const packageName = config.packageName || SEMANTIC_RELEASE_PACKAGE || npm_package_name;

	for (const notification of asArray(config.notifications)) {
		const notify: boolean = notification.notifyOnFail ?? config.notifyOnFail ?? false;

		if (notify) {
			const message: TGBotMessage | TGBotMessageTemplate | undefined =
				notification.fail ?? config.fail ?? (nextRelease && defaultFailMessage(packageName, errors));

			if (message && (!notification.branch || micromatch.isMatch(branch.name, notification.branch))) {
				const renderedMessage: TGBotRenderedMessage = renderMessage(message, {
					packageName,
					branch,
					lastRelease,
					nextRelease,
					commits,
					errors,
				});

				logger.log(`Sending telegram notification on fail (branch = ${notification.branch || 'all'})...`);

				await sendMessage(renderedMessage, DISCORD_WEBHOOK, context);
			}
		}
	}
}
