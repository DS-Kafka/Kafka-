const { Producer } = require('node-rdkafka');
const topicName = 'buy_topic';

const producer = new Producer({
    'metadata.broker.list': 'localhost:9092',
    'dr_cb': true
});

producer.connect();

producer.on('ready', function () {
    console.log('Producer ready');
});

producer.on('event.error', function (err) {
    console.error('Error from producer:', err);
});

async function sendToKafka(data) {
    try {
        producer.produce(
            topicName,
            null,
            Buffer.from(data),
            null,
            Date.now()
        );
        console.log('Data sent to Kafka topic successfully.');
    } catch (error) {
        console.error('Error sending data to Kafka:', error);
    }
}

module.exports = sendToKafka;
