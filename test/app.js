const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // 允许所有来源访问
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // 允许的 HTTP 方法
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // 允许的请求头
    next();
  });

// 创建数据库连接池
const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '12345',
    database: 'sss'
});

// 解析 POST 请求体
app.use(bodyParser.json());

app.use(express.static('C:/test'));


// 处理根路径 GET 请求
app.get('/', (req, res) => {
    res.sendFile(__dirname + 'C:/test/index.html');
});


// 处理表单提交
app.post('/submit', (req, res) => {
    const { name, email, password } = req.body;

    // 从连接池中获取连接
    pool.getConnection((err, connection) => {
        if (err) {
            return res.status(500).json({ error: '数据库连接失败' });
        }

       // 查询数据库中是否已存在相同邮箱信息
       connection.query('SELECT * FROM user WHERE email = ?', [email], (err, results) => {
        if (err) {
            connection.release(); // 释放连接
            return res.status(500).json({ error: '数据库查询失败' });
        }

        if (results.length > 0) {
            connection.release(); // 释放连接
            return res.status(400).json({ error: '邮箱已被注册' });
        }
         // 执行 SQL 查询
        connection.query('INSERT INTO user (name, email, pasword) VALUES (?, ?, ?)', [name, email, password], (err, result) => {
            connection.release(); // 释放连接

            if (err) {
                return res.status(500).json({ error: '数据存储失败' });
            }

            res.status(200).json({ message: '数据已成功存储到数据库' });
        });
    });
  });
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;

    // 从连接池中获取连接
    pool.getConnection((err, connection) => {
        if (err) {
            return res.status(500).json({ error: '数据库连接失败' });
        }

        // 执行 SQL 查询
        connection.query('SELECT * FROM user WHERE email = ?', [email], (err, results) => {
            connection.release(); // 释放连接

            if (err) {
                return res.status(500).json({ error: '查询数据库失败' });
            }

            if (results.length === 0) {
                return res.status(401).json({ error: '用户不存在' });
            }

            const user = results[0];

            if (user.pasword !== password) {
                return res.status(401).json({ error: '密码不正确' });
            }

            // 用户名和密码验证成功
            res.status(200).json({ message: '登录成功' });
        });
    });
});


// 启动服务器
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
