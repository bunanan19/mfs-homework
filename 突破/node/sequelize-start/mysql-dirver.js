// 导入模块
const mysql = require('mysql2');

// 创建一个数据库连接
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '007722',
  database: 'start'
});

// 简单查询
connection.query(
  'SELECT * FROM `users` WHERE `sex` = "男" AND `age` >= 20',
  function(err, results, fields) {
    console.log(results); // 结果集
    console.log(fields); // 额外的元数据（如果有的话）
  }
);

// 使用占位符
connection.query(
  'SELECT * FROM `users` WHERE `sex` = ? AND `age` > ?',
  ['男', ],
  function(err, results) {
    console.log(results);
  }
);