var mysql = require('mysql');
const e = require('express');

var pool = mysql.createPool({
  user: 'root',
  password: '123456',
  host: 'localhost',
  port: '3306',
  database: 'demo',
  waitForConnections : true,
  connectionLimit : 10 //連線數上限
})

var param = "alexender15to16"
var userId = 15

// 取得連線池的連線
pool.getConnection((err, connection) => {

  if (err) {
    console.log(err)
  } else {
    connection.query( 'DELETE FROM user where user_id = ?', [userId] , 
      function(err, rows) {
        //callback function
        console.log(rows)
        // console.log(err)
        // 釋放連線
        connection.release();
    });
  }
});