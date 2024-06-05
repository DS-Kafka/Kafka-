/**
 * 計算資料庫儲存筆數，在每次成功存入新的訂購資訊後更新計數器並傳送
 */

/**
 * @typedef {number} counter - 資料成功存入的計數器
 */
const WebSocket = require('ws'); 
const mysql = require('mysql2/promise'); 
require('dotenv').config();
const wss = new WebSocket.Server({ port:8081 });

let counter = 0;

const connectionPromise = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
});
wss.on('connection', async ws =>{
    ws.send(counter.toString());
});

function broadcastCounter(){
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(counter.toString());
        }
    });
}

/**
 * 成功插入資料後更新計數器並通知 WebSocket 客戶端
 */
function incrementCounter(){
    counter++;
    broadcastCounter();
}
/**
 * 監聽資料庫存入新資料
 */
async function checkInsert(req, res) {
    try {
        if (req.body.sec !== 'animated-octo-engine') {
            return res.status(403).send('Forbidden');
        }
        const { name } = req.body;
        const query = 'INSERT INTO orders (name) VALUES (?)';
        const [rows] = await connectionPromise.execute(query, [name]);
        const id = rows.insertId;
        
        incrementCounter(); 
        
        res.status(200).send({ id });
    } catch (error) {
        console.error('Database connection failed:', error);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = {
    checkInsert,
    incrementCounter
}



