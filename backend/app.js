const express = require('express');
const purchase = require('./controllers/purchase');
const result = require('./controllers/result');
// const WebSocket = require('ws');
const { connectProducer } = require('./utils/sendToKafka');
const { connectConsumer } = require('./consumer');
const websocketServer_Counter1 = require('./controllers/websocketServer_Counter1');
const websocketServer_Counter2 = require('./controllers/websocketServer_Counter2');

const app = express();
const port = 3000;
const cors = require('cors');

// db connection example
const connectionPromise = require('./utils/db').connectionPromise;
app.use(cors());
app.use(express.json());

connectProducer();
connectConsumer();
app.get('/api/testDb', async (req, res) => {
  try {
    const connection = await connectionPromise;
    const testQuery = 'INSERT INTO orders (name, timestamp) VALUES (?, ?)';
    const [rows] = await connection.execute(testQuery, ["Test Buyer", new Date()]);
    const id = rows.insertId;
    console.log(id);
    res.send(`${id}`);
  } catch (error) {
    console.error('Error in /api/testDb:', error);
    res.status(500).send('Internal Server Error');
  }
});
app.get('/api/test', async (req, res) => {
   res.send("Hello World!");
});

app.post('/api/purchase', purchase);

app.get('/api/result', result);

app.listen(port, () => {
   console.log(`Server is running on port ${port}`);
});
