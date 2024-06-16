const { Consumer } = require('node-rdkafka');
const connectionPromise = require('./utils/db').connectionPromise;
const wss = require('./controllers/websocketServer_Counter2');
const WebSocket = require('ws');

let consumer = null;
let count = 0;

const getCount = () => {
  return count;
};

function connectConsumer() {
  if (!consumer) {
    consumer = new Consumer({
      'group.id': 'kafka',
      'metadata.broker.list': 'kafka:9092'
    }, {});

    consumer.connect();

    consumer.on('ready', () => {
      console.log('Consumer ready');
      consumer.subscribe(['buy_topic']);
      consumer.consume();
    });

    consumer.on('data', async (data) => {
      const parsedData = JSON.parse(data.value.toString());
      const connection = await connectionPromise;
      try {
        const insertQuery = 'INSERT INTO orders (name, timestamp) VALUES (?, ?)';
        await connection.execute(insertQuery, [parsedData.buy_name, new Date(parsedData.buy_time * 1000)]);
        console.log('Data inserted into orders:', parsedData);
        count++;
        // 將 consumer 讀取的消息發送到 WebSocket Client
        // const message = {
        //   count: getCount() 
        // };
        wss.clients.forEach(function each(client) {
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(count));
          }
        });
      } catch (error) {
        console.error('Error inserting data into orders:', error);
      }
    });

    consumer.on('event.error', (err) => {
      console.error('Error from consumer:', err);
    });
  }
}

module.exports = { connectConsumer, getCount };
