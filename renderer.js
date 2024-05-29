
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
    console.log('成功连接到数据库,id为 ' + connection.threadId);
});


let abtn = document.getElementsByTagName('button');

abtn[0].addEventListener('click', () => {
    //执行查询
    connection.query('SELECT * FROM task_name', (error, results, fields) => {
        if (error) {
            console.error('查询失败: ' + error.stack);
            return;
        }
        console.log('查询结果成功');
        console.log('查询结果: ', results);
    });


    //先把数据库中的表清理干净
    connection.query('TRUNCATE TABLE task_name', (error, results, fields) => {
        if (error) {
            console.error('清理数据失败: ' + error.stack);
            return;
        }
        console.log('数据清理成功');
    });

    //查询清理后的数据库
    connection.query('SELECT * FROM task_name', (error, results, fields) => {
        if (error) {
            console.error('查询失败: ' + error.stack);
            return;
        }
        console.log('查询清理后的数据库成功');
        console.log('查询结果: ', results);
    });

    //向数据库中添加数据
    let data_id = 3;
    let data_name = '学习';
    let data_time = 300;
    connection.query('INSERT INTO task_name (id,name,time) VALUES (?,?,?)', [data_id, data_name, data_time], (error, results, fields) => {
        if (error) {
            console.error('插入数据失败: ' + error.stack);
            return;
        }
        console.log('新数据已被插入，ID为: ', results.insertId);
    });

    //查询添加过数据的数据库
    connection.query('SELECT * FROM task_name', (error, results, fields) => {
        if (error) {
            console.error('查询失败: ' + error.stack);
            return;
        }
        console.log('查询添加过数据的数据库成功');
        console.log('查询结果: ', results);
    });
})

// 保存任务列表信息
var tableContent;

window.addEventListener('message', function (event) {
    if (event.origin !== 'file://') {  // 检查消息来源是否为本地文件
        return;
    }
    if (typeof event.data !== 'number') {
        tableContent = event.data;
        console.log(tableContent);
        console.log(tableContent.length);
        // 在这里处理接收到的表格数据
        connection.query('SELECT * FROM task_name', (error, results, fields) => {
            if (error) {
                console.error('查询失败: ' + error.stack);
                return;
            }
            console.log('查询结果成功');
            console.log('查询结果: ', results);
        });
        //先把数据库中的表清理干净
        connection.query('TRUNCATE TABLE task_name', (error, results, fields) => {
            if (error) {
                console.error('清理数据失败: ' + error.stack);
                return;
            }
            console.log('数据清理成功');
        });

        //查询清理后的数据库
        connection.query('SELECT * FROM task_name', (error, results, fields) => {
            if (error) {
                console.error('查询失败: ' + error.stack);
                return;
            }
            console.log('查询清理后的数据库成功');
            console.log('查询结果: ', results);
        });

        //向数据库中添加数据
        for (var i = 0; i < tableContent.length; i++) {

            var data_id = tableContent[i][0];
            var data_name = tableContent[i][1];
            connection.query('INSERT INTO task_name (id,name) VALUES (?,?)', [data_id, data_name], (error, results, fields) => {
                if (error) {
                    console.error('插入数据失败: ' + error.stack);
                    return;
                }
                console.log('新数据已被插入,ID为: ', results.insertId);
            });
        }

        //查询添加过数据的数据库
        connection.query('SELECT * FROM task_name', (error, results, fields) => {
            if (error) {
                console.error('查询失败: ' + error.stack);
                return;
            }
            console.log('查询添加过数据的数据库成功');
            console.log('查询结果: ', results);
        });
    }
}, false);

// 保存任务列表中的时间
var tableTime;
var taskId;
window.addEventListener('message', function (event) {
    if (event.origin !== 'file://') {  // 检查消息来源是否为本地文件
        return;
    }
    if (typeof event.data === 'number') {
        tableTime = event.data;
        var data_time = tableTime;
        console.log(data_time);
        connection.query('SELECT * FROM task_name', (error, results, fields) => {
            if (error) {
                console.error('查询失败: ' + error.stack);
                return;
            }
            console.log('查询结果成功');
            console.log('查询结果: ', results);
        });

        //向数据库中添加数据
        connection.query('UPDATE task_name SET time = ? WHERE id = ?', [data_time, taskId], (error, results, fields) => {
            if (error) {
                console.error('插入数据失败: ' + error.stack);
                return;
            }
            console.log('新数据已被插入');
        });

        //查询添加过数据的数据库
        connection.query('SELECT * FROM task_name', (error, results, fields) => {
            if (error) {
                console.error('查询失败: ' + error.stack);
                return;
            }
            console.log('查询添加过数据的数据库成功');
            console.log('查询结果: ', results);
        });
    }
})


var iframe = document.getElementById('iframeId');
var childWindow = iframe.contentWindow;
childWindow.addEventListener('firstMessageType', function (event) {
    console.log('获取到复选框id为:', event.detail.data);
    taskId = event.detail.data;
});


window.addEventListener("load", () => {
    var resultObject = new Object();
    var task_load;//数据库保存的任务数
    // 将查询数据库和发送消息的操作封装成一个Promise对象
    new Promise((resolve, reject) => {
        connection.query('SELECT * FROM task_name;', (error, results, fields) => {
            if (error) {
                console.error('查询失败： ' + error.stack);
                reject(error);
            } else {
                resultObject.data = results;
                console.log('数据库存储的数据为:', resultObject);
                // console.log('测试代码', resultObject.data);
                // console.log('测试代码', resultObject.data[0]);
                // console.log('测试代码', resultObject.data[0].name);


                console.log('查询结果,', results.length);
                task_load = results.length;
                //console.log('测试代码,task_load为: ', task_load);

                resultObject.tasknums = task_load;
                console.log(resultObject);
                
                resolve(resultObject);
            }
        });
    })
        .then((resultObject) => {
            // 在Promise的then方法中调用iframe.contentWindow.postMessage(task_load,'*');
            iframe.contentWindow.postMessage(resultObject, '*');
        })
        .catch((error) => {
            console.error('发生错误： ', error);
        });
});
