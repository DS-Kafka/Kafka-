const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
// db connection example
const connectionPromise = require('./utils/db').connectionPromise;
app.use(cors());
app.use(express.json());


app.get('/api/testDb',async (req, res) => {
    const testQuery = 'INSERT INTO orders (buyerName) VALUES (?)';
    const [rows] = await connectionPromise.execute(testQuery, ["Test"]);
    const id = rows.insertId;
    console.log(id);
    res.send(`${id}`);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
