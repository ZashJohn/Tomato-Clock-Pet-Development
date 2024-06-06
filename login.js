//用户登录和注册页面 start
// 模拟用户数据库
var users = [];
var users_copy = [];

// 隐藏注册表单，显示登录表单
function showLoginForm() {
    document.querySelector('.register-container').style.display = 'none';
    document.querySelector('.login-container').style.display = 'block';
}

// 隐藏登录表单，显示注册表单
function showRegisterForm() {
    document.querySelector('.login-container').style.display = 'none';
    document.querySelector('.register-container').style.display = 'block';
}

// 注册函数
function register(event) {
    event.preventDefault(); // 阻止表单提交默认行为

    // 获取表单数据
    var fullname = document.getElementById('fullname').value;
    var email = document.getElementById('registerEmail').value;
    var password = document.getElementById('registerPassword').value;
    var confirmPassword = document.getElementById('confirmPassword').value;

    // 简单的密码确认
    if (password !== confirmPassword) {
        alert("两次输入密码不一致");
        return;
    }

    // 创建用户对象
    var newUser = {
        fullname: fullname,
        email: email,
        password: password
    };

    // 将新用户添加到用户数组中
    users.push(newUser);

    //把User数据传输给父页面，父页面再把数据保存到本地数据库
    var userinf = {
        flag: 'userinformation',
        data: users
    };
    window.parent.postMessage(userinf, '*');

    // 清空注册表单
    document.getElementById('fullname').value = '';
    document.getElementById('registerEmail').value = '';
    document.getElementById('registerPassword').value = '';
    document.getElementById('confirmPassword').value = '';

    // 提示注册成功
    alert("注册成功，请登录！");

    //console.log("users长度测试",users.length);

    // 切换到登录表单
    window.location.href = "./login.html";
    users.splice(0);
}


//把父页面传递的用户数据赋值给子页面数组中
window.addEventListener("load", () => {
    var isload = {
        flag: 'isloadinformation',
        data: true
    };
    window.parent.postMessage(isload, '*'); 
    console.log('测试代码addEventListener.load已经执行');



    var userObject = new Object();
    // 监听message事件
    window.addEventListener('message', function (event) {
        // 确定消息来源是否可信
        if (event.origin !== 'file://') {
            return;
        }
        if (event.data.flag === 'userinformation') {
            // 处理接收到的消息
            userObject = event.data.data;
            users_copy = userObject;
            console.log('接收到的用户数据users_copy: ', users_copy);
        }

    }, false);
});

// 登录函数
function login(event) {
    event.preventDefault(); // 阻止表单提交默认行为

    // 获取表单数据
    var email = document.getElementById('loginEmail').value;
    var password = document.getElementById('loginPassword').value;

    // 在用户数组中查找匹配的用户
    console.log('测试代码users_copy:', users_copy);
    var foundUser = users_copy.find(function (user) {
        return user.user_email === email && user.user_password === password;
    });

    if (foundUser) {
        // 登录成功
        alert("登录成功");
        //isLogin = true;//标志位，用于判断当前是否有用户已经登录
        // 设置 iframe 的 src 属性为个人中心页面
        window.location.href = './userpage.html';
        console.log("用户登录成功:", foundUser);

        // 向数据库中存放登录用户的信息位
        var isloaded = {
            flag: 'isloadedinformation',
            data: email
        };
        window.parent.postMessage(isloaded, '*');

    } else {
        // 登录失败
        alert("无效的邮箱或错误的密码");
    }
}

// 获取表单元素并添加事件监听器
document.getElementById('registerForm').addEventListener('submit', register);
document.getElementById('loginForm').addEventListener('submit', login);

// 添加事件监听器，以切换表单的显示状态
document.getElementById('registerLink').addEventListener('click', showRegisterForm);
document.getElementById('loginLink').addEventListener('click', showLoginForm);

// 默认显示登录表单
showLoginForm();

//用户登录和注册页面 end