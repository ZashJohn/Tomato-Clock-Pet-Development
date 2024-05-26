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

function submit(event) {
    event.preventDefault(); // 阻止表单默认提交行为

    var name = document.getElementById('fullname').value;  // 修改为正确的ID
    var email = document.getElementById('registerEmail').value;
    var password = document.getElementById('registerPassword').value;

    // 发送注册请求的逻辑
    fetch('/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: name, email: email, password: password })
    })
    .then(response => {
        if (response.ok) {
            alert('注册成功！');
        } else {
            alert('注册失败，请重试。');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
function login(event) {
    event.preventDefault(); // 阻止表单默认提交行为

    var email = document.getElementById('loginEmail').value;
    var password = document.getElementById('loginPassword').value;

    // 发送登录请求的逻辑
    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email, password: password })
    })
    .then(response => {
        if (response.ok) {
            alert('登录成功！');
        } else {
            alert('登录失败，请检查邮箱和密码。');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });    
}

// 获取表单元素并添加事件监听器
document.getElementById('registerForm').addEventListener('submit', submit);
document.getElementById('loginForm').addEventListener('submit', login);

// 添加事件监听器，以切换表单的显示状态
document.getElementById('registerLink').addEventListener('click', showRegisterForm);
document.getElementById('loginLink').addEventListener('click', showLoginForm);

// 默认显示登录表单
showLoginForm();
