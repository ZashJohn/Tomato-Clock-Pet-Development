document.querySelector('.logout-button').addEventListener('click', function () {
    // 退出登录操作(把数据库信息位重置)
    var loadout = {
        flag: 'loadoutinformation'
    };
    window.parent.postMessage(loadout, '*');
    // 跳转到登录页面
    window.location.href = 'login.html';
});

window.addEventListener('load', () => {
    var loadtime = {
        flag: 'loadtimeinformation'
    };
    window.parent.postMessage(loadtime, '*');
})



var totaltime = document.querySelector('.total_time');//总时长
var todaytime = document.querySelector('.worked_time');//今日时长
window.addEventListener('message', function (event) {
    // 确定消息来源是否可信
    if (event.origin !== 'file://') {
        return;
    }
    if (event.data.flag === 'timeinformation') {
        // 处理接收到的消息
        let total_mins = Math.floor(event.data.total_time / 60);
        let hour = Math.floor(total_mins / 60);
        let mins = total_mins % 60;
        let secs = event.data.total_time % 60;
        if (total_mins >= 60) {
            totaltime.innerHTML = `总时长: ${hour} 小时 ${mins} 分 ${secs} 秒`;
        } else {
            totaltime.innerHTML = `总时长: ${mins} 分 ${secs} 秒`;
        }

        let today_total_mins = Math.floor(event.data.today_time / 60);
        let today_hour = Math.floor(today_total_mins / 60);
        let today_mins = today_total_mins % 60;
        let today_secs = event.data.today_time % 60;

        if (today_total_mins >= 60) {
            todaytime.innerHTML = `今日时长: ${today_hour} 小时 ${today_mins} 分 ${today_secs} 秒`;
        } else {
            todaytime.innerHTML = `今日时长: ${today_mins} 分 ${today_secs} 秒`;
        }
    }
}, false);