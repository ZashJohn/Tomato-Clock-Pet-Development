//左侧导航栏页面定位函数 start
function changeToMainpage() {
    var iframe = document.querySelector('iframe');
    // 设置 iframe 的 src 属性为百度网址
    iframe.src = './mainpage.html';
}

function changeToPetpage() {
    var iframe = document.querySelector('iframe');
    // 设置 iframe 的 src 属性为百度网址
    iframe.src = './petpage.html';
}

function changeToCommunitypage() {
    var iframe = document.querySelector('iframe');
    // 设置 iframe 的 src 属性为百度网址
    iframe.src = './communitypage.html';
}

var isLogin = false;
var iframeCopy;
function changeToUserpage() {
    if (isLogin) {
        var iframe = document.querySelector('iframe');
        // 如果用户已经登录，设置 iframe 的 src 属性为个人主页
        // ./userpage.html
        iframe.src = './userpage.html';
    } else {
        var iframe = document.querySelector('iframe');
        // 如果用户没有登陆，设置 iframe 的 src 属性为登录注册页面
        iframe.src = './login.html';
        console.log(iframe.src);
        iframeCopy = iframe;
    }
}
//左侧导航栏页面定位函数 end
