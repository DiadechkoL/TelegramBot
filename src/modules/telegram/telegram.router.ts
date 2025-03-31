import { Router } from 'itty-router';
import axios from 'axios';
import { Request } from '@cloudflare/workers-types';
import { Message, User, Chat } from "node-telegram-bot-api";

interface TelegramMessage {
    message?: Message;
    message_id: number;
    message_thread_id?: number | undefined;
    from?: User | undefined;
    date: number;
    chat: Chat;
}

const TOKEN = '7852315257:AAEkKj3XHgIkOliNATcj3CDznHis_AQHu_k';
const WEBHOOK_URL = 'https://telegranbot.telegram-project-bot.workers.dev';

const router = Router();

router.post('/api/telegram/update', async (request: Request) => {
    try {
        const body: TelegramMessage = await request.json();
        console.log("Telegram update:", body);

        if (body.message) {
            const chatId = body.message.chat.id;
            const text = body.message.text || '';
            console.log(`Message from ${chatId}: ${text}`);
        }

        return new Response('OK', { status: 200 });
    } catch (error) {
        console.error('Error:', error);
        return new Response('Bad Request', { status: 400 });
    }
});

router.get('/api/telegram/webhook', async () => {
    try {
        await axios.post(`https://api.telegram.org/bot${TOKEN}/setWebhook`, { url: WEBHOOK_URL });
        return new Response('Webhook set successfully', { status: 200 });
    } catch (error) {
        console.error('Webhook error:', error);
        return new Response('Failed to set webhook', { status: 400 });
    }
});

export default router;
