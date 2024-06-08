const { Consumer } = require('node-rdkafka');
const connectionPromise = require('./utils/db').connectionPromise;

// Kafka consumer configuration
const consumer = new Consumer({
  'group.id': 'kafka',
  'metadata.broker.list': 'kafka:9092',
}, {});

// Connect to Kafka
consumer.connect();

// On ready event
consumer.on('ready', () => {
  console.log('Consumer ready');
  consumer.subscribe(['buy_topic']);
  consumer.consume();
}).on('data', async (data) => {
  // Parse the received message
  const message = JSON.parse(data.value.toString());
  console.log(`Received message: ${JSON.stringify(message)}`);
  
  try {
    const connection = await connectionPromise;
    const insertQuery = 'INSERT INTO orders (name, amount, buy_time) VALUES (?, ?, ?)';
    await connection.execute(insertQuery, [message.buy_name, message.buy_index, message.buy_time]);
    console.log('Order inserted into database');
  } catch (error) {
    console.error('Error inserting order into database:', error);
  }
});

// Handle errors
consumer.on('event.error', (err) => {
  console.error('Error from consumer:', err);
});

module.exports = consumer;
