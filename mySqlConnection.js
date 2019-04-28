const mysql = require('mysql');

const dbConfig = Object.freeze({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'bulletin_board'
});

const connection = mysql.createConnection(dbConfig);

module.exports = connection;
