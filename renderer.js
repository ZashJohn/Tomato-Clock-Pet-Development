
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


// 同步任务列表
window.addEventListener("load", () => {
    console.log('-------同步任务列表开始-------');
    let resultObject = new Object();
    var task_load;//数据库保存的任务数
    // 将查询数据库和发送消息的操作封装成一个Promise对象
    //把数据库中存放的任务列表发送给子页面
    new Promise((resolve, reject) => {
        connection.query('SELECT * FROM task_name;', (error, results, fields) => {
            if (error) {
                console.error('查询失败： ' + error.stack);
                reject(error);
            } else {
                resultObject.data = results;
                console.log('数据库存储的数据为:', resultObject);

                task_load = results.length;
                //console.log('测试代码,task_load为: ', task_load);
                resultObject.tasknums = task_load;
                resultObject.flag = 'taskinformation';
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
    connection.query('SELECT * FROM task_name', (error, results, fields) => {
        if (error) {
            console.error('查询失败: ' + error.stack);
            return;
        }
        console.log('初次查询结果成功');
        console.log('查询结果为: ', results);
        console.log('-------同步任务列表结束-------');
    });


    var isloadednum;
    var firstValue;
    connection.query('SELECT count(*) FROM users WHERE isload = 1;', (error, results, fields) => {
        if (error) {
            console.error('查询失败: ' + error.stack);
            return;
        }
        isloadednum = Object.keys(results[0])[0];
        firstValue = results[0][isloadednum];
        //console.log('这是一个测试标记查询结果: ', firstValue);
        // 当firstValue值为1时，点击头像直接跳转到对应的用户个人界面
        if(firstValue === 1){
            console.log('这是一个测试标记查询结果');
            isLogin = true;
        }else{// 当firstValue值不为1时，点击头像直接跳转到用户登录页面
            isLogin = false;
        }
    });
});



// 保存任务列表信息
var tableContent;

window.addEventListener('message', function (event) {
    if (event.origin !== 'file://') {  // 检查消息来源是否为本地文件
        return;
    }
    // && event.flag === 'tableinformation'
    if (typeof event.data !== 'number' && event.data.flag === 'tableinformation') {
        tableContent = event.data.data;
        // console.log(tableContent);
        // console.log(tableContent.length);
        // 在这里处理接收到的表格数据
        // 先查询一遍数据库
        connection.query('SELECT * FROM task_name', (error, results, fields) => {
            if (error) {
                console.error('查询失败: ' + error.stack);
                return;
            }
            console.log('-------保存任务开始-------');
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
            console.log('-------保存任务结束-------');
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


let iframe = document.getElementById('iframeId');
let childWindow = iframe.contentWindow;
childWindow.addEventListener('firstMessageType', function (event) {
    console.log('获取到复选框id为:', event.detail.data);
    taskId = event.detail.data;
});

// 把注册用户数据保存在本地数据库
window.addEventListener('message', function (event) {
    if (event.origin !== 'file://') {
        // 确保消息来自期望的子页面域
        return;
    }
    if (event.data.flag === 'userinformation') {
        console.log('Received data from child iframe:', event.data.data);

        var userinf = event.data.data;
        // 先查询一遍数据库
        connection.query('SELECT * FROM users', (error, results, fields) => {
            if (error) {
                console.error('查询失败: ' + error.stack);
                return;
            }
            console.log('初次查询结果成功');
            console.log('查询结果为: ', results);
        });

        //向数据库中添加数据
        for (var i = 0; i < userinf.length; i++) {

            var fullname = userinf[i].fullname;
            var email = userinf[i].email;
            var password = userinf[i].password;
            connection.query('INSERT INTO users (user_name,user_email,user_password) VALUES (?,?,?)', [fullname, email, password], (error, results, fields) => {
                if (error) {
                    console.error('插入数据失败: ' + error.stack);
                    return;
                }
                console.log('用户账号和密码已保存至数据库');
            });
        }

        //查询添加过数据的数据库
        connection.query('SELECT * FROM users', (error, results, fields) => {
            if (error) {
                console.error('查询失败: ' + error.stack);
                return;
            }
            console.log('查询添加过数据的数据库成功');
            console.log('查询结果: ', results);
        });
    }
});



window.addEventListener('message', function (event) {
    if (event.origin !== 'file://') {
        // 确保消息来自期望的子页面域
        return;
    }
    if (event.data.flag === 'isloadinformation') {
        let user_result = new Object();
        //把users数据库中存放的用户数据发送给子页面
        new Promise((resolve, reject) => {
            connection.query('SELECT * FROM users;', (error, results, fields) => {
                if (error) {
                    console.error('查询失败： ' + error.stack);
                    reject(error);
                } else {
                    user_result.data = results;
                    console.log('users数据库存储的用户数据为:', user_result);
                    user_result.flag = 'userinformation';// 标志位，用于判断数据
                    resolve(user_result);
                }
            });
        })
            .then((user_result) => {
                iframe.contentWindow.postMessage(user_result, '*');
            })
            .catch((error) => {
                console.error('发生错误： ', error);
            });
    }
})




var isclick_name;
// 同步当前任务清单的任务名称
window.addEventListener('message', function (event) {
    if (event.origin !== 'file://') {  // 检查消息来源是否为本地文件
        return;
    }
    if (event.data.flag === 'isclick_nameinformation') {
        console.log('-------开始同步当前任务清单的任务名称-------');
        isclick_name = event.data.data;
        console.log(isclick_name);
        // 修改数据库中的isclick字段
        connection.query('UPDATE task_name SET isclick = 1 WHERE name = ?', isclick_name, (error, results, fields) => {
            if (error) {
                console.error('插入数据失败: ' + error.stack);
                return;
            }
            console.log('isclick字段已修改');
        });

        //查询添加过数据的数据库
        connection.query('SELECT * FROM task_name', (error, results, fields) => {
            if (error) {
                console.error('查询失败: ' + error.stack);
                return;
            }
            console.log('数据库查询结果: ', results);
            console.log('-------完成同步当前任务清单的任务名称-------');
        });
    }
})
window.addEventListener('message', function (event) {
    if (event.origin !== 'file://') {
        // 确保消息来自期望的子页面域
        return;
    }
    if (event.data.flag === 'clockloadinformation') {
        var nowtaskname = {
            flag: 'nowtasknameinformation',
            data: isclick_name
        };
        //把users数据库中存放的用户数据发送给子页面
        iframe.contentWindow.postMessage(nowtaskname, '*');
    }
})

// 修改登录用户的信息位
window.addEventListener('message', function (event) {
    if (event.origin !== 'file://') {
        // 确保消息来自期望的子页面域
        return;
    }
    if (event.data.flag === 'isloadedinformation') {
        console.log('-------开始修改登录用户的信息位-------');
        let loadeduseremail = event.data.data;
        // 查询数据库信息
        connection.query('SELECT * FROM users', (error, results, fields) => {
            if (error) {
                console.error('查询失败: ' + error.stack);
                return;
            }
            console.log('初次查询结果成功');
            console.log('查询结果为: ', results);
        });

        // 修改isload数据位
        connection.query('UPDATE users SET isload = 1 WHERE user_email = ?', loadeduseremail, (error, results, fields) => {
            if (error) {
                console.error('插入数据失败: ' + error.stack);
                return;
            }
            console.log('登录用户信息位已修改');
        });

        // 再次查询数据库
        connection.query('SELECT * FROM users', (error, results, fields) => {
            if (error) {
                console.error('查询失败: ' + error.stack);
                return;
            }
            console.log('修改后的查询结果为: ', results);
        });

    }
    console.log('-------完成修改登录用户的信息位-------');
})







//左侧导航栏页面定位函数 start

function changeToClockpage(){
    // 设置 iframe 的 src 属性为时钟界面
    iframe.src = './clockpage.html';
}

function changeToMainpage() {
    // 设置 iframe 的 src 属性为任务列表界面
    iframe.src = './taskadd.html';
}

function changeToPetpage() {
    // 设置 iframe 的 src 属性为宠物界面
    iframe.src = './petpage.html';
}

function changeToCommunitypage() {
    // 设置 iframe 的 src 属性为社区界面
    iframe.src = './communitypage.html';
}

var isLogin;
function changeToUserpage() {
    if (isLogin) {
        // 如果用户已经登录，设置 iframe 的 src 属性为个人主页
        iframe.src = './userpage.html';
    } else {
        // 如果用户没有登陆，设置 iframe 的 src 属性为登录注册页面
        iframe.src = './login.html';
    }
}
//左侧导航栏页面定位函数 end