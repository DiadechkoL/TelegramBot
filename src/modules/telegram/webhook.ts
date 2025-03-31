import { Router } from 'itty-router';
// import { Request } from '@cloudflare/workers-types';
import axios from 'axios';
import { Message, User, Chat } from "node-telegram-bot-api";


const TOKEN = '7852315257:AAEkKj3XHgIkOliNATcj3CDznHis_AQHu_k';
const WEBHOOK_URL = 'https://telegranbot.telegram-project-bot.workers.dev';

const router = Router();

router.get('/api/bot/webhook', async () => {
  try {
      await setWebhook(); // <-- Добавили await
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
    return router.handle(request) || new Response('Not Found', { status: 404 });
  },
};

setWebhook();
