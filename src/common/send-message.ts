const axios = require('axios');
import * as semantic from 'semantic-release';
import {TGBotMessage} from 'src/interfaces/message';

export async function sendMessage(
	renderedMessage: TGBotMessage,
	discordWebHook: string | number,
	{logger}: semantic.Context,
): Promise<void> {
	// const token: string | undefined = process.env[DISCORD_WEBHOOK];
	// const bot = new TelegramBot(token, {polling: false});

	const body = {
		username: 'Semantic Release Discord Bot',
		avatar_url: '',
		content: renderedMessage.message,
	};

	try {
		const url = String(discordWebHook).replace('/api/', '/api/v7/') + '?wait=True';
		console.info('Sending message to Discord', body, url);
		logger.log(`Sending message to Discord`);
		const result = await axios.post(url, JSON.stringify({content: renderedMessage.message}), {
			headers: {'Content-Type': 'application/json'},
		});
		console.info(`Request result: ${JSON.stringify(result)}`);
	} catch (e) {
		console.info(`Request error handled: ${e}`);
		logger.log(`Request error handled: ${JSON.stringify(e)}`);
	}
}
