document.querySelector('.logout-button').addEventListener('click', function() {
    // 退出登录操作(把数据库信息位重置)
    var loadout = {
        flag: 'loadoutinformation'
    };
    window.parent.postMessage(loadout, '*');
    // 跳转到登录页面
    window.location.href = 'login.html';
  });