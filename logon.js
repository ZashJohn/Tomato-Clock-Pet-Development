// 模拟用户数据库
var users = [];

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
        alert("Passwords do not match!");
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

    // 清空注册表单
    document.getElementById('fullname').value = '';
    document.getElementById('registerEmail').value = '';
    document.getElementById('registerPassword').value = '';
    document.getElementById('confirmPassword').value = '';

    // 提示注册成功
    alert("Registration successful! Please login.");

    // 切换到登录表单
    showLoginForm();
}

// 登录函数
function login(event) {
    event.preventDefault(); // 阻止表单提交默认行为

    // 获取表单数据
    var email = document.getElementById('loginEmail').value;
    var password = document.getElementById('loginPassword').value;

    // 在用户数组中查找匹配的用户
    var foundUser = users.find(function(user) {
        return user.email === email && user.password === password;
    });

    if (foundUser) {
        // 登录成功
        alert("Login successful!");
        console.log("Login successful for user:", foundUser);
    } else {
        // 登录失败
        alert("Invalid email or password!");
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