import {renderMessage} from '../src/common/render-message';
import {sendMessage} from '../src/common/send-message';
import {TGBotRenderedMessage} from '../src/interfaces/rendered-message';

describe('Render message', () => {
	describe('Markdown', () => {
		it('Message should render correctly', async () => {
			const renderedMessage: TGBotRenderedMessage = renderMessage({message: '**Title**\nContent'});

			expect(renderedMessage.message).toBe('*Title*\nContent');
			expect(renderedMessage.format).toBe('markdown');
		});

		it('Message should render context correctly', async () => {
			const renderedMessage: TGBotRenderedMessage = renderMessage(
				{message: '**${title}**\n${content}'},
				{title: 'Title', content: 'Content'},
			);

			expect(renderedMessage.message).toBe('*Title*\nContent');
			expect(renderedMessage.format).toBe('markdown');
		});
	});

	describe('HTML', () => {
		it('Message should render correctly', async () => {
			const renderedMessage: TGBotRenderedMessage = renderMessage({
				message: '<b>Title</b>\nContent',
				format: 'html',
			});

			expect(renderedMessage.message).toBe('<b>Title</b>\nContent');
			expect(renderedMessage.format).toBe('html');
		});

		it('Message should render context correctly', async () => {
			const renderedMessage: TGBotRenderedMessage = renderMessage(
				{message: '<b>${title}</b>\n${content}', format: 'html'},
				{title: 'Title', content: 'Content'},
			);

			expect(renderedMessage.message).toBe('<b>Title</b>\nContent');
			expect(renderedMessage.format).toBe('html');
		});
	});
});

describe('Render template message', () => {
	describe('Markdown', () => {
		it('Message should render correctly', async () => {
			const renderedMessage: TGBotRenderedMessage = renderMessage({path: './tests/common/message.md'});

			expect(renderedMessage.message.replace(/\s+/g, '')).toBe('_Title_Content');
			expect(renderedMessage.format).toBe('markdown');
		});

		it('Message should render context correctly', async () => {
			const renderedMessage: TGBotRenderedMessage = renderMessage(
				{path: './tests/common/message-context.md'},
				{title: 'Title', content: 'Content'},
			);

			expect(renderedMessage.message.replace(/\s+/g, '')).toBe('_Title_Content');
			expect(renderedMessage.format).toBe('markdown');
		});
	});

	describe('HTML', () => {
		it('Message should render correctly', async () => {
			const renderedMessage: TGBotRenderedMessage = renderMessage({path: './tests/common/message.html'});

			expect(renderedMessage.message.replace(/\s+/g, '')).toBe('<b>Title</b>Content');
			expect(renderedMessage.format).toBe('html');
		});

		it('Message should render context correctly', async () => {
			const renderedMessage: TGBotRenderedMessage = renderMessage(
				{path: './tests/common/message-context.html'},
				{title: 'Title', content: 'Content'},
			);

			expect(renderedMessage.message.replace(/\s+/g, '')).toBe('<b>Title</b>Content');
			expect(renderedMessage.format).toBe('html');
		});
	});

	describe('Manual Send', () => {
		it('Message should send correctly', async () => {
			const renderedMessage = {
				message:
					'**@2people-it/vats-ami-adapter v1.1.16** has been released!\n' +
					'## [1.1.16](https://github.com/2people-IT/vats-ami-adapter/compare/v1.1.15...v1.1.16) (2022-11-04)\n' +
					'\n' +
					'\n' +
					'### Bug Fixes\n' +
					'\n' +
					'* bump version ([4ebc087](https://github.com/2people-IT/vats-ami-adapter/commit/4ebc08732ee568b2cd3c59aebfcf15b272f482a8))\n' +
					'\n' +
					'\n' +
					'\n',
				format: 'markdown',
			} as TGBotRenderedMessage;

			if (!process.env.DISCORD_WEBHOOK) {
				throw 'Cannot get process.env.DISCORD_WEBHOOK';
			}

			const logger = console;
			sendMessage(renderedMessage, process.env.DISCORD_WEBHOOK, {logger} as any);

			expect(true).toBe(true);
		});
	});
});
