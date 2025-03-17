import { Router } from 'itty-router';
import { Request } from '@cloudflare/workers-types';
import {  Message, User, Chat } from "node-telegram-bot-api";


interface TelegramMessage {
    message?:Message ;
    message_id: number;
    message_thread_id?: number | undefined;
    from?: User | undefined;
    date: number;
    chat: Chat;}

const router = Router();

// обработка сообщений от тг
router.post('/api/bot/webhook', async (request: Request) => {
  try {
    const body: TelegramMessage = await request.json();

    if (body.message) {
      const chatId = body.message.chat.id;
      const text = body.message.text || '';
      console.log(`Received message from chat ${chatId}: ${text}`);
      
      
    }

    return new Response('OK', { status: 200 });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return new Response('Bad Request', { status: 400 });
  }
});

export default {
  fetch: router.handle,
};
