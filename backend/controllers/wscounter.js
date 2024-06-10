/**
 * 計算資料庫儲存筆數，在每次成功存入新的訂購資訊後更新計數器並傳送
 */

/**
 * @typedef {number} counter - 從 consumer.js 導入的計數器2
 */

const WebSocket = require('ws'); 
const wss = new WebSocket.Server({ port:8081 });
require('dotenv').config();
const { getCount } = require('../consumer');

let counter = getCount();

const updateCounter = () => {
    counter = getCount();
    console.log("Updated counter:", counter);
  };
// 每秒更新
setInterval(updateCounter, 1000); 

wss.on('connection', (ws) => {
    console.log('New client connected');
    
    ws.send(JSON.stringify({ count: counter }));
  
    // 每秒更新 counter
    const intervalId = setInterval(() => {
      ws.send(JSON.stringify({ count: counter }));
    }, 1000);
  
    ws.on('close', () => {
      console.log('Client disconnected');
      clearInterval(intervalId);
    });
  });



// const connectionPromise = require('../utils/db').connectionPromise;

// wss.on('connection', async ws =>{
//     ws.send(counter.toString());
// });

// function broadcastCounter(){
//     wss.clients.forEach((client) => {
//         if (client.readyState === WebSocket.OPEN) {
//             client.send(counter.toString());
//         }
//     });
// }

// /**
//  * 成功插入資料後更新計數器並通知 WebSocket 客戶端
//  */
// function incrementCounter(){
//     counter++;
//     broadcastCounter();
// }
// /**
//  * 監聽資料庫存入新資料
//  */
// async function checkInsert(req, res) {
//     try {
//         if (req.body.sec !== 'animated-octo-engine') {
//             return res.status(403).send('Forbidden');
//         }
//         const { name } = req.body;
//         const query = 'INSERT INTO orders (name) VALUES (?)';
//         const [rows] = await connectionPromise.execute(query, [name]);
//         const id = rows.insertId;


//         incrementCounter(); 
        
//         res.status(200).send({ id });
//     } catch (error) {
//         console.error('Database connection failed:', error);
//         res.status(500).send('Internal Server Error');
//     }
// }

// module.exports = {
//     checkInsert,
//     incrementCounter
// }



