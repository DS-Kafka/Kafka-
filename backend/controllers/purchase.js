const sendToKafka = require('../utils/sendToKafka');
const wss = require('./websocketServer_Counter1');
const WebSocket = require('ws');
/**
* @typedef {Object} Order
* @property {string} name 購買者名稱
*/


/**
* 讓使用者購買商品，並且會需要將購買事實傳送給 Kafka
*
* @param {import('express').Request<{}, {}, Order>} req
* @param {import('express').Response} res
*/

module.exports = async function purchase(req, res) {
  if (typeof req.body.name !== 'string' || req.body.name.length === 0) {
    return res.status(400).send('Bad Request');
  }
  const now = Date.now();
  console.log(`${req.body.name} 買了商品`);
  // TODO: 這裡會需要去增加「API接收到請求」的計數器
  // TODO: 這裡會跟 Kafka 溝通
const data = JSON.stringify({
    buy_name: req.body.name,
    buy_time: Math.floor(now / 1000)
  });
  try {
    await sendToKafka.sendToKafka(data);

    // 將資料傳送給所有連接的 WebSocket 客戶端
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });

    return res.status(200).send('OK');
  } catch (error) {
    console.error('Failed to send purchase details to Kafka', error);
    res.status(500).send('Failed to record purchase');
  }
}