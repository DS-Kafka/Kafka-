const express = require('express');
const purchase = require('./controllers/purchase');
const result = require('./controllers/result');
const initwskafka = require('./controllers/wskafka');
const { checkInsert, incrementCounter } = require('./controllers/wscounter');
const WebSocket = require('ws');

const app = express();
const port = 3000;
const cors = require('cors');

// db connection example
const connectionPromise = require('./utils/db').connectionPromise;
app.use(cors());
app.use(express.json());

app.get('/api/testDb',async (req, res) => {
    const testQuery = 'INSERT INTO orders (name) VALUES (?)';
    const [rows] = await connectionPromise.execute(testQuery, ["Test"]);
    const id = rows.insertId;
    console.log(id);
    res.send(`${id}`);
});

app.post('/api/purchase', purchase);

app.get('/api/result', result);

// app.post('/api/insert', checkInsert);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    initwskafka();
});
