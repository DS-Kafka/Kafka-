const { Consumer } = require('node-rdkafka');
const connectionPromise = require('../utils/db').connectionPromise;

const consumer = new Consumer({
  'group.id': 'kafka',
  'metadata.broker.list': 'kafka:9092'
}, {});

consumer.connect();

consumer.on('ready', () => {
  console.log('Consumer ready');
  consumer.subscribe(['buy_topic']);
  consumer.consume();
}).on('data', async (data) => {
  const parsedData = JSON.parse(data.value.toString());
  const connection = await connectionPromise;
  try {
    const insertQuery = 'INSERT INTO orders (name, timestamp) VALUES (?, ?)';
    await connection.execute(insertQuery, [parsedData.buy_name, new Date(parsedData.buy_time * 1000)]);
    console.log('Data inserted into orders:', parsedData);
  } catch (error) {
    console.error('Error inserting data into orders:', error);
  } finally {
    connection.release();
  }
});

consumer.on('event.error', (err) => {
  console.error('Error from consumer:', err);
});
