import * as semantic from 'semantic-release';
import {TGBotMessage} from '../interfaces/message';

export function defaultSuccessMessage(packageName: string, nextRelease: semantic.NextRelease): TGBotMessage {
	let message: string = `:rocket: **${packageName} v${nextRelease.version}** has been released!`

	if (nextRelease.notes) {
		message += `\n${nextRelease.notes}`;
	}

	return {
		message,
		format: 'markdown'
	}
}
