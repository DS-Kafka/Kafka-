const kafka = require('node-rdkafka');
const connectionPromise = require('./utils/db').connectionPromise;

const consumer = new kafka.KafkaConsumer({
  'group.id': 'consumer-group',
  'metadata.broker.list': 'localhost:9092',
});

let count = 0;

const consume = async () => {
  try {
    await consumer.connect();
    console.log('successfully connected to kafka');
    consumer.subscribe(['buy_topic']);
    console.log('successfully subscribed to topic');

    consumer.on('data', async (message) => {
      try {
        const buyData = JSON.parse(message.value.toString());
        const name = buyData.buy_name;
        const timestamp = new Date(buyData.buy_time * 1000).toISOString();

        const query = "INSERT INTO orders (name, timestamp) VALUES (?, ?)";
        await connectionPromise.execute(query, [id, name, timestamp]);
        console.log('Data inserted into database successfully.');
        count++;
      } catch (error) {
        console.error("Error processing message:", error.message);
      }
    });
    consumer.consume();
  } catch (error) {
    console.error("Error in consuming or saving to database: ", error.message);
  }
};
consume().catch((err) => {
  console.error("Error in consumer: " + err.message);
});
const getCount = () => {
  return count;
};
// 新增匯出 getCount()
module.exports = {
  getCount
};