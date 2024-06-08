// const kafka = require('node-rdkafka');
require('dotenv').config();
const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });
let counter = 0;

const consume = async () => {
  try {
    await consumer.connect();
    console.log('successfully connected to kafka');
    consumer.subscribe(['buy_topic']);
    console.log('successfully subscribed to topic');
    // 監聽到新的卡夫卡 topic 消息時計數器加一
    consumer.on('data', () => counter++);
  } 
  catch (error) {
    console.error("Error in consuming: ", error.message);
  }
};

consume().catch((err) => {
  console.error("Error in consumer: " + err.message);
});
// 即時更新數值給 WebSocket Client
wss.on('connection', ws => {
  ws.send(counter.toString()); 
  ws.on('message', message => {
    console.log(`Received message => ${message}`);
  });
});

console.log('WebSocket server is running on ws://localhost:8080');
