import {TGBotRenderedMessage} from '../interfaces/rendered-message';
import * as semantic from 'semantic-release';
import * as request from 'request';

export async function sendMessage(
	message: TGBotRenderedMessage,
	discordWebHook: string | number,
	{logger}: semantic.Context,
): Promise<void> {
	// const token: string | undefined = process.env[DISCORD_WEBHOOK];
	// const bot = new TelegramBot(token, {polling: false});

	const body = {
		username: 'Semantic Release Discord Bot',
		avatar_url: '',
		content: message.message,
	};

	return new Promise((resolve, reject) => {
		logger.log(`Sending message to Discord`);
		request
			.post(String(discordWebHook), {
				headers: {'Content-type': 'application/json'},
				body,
			})
			.on('error', e => {
				logger.log(`Request error handled: ${JSON.stringify(e)}`);
				reject(e);
			})
			.on('complete', result => {
				logger.log(`Request result: ${JSON.stringify(result)}`);
				resolve();
			});
	});
}
