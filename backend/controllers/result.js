const connectionPromise = require('../utils/db').connectionPromise;
/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns
 */
module.exports = async function result(req, res) {
  // TODO: 連接資料庫並取回購買事實
  try {
    const connection = await connectionPromise; // 修改：從連線池獲取連線
    const [rows] = await connection.execute('SELECT name, timestamp FROM orders ORDER BY timestamp ASC');
    // connection.release(); // 修改：釋放連線回連線池
    return res.status(200).json({ buyers: rows });
  } catch (error) {
    console.error('Error fetching data from database:', error);
    return res.status(500).send('Internal Server Error');
  }

//   return res.status(200).json({ buyers: [
//     { name: 'Tim', timestamp: new Date(), amount: 10 },
//     { name: 'Penny', timestamp: new Date(), amount: 20 },
//     { name: 'Kelly', timestamp: new Date(), amount: 30 },
//     { name: 'Lena', timestamp: new Date(), amount: 40 },
//     { name: 'John', timestamp: new Date(), amount: 50 },
//     { name: 'Sam', timestamp: new Date(), amount: 60 },
//     { name: 'Tom', timestamp: new Date(), amount: 70 },
//     { name: 'Jane', timestamp: new Date(), amount: 80 },
//     { name: 'Jack', timestamp: new Date(), amount: 90 },
//     { name: 'Jill', timestamp: new Date(), amount: 100 },
//     { name: 'Bob', timestamp: new Date(), amount: 110 },
//     { name: 'Alice', timestamp: new Date(), amount: 120 },
//     { name: 'Mike', timestamp: new Date(), amount: 130 },
//     { name: 'Lisa', timestamp: new Date(), amount: 140 },
//     { name: 'Sue', timestamp: new Date(), amount: 150 },
//     { name: 'Mary', timestamp: new Date(), amount: 160 },
//     { name: 'David', timestamp: new Date(), amount: 170 },
//     { name: 'Sarah', timestamp: new Date(), amount: 180 },
//     { name: 'Kim', timestamp: new Date(), amount: 190 },
//     { name: 'Wendy', timestamp: new Date(), amount: 200 },
//     { name: 'Paul', timestamp: new Date(), amount: 210 },
//     { name: 'Cindy', timestamp: new Date(), amount: 220 },
//     { name: 'Amy', timestamp: new Date(), amount: 230 },
//     { name: 'Mark', timestamp: new Date(), amount: 240 },
//     { name: 'Stephanie', timestamp: new Date(), amount: 250 },
//     { name: 'Jason', timestamp: new Date(), amount: 260 },
//     { name: 'Christine', timestamp: new Date(), amount: 270 },
//     { name: 'Ashley', timestamp: new Date(), amount: 280 },
//     { name: 'Daniel', timestamp: new Date(), amount: 290 },
//     { name: 'Rachel', timestamp: new Date(), amount: 300 },
//     { name: 'Nicole', timestamp: new Date(), amount: 310 },
//     { name: 'Aaron', timestamp: new Date(), amount: 320 },
//     { name: 'Anna', timestamp: new Date(), amount: 330 },
//     { name: 'Adam', timestamp: new Date(), amount: 340 },
//     { name: 'Emily', timestamp: new Date(), amount: 350 },
//     { name: 'Brian', timestamp: new Date(), amount: 360 },
//     { name: 'Melissa', timestamp: new Date(), amount: 370 },
//     { name: 'Ryan', timestamp: new Date(), amount: 380 },
//     { name: 'Nicole', timestamp: new Date(), amount: 390 },
//     { name: 'Andrew', timestamp: new Date(), amount: 400 },
//   ]});
}