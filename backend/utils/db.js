const mysql = require('mysql2/promise');

const connectionPromise = mysql.createConnection({
  host: process.env.MYSQL_HOST || 'ds_mysql',
  user: process.env.MYSQL_USER || 'ds',
  password: process.env.MYSQL_PASSWORD || 'ds2024',
  database: process.env.MYSQL_DATABASE || 'ds'
}).catch(error => {
  console.error('MySQL connection error:', error);
});

module.exports = {
  connectionPromise
};
