const { Producer, AdminClient } = require('node-rdkafka');
const topicName = 'buy_topic';

const producer = new Producer({
    'metadata.broker.list': 'localhost:9092',
    'dr_cb': true
});

producer.connect();

producer.on('ready', function () {
    console.log('Producer ready');
    ensureTopicExists(topicName);
});

producer.on('event.error', function (err) {
    console.error('Error from producer:', err);
});

async function ensureTopicExists(topic) {
    const admin = AdminClient.create({
        'client.id': 'admin',
        'metadata.broker.list': 'localhost:9092'
    });

    admin.createTopic({
        topic,
        num_partitions: 1,
        replication_factor: 1
    }, (err, result) => {
        if (err && err.message !== 'Topic already exists') {
            console.error('Error creating topic:', err);
        } else {
            console.log(`Topic "${topic}" exists or created successfully.`);
        }
        admin.disconnect();
    });
}

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