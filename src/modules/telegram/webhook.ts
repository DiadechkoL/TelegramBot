import { Router } from 'itty-router';
// import { Request } from '@cloudflare/workers-types';
import axios from 'axios';
import { Message, User, Chat } from "node-telegram-bot-api";


const TOKEN = '7852315257:AAEkKj3XHgIkOliNATcj3CDznHis_AQHu_k';
const WEBHOOK_URL = 'https://phantomsecondline.telegram-project-bot.workers.dev/api/bot/webhook';

const router = Router();

interface TelegramMessage {
    message?: Message;
    message_id: number;
    message_thread_id?: number | undefined;
    from?: User | undefined;
    date: number;
    chat: Chat;
}


// Обработка вебхука Telegram
router.post('/api/bot/webhook', async (request) => {
  try {
    const body: TelegramMessage = await request.json();
    console.log('Received update:', JSON.stringify(body, null, 2));

    if (body.message) {
      const chatId = body.message.chat.id;
      const text = body.message.text || 'Нет текста';

      // Отправляем ответное сообщение
      await axios.post(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
        chat_id: chatId,
        text: `Вы сказали: ${text}`,
      });
    }

    return new Response('OK', { status: 200 });
  } catch (error) {
    console.error('Ошибка обработки вебхука:', error);
    return new Response('Bad Request', { status: 400 });
  }
});

// Устанавливаем вебхук при запуске Cloudflare Workers
async function setWebhook() {
  try {
    const response = await axios.post(`https://api.telegram.org/bot${TOKEN}/setWebhook`, {
      url: WEBHOOK_URL,
    });
    console.log('Webhook установлен:', response.data);
  } catch (error) {
    console.error('Ошибка установки вебхука:', error);
  }
}

export default {
  async fetch(request, env, ctx) {
    return router.handle(request) || new Response('Not Found', { status: 404 });
  },
};

setWebhook();
