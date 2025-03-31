import { Router } from 'itty-router';
import { Request } from '@cloudflare/workers-types';
import { Message, User, Chat } from "node-telegram-bot-api";
import axios from 'axios';


interface TelegramMessage {
    message?: Message;
    message_id: number;
    message_thread_id?: number | undefined;
    from?: User | undefined;
    date: number;
    chat: Chat;
}
const TOKEN = '7852315257:AAEkKj3XHgIkOliNATcj3CDznHis_AQHu_k';
const WEBHOOK_URL = 'https://telegranbot.telegram-project-bot.workers.dev/';

const router = Router();

// // Логирование всех запросов
// router.all('*', async (request: Request) => {
//   console.log("Incoming request:", request.method, request.url);
//   return new Response('Not Found', { status: 404 });
// });

// Обработка сообщений от Telegram
router.post('/api/update', async (request: Request) => {
    try {
      const body: TelegramMessage = await request.json();
      console.log("Request body:", body);
  
      if (body.message) {
        const chatId = body.message.chat.id;
        const text = body.message.text || '';
        console.log(`Received message from chat ${chatId}: ${text}`);
      } else {
        console.log("Received non-message update:", body);
      }
  
      return new Response('OK', { status: 200 });
    } catch (error) {
      console.error('Error processing webhook:', error);
      return new Response('Bad Request', { status: 400 });
    }
  });

  router.get('/api/bot/webhook', async () => {
    try {
      setWebhook();
      
  
      return new Response('OK', { status: 200 });
    } catch (error) {
      console.error('Ошибка обработки вебхука:', error);
      return new Response('Bad Request', { status: 400 });
    }
  });
  
  
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
      return await router.handle(request) || new Response('Not Found', { status: 404 });
    },
  };
  
  





