const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();

// 创建数据库连接池
const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'confirm'
});

// 解析 POST 请求体
app.use(bodyParser.json());

app.use(express.static('D:/桌面/数据库验证'));


// 处理根路径 GET 请求
app.get('/', (req, res) => {
    res.sendFile(__dirname + 'D:/桌面/数据库验证/index.html');
});


// 处理表单提交
app.post('/submit', (req, res) => {
    const { name, email } = req.body;

    // 从连接池中获取连接
    pool.getConnection((err, connection) => {
        if (err) {
            return res.status(500).json({ error: '数据库连接失败' });
        }

        // 执行 SQL 查询
        connection.query('INSERT INTO users (name, email) VALUES (?, ?)', [name, email], (err, result) => {
            connection.release(); // 释放连接

            if (err) {
                return res.status(500).json({ error: '数据存储失败' });
            }

            res.status(200).json({ message: '数据已成功存储到数据库' });
        });
    });
});

// 启动服务器
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
