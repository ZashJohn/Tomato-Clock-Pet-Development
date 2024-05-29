const mysql = require('mysql');

// 创建数据库连接
const connection = mysql.createConnection({
    host: 'localhost',  // 数据库主机名
    user: 'root',       // 数据库用户名
    password: 'qwe123456',   // 数据库密码
    database: 'task_list' // 数据库名
});

// 连接到数据库
connection.connect((err) => {
    if (err) {
        console.error('无法连接到数据库: ' + err.stack);
        return;
    }
    console.log('成功连接到数据库 ');
});

// 执行查询
// connection.query('SELECT * FROM task_name', (error, results, fields) => {
//     if (error) {
//         console.error('查询失败: ' + error.stack);
//         return;
//     }
//     console.log('查询结果: ', results);
// });

// //先把数据库中的表清理干净
// connection.query('TRUNCATE TABLE task_name', (error, results, fields) => {
//     if (error) {
//       console.error('清理数据失败: ' + error.stack);
//       return;\
//     }
//   });

// var data_id = 1;
// var data_name = '吃饭';
// var data_time = 200;
// connection.query('INSERT INTO task_name (id,name,time) VALUES (?,?,?)', [data_id, data_name, data_time], (error, results, fields) => {
//     if (error) {
//         console.error('插入数据失败: ' + error.stack);
//         return;
//     }
//     console.log('新数据已被插入，ID为: ', results.insertId);
// });




// // 执行查询
// connection.query('SELECT * FROM task_name', (error, results, fields) => {
//     if (error) {
//         console.error('查询失败: ' + error.stack);
//         return;
//     }
//     console.log('查询结果: ', results);
// });
// 关闭连接
//connection.end();

// 导出连接对象
module.exports = connection;
