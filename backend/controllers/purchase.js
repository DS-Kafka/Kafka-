const sendToKafka = require('../utils/sendToKafka');

/**
 * @typedef {Object} Order
 * @property {string} buyerName 購買者名稱
 * @property {number} amount 購買數量
 */

/**

 * 讓使用者購買商品，並且會需要將購買事實傳送給 Kafka
 *
 * @param {import('express').Request<{}, {}, Order>} req
 * @param {import('express').Response} res
 */
module.exports = async function purchase(req, res) {
  if (typeof req.body.buyerName !== 'string' || req.body.buyerName.length === 0 || Number.isInteger(req.body.amount) === false || req.body.amount < 1) {
    return res.status(400).send('Bad Request');
  }
  now = Date.now();
  console.log(`${req.body.buyerName} 買了 ${req.body.amount} 件商品`);
  // TODO: 這裡會需要去增加「API接收到請求」的計數器
  // TODO: 這裡會跟 Kafka 溝通
  const data = JSON.stringify({
    buy_name: req.body.buyerName,
    buy_index: now,
    buy_time: Math.floor(now / 1000)
  });

  await sendToKafka(data);

  return res.status(200).send('OK');
}