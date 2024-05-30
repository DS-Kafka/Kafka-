/**
 * @typedef {Object} KafkaClient - 卡夫卡客戶端
 * @typedef {Object} Consumer - 卡夫卡消費者 
 * @typedef {Object} WebSocket - WebSocket 伺服器
 */

const WebSocket = require('ws');
const kafka = require('kafka-node');
const Consumer = kafka.Consumer; 
const client = new kafka.KafkaClient();

/**
 * @param {Array<Object>} payloads - 消費者訂閱的主題和分區
 * @param {string} payloads[].topic - 訂閱主題
 * @param {number} payloads[].partition - 訂閱的主題的分區號
 * @param {boolean} autoCommit - 是否自動提交位移
 */

/**
 * @param {Express.Application} app - 消費者訂閱卡夫卡 buy_topic 主題的消息，並傳送資料到 dashboard 
 */

module.exports = async function (app){
  const consumer = new Consumer(
    client,
    [{ topic: 'buy_topic', partition: 0 }],
    { autoCommit: false }
  );
  
  const wss = new WebSocket.Server({ port: 8080 });
  
  /**
   * @typedef {number} todayDemand - 卡夫卡今日訂購數量
   * @typedef {number} todayKafkaData - 卡夫卡今日資料
   */
  
  let todayDemand = 0;
  let todayKafkaData = 0;
  
  wss.on('connection', ws => {
    ws.send(JSON.stringify({
      todayDemand,
      todayKafkaData
    }));
  
    consumer.on('message', function (message) {
      todayDemand++;
      todayKafkaData++;
      const data = {
        todayDemand,
        todayKafkaData
      };
      ws.send(JSON.stringify(data));
    });
  
    ws.on('message', message => {
      console.log(`Received message => ${message}`);
    });
  });
  
  console.log('WebSocket server is running on ws://localhost:8080');
}

