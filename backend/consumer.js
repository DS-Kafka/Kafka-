const kafka = require('node-rdkafka');
const mysql = require('mysql2');
const mysqlConnection = mysql.createConnection({
  host: 'ds_mysql',
  user: 'ds',
  password: 'ds2024',
  database: 'ds'
});

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
    await mysqlConnection.connect();
    console.log('successfully connected to db');

    consumer.on('data', async (message) => {
      try {
        const buyData = JSON.parse(message.value.toString());
        const id = buyData.buy_index;
        const name = buyData.buy_name;
        const timestamp = new Date(buyData.buy_time * 1000).toISOString();

        const query = "INSERT INTO orders (id, name, timestamp) VALUES (?, ?, ?)";
        await mysqlConnection.query(query, [id, name, timestamp]);
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