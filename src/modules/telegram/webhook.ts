import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';

const app = express();
const PORT = 3000;
const TOKEN = '7852315257:AAEkKj3XHgIkOliNATcj3CDznHis_AQHu_k';
const WEBHOOK_URL = 'https://phantomsecondline.telegram-project-bot.workers.dev/'; 

app.use(bodyParser.json());

// Основной обработчик вебхука
app.post('/webhook', (req, res) => {
  console.log('Received update:', JSON.stringify(req.body, null, 2));

  const update = req.body;
  if (update.message) {
    const chatId = update.message.chat.id;
    const text = update.message.text || 'Нет текста';

    // Отправляем ответное сообщение
    axios.post(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
      chat_id: chatId,
      text: `Вы сказали: ${text}`
    }).catch(err => console.error('Ошибка отправки сообщения:', err));
  }

  res.sendStatus(200);
});

// Функция для установки вебхука
async function setWebhook() {
  try {
    const response = await axios.post(`https://api.telegram.org/bot${TOKEN}/setWebhook`, {
      url: WEBHOOK_URL
    });
    console.log('Webhook установлен:', response.data);
  } catch (error) {
    console.error('Ошибка установки вебхука:', error);
  }
}

// Запускаем сервер
app.listen(PORT, async () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  await setWebhook(); // Устанавливаем вебхук при запуске сервера
});
