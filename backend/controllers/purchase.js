/**
 * 讓使用者購買商品，並且會需要將購買事實傳送給 Kafka
 *
 * @param {import('express').Request<{}, {}, Record<string, number>>} req
 * @param {import('express').Response} res
 */
module.exports = async function purchase(req, res) {
  console.log('買家買了', req.body)
  // TODO: 這裡會需要去增加「API接收到請求」的計數器
  // TODO: 這裡會跟 Kafka 溝通
  return res.status(200).send('OK');
}