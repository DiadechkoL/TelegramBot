import { Router } from 'itty-router';
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

const router = Router();

// Логирование всех запросов
router.all('*', async (request: Request) => {
  console.log("Incoming request:", request.method, request.url);
  return new Response('Not Found', { status: 404 });
});

// Обработка сообщений от Telegram
router.post('/api/bot/webhook', async (request: Request) => {
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
  

export default {
    async fetch(request: Request, env: any, ctx: ExecutionContext) {
      return router.handle(request, env, ctx) || new Response('Not Found', { status: 404 });
    }
  };
  