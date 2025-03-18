import { Message } from 'node-telegram-bot-api';  // Используйте правильный импорт
import { TelegramService } from "@/modules/telegram/telegram.service";

export default class TelegramController {
    private telegramService: TelegramService;

    constructor(telegramService: TelegramService) {
        this.telegramService = telegramService;
    }

    async handleWebhook(request: Request) {
        try {
            const body: { message?: Message } = await request.json();  // Применяем правильный тип Message
            await this.telegramService.processMessage(body);
            return new Response("OK", { status: 200 });
        } catch (error) {
            console.error("Error processing webhook:", error);
            return new Response("Bad Request", { status: 400 });
        }
    }
}
