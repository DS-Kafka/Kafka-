const { Producer, AdminClient } = require('node-rdkafka');
const topicName = 'buy_topic';

const producer = new Producer({
  'metadata.broker.list': 'kafka:9092',  // 使用 Docker 內部名稱
  'dr_cb': true
});

let isProducerReady = false;

producer.on('ready', function() {
  console.log('Producer ready');
  isProducerReady = true;
  ensureTopicExists(topicName);
});

producer.on('event.error', function(err) {
  console.error('Error from producer:', err);
});

producer.connect();

async function ensureTopicExists(topic) {
  const admin = AdminClient.create({
      'client.id': 'admin',
      'metadata.broker.list': 'kafka:9092'  // 使用 Docker 內部名稱
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

module.exports = {
  producer,
  isProducerReady
};