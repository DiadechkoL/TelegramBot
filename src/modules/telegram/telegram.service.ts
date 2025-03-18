import { Message } from "node-telegram-bot-api";

export class TelegramService {
    async processMessage(body: { message?: Message }) {
        if (body.message) {
            const chatId = body.message.chat.id;
            const text = body.message.text || '';
            console.log(`Received message from chat ${chatId}: ${text}`);
        }
    }
}
