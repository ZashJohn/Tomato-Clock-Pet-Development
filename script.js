
//时钟 start
let isStart = true;
let timerInterval;
let totalSeconds = 0;
let totalSecondsCopy = 0;
let pauseTotalTime = 0;
let isTimerRunning = false;
let nowTimes = 1;//目前的专注次数
// 循环次数
let times = 0;
// 休息时间 默认为5mins
let breaktimes = 0;//休息的次数
let isBreak = false;//是否处于休息状态
let breakTime = 0;//默认休息时间
let breakTotalTime = 0;
// 是否处于暂停期间
let isPause = false;


//开始时间
function startTimer() {
  // 如果点击的时候倒计时正在运行就重置时钟为当前设置的时间
  if (isTimerRunning && !isBreak && !isPause) {
    totalSeconds = parseInt(document.getElementById('minute').value * 60) + parseInt(document.getElementById('second').value);
    totalSecondsCopy = totalSeconds;
    times = parseInt(document.getElementById('times').value);
    breaktimes = times - 1;
    breakTime = parseInt(document.getElementById('breakTime').value * 60);
    if (isNaN(totalSeconds) || totalSeconds <= 0) {
      alert('请输入正确的时间');
      return;
    }
    clearInterval(timerInterval);
    nowTimes = 1;
    tableUpdateInterval = setInterval(tableUpdate, 1000);
  }

  // 如果点击的时候倒计时没有在运行就把倒计时时间设定为input中输入的数字
  if (!isTimerRunning && !isBreak && !isPause) {
    totalSeconds = parseInt(document.getElementById('minute').value * 60) + parseInt(document.getElementById('second').value);
    totalSecondsCopy = totalSeconds;
    times = parseInt(document.getElementById('times').value);
    breaktimes = times - 1;
    breakTime = parseInt(document.getElementById('breakTime').value * 60);
    if (isNaN(totalSeconds) || totalSeconds <= 0) {
      alert('请输入正确的时间');
      return;
    }
    nowTimes = 1;
    tableUpdateInterval = setInterval(tableUpdate, 1000);
  }

  // 当处于专注暂停期间重新开始计时
  if (!isTimerRunning && !isBreak && isPause);

  // 当处于休息暂停期间重新开始计时时
  if (!isTimerRunning && isBreak && isPause) {
    isStart = false;
    breakTotalTime = pauseTotalTime;
    timerInterval = setInterval(breakTimer, 1000);
    isPause = false;
    return;
  }
  //调试总时间
  //window.alert(totalSeconds);
  if (isStart) {
    isTimerRunning = true;
    timerInterval = setInterval(updateTimer, 1000);
  }
  function sendTimeContentToParent() {
    var table_time = totalSeconds;  // 替换成实际的表格 id
    var tableData = table_time;
    alert('测试');
    alert(tableData);
    // 获取到任务总时间，将内容存储到 tableData 变量中
    tableData = table_time;
    // 将表格数据发送给父页面
    window.parent.postMessage(tableData, '*');
  }
  sendTimeContentToParent();
}


//暂停时间
function stopTimer() {
  //当工作时间暂停时
  if (isTimerRunning) {
    isPause = true;
    clearInterval(timerInterval);
    isTimerRunning = false;
    document.getElementById('clock-title').innerText = '暂停中';
  }
  //当休息时间暂停时
  if (isBreak) {
    isPause = true;
    clearInterval(timerInterval);
    pauseTotalTime = breakTotalTime;//暂停时剩余的休息时间
    document.getElementById('clock-title').innerText = '暂停中';
  }
}

//专注时间
function updateTimer() {
  // 获取分钟数
  const minutes = Math.floor(totalSeconds / 60);
  // 获取剩余秒数
  const seconds = totalSeconds % 60;
  // 确保分钟数和秒数在显示时始终显示两位数字
  document.getElementById('timer').innerText = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  totalSeconds--;
  // 当第一次专注时间结束后进入休息时间
  if (times > 1 && totalSeconds == 0) {
    times--;
    nowTimes++;
    totalSeconds = totalSecondsCopy;
    // 当休息次数大于1时进入休息倒计时
    if (breaktimes >= 1) {
      isBreak = true;
      isTimerRunning = false;
      clearInterval(timerInterval);
      breakTotalTime = breakTime;
      timerInterval = setInterval(breakTimer, 1000);
    }
  }
  //当倒计时开始时圆环内部的文字为“专注中”
  if (totalSeconds > 0) {
    document.getElementById('clock-title').innerText = '专注中';
  }
  //当倒计时停止时圆环内部的文字为“时间到了！”
  if (totalSeconds < 0) {
    document.getElementById('clock-title').innerText = '时间到了！';
    // 如果休息次数为0(专注次数为1)就直接结束计时
    if (times <= 1) {
      clearInterval(timerInterval);
      //重置时钟
      isStart = true;
      timerInterval;
      totalSeconds = 0;
      totalSecondsCopy = 0;
      pauseTotalTime = 0;
      isTimerRunning = false;
      // 循环次数
      times = 0;
      // 休息时间 默认为5mins
      breaktimes = 0;//休息的次数
      isBreak = false;//是否处于休息状态
      breakTime = 0;//默认休息时间
      breakTotalTime = 0;
      // 是否处于暂停期间
      isPause = false;
      nowTimes++;
      clearInterval(tableUpdateInterval);
    }
  }
}

//休息时间
function breakTimer() {
  // 获取分钟数
  const minutes = Math.floor(breakTotalTime / 60);
  // 获取剩余秒数
  const seconds = breakTotalTime % 60;
  //确保分钟数和秒数在显示时始终显示两位数字
  document.getElementById('timer').innerText = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  breakTotalTime--;
  //当休息倒计时圆环内部的文字为“休息中”
  if (breakTotalTime > 0) {
    document.getElementById('clock-title').innerText = '休息中';
  }
  //当倒计时停止时圆环内部的文字为“休息时间到了！”
  if (breakTotalTime < 0) {
    document.getElementById('clock-title').innerText = '休息时间到了！';
    clearInterval(timerInterval);
    isBreak = false;
    isTimerRunning = true;
    timerInterval = setInterval(updateTimer, 1000);
    isStart = true;
  }
}

//重置时钟
function restart() {
  isStart = true;
  timerInterval;
  totalSeconds = 0;
  totalSecondsCopy = 0;
  pauseTotalTime = 0;
  isTimerRunning = false;
  // 循环次数
  times = 0;
  // 休息时间 默认为5mins
  breaktimes = 0;//休息的次数
  isBreak = false;//是否处于休息状态
  breakTime = 0;//默认休息时间
  breakTotalTime = 0;
  // 是否处于暂停期间
  isPause = false;
  document.getElementById('clock-title').innerText = '未开始';
  document.getElementById('timer').innerText = "00:00";
}
//时钟 end



//右下 任务列表 start
let selectedRow = null;

// 编辑任务
function editTask(cell) {
  cell.setAttribute('contenteditable', 'true'); // 设置任务单元格为可编辑
  cell.focus(); // 让任务单元格获得焦点
}

// 保存任务
function saveTasks() {
  const tasks = document.querySelectorAll('.task-list td.editable');
  tasks.forEach(task => {
    if (task.parentElement.classList.contains('selected')) {
      task.removeAttribute('contenteditable'); // 移除选中任务的编辑状态
      task.addEventListener('click', function () {
        editTask(this); // 保留点击事件监听器，以便用户可以继续编辑
      });
    }
  });
  sendTableContentToParent();
}
// 把iframe标签中的数据发送给父页面
function sendTableContentToParent() {
  var table = document.getElementById('task-list-id');  // 替换成实际的表格 id
  var tableData = [];

  // 遍历表格行和单元格，将内容存储到 tableData 数组中
  for (var i = 1; i < table.rows.length; i++) {
    var rowData = [];
    for (var j = 0; j < (table.rows[i].cells.length - 2); j++) {
      rowData.push(table.rows[i].cells[j].innerText);
    }
    tableData.push(rowData);
  }

  // 将表格数据发送给父页面
  window.parent.postMessage(tableData, '*');
}


// 新建任务(创建表格行)
function addNewTask() {
  const taskList = document.querySelector('.task-list');
  const rowCount = taskList.rows.length;
  const newRow = taskList.insertRow(rowCount); // 插入新行
  newRow.innerHTML = '<td>' + rowCount + '</td>' + // 编号列
    '<td class="editable" contenteditable="true">新建任务</td>' + // 任务列
    '<td><input type="checkbox" onclick="toggleCheckbox(this)"></td>' + // 新添加的勾选按钮列
    '<td><button onclick="deleteRow(this)">删除</button></td>'; // 新添加的删除按钮列
}

//加载页面之后初始化任务列表
window.addEventListener("load", () => {
  var tasknum = new Object();
  // 监听message事件
  window.addEventListener('message', function (event) {
    // 确定消息来源是否可信
    if (event.origin !== 'file://') {
      return;
    }
    // 处理接收到的消息
    tasknum = event.data;
    console.log('接收到的消息: ', tasknum.data);
    console.log('接收到的消息: ' + tasknum.tasknums);
    //添加指定的行数
    for (let i = 1; i < tasknum.tasknums; i++) {
      addNewTask();
      //console.log('新建一行');
    }
    //修改任务行的内容
    let tablecom = document.getElementById('task-list-id');
    let rows = tablecom.getElementsByTagName("tr");
    for (let i = 1; i < rows.length; i++) {
      let cells = rows[i].getElementsByTagName("td");
      for (let j = 1; j < (cells.length) - 2; j++) {
        cells[j].innerText = tasknum.data[i - 1].name
        console.log('这是第二个测试', tasknum.data[i - 1].name);
      }
    }
  }, false);

  //console.log(tablecom);





})

// 选择任务
function selectTask(row) {
  if (selectedRow !== null) {
    selectedRow.classList.remove('selected');
  }
  row.classList.add('selected');
  selectedRow = row;
}

// 切换勾选按钮状态
var selectedId;
function toggleCheckbox(checkbox) {
  let checkboxes = document.querySelectorAll('.task-list input[type="checkbox"]');
  checkboxes.forEach(cb => {
    if (cb !== checkbox) {
      cb.checked = false; // 只允许一个勾选按钮被选中
    }
    if (cb === checkbox) {
      //通过勾选框获取到父容器所在的行
      let selectedRow = checkbox.parentElement.parentElement;
      //console.log(selectedRow.cells[1].textContent);
      selectedId = selectedRow.cells[0].textContent;
      let secondCellContent = selectedRow.cells[1].textContent;
      document.getElementById('task-target').textContent = secondCellContent;

      var checkboxId = new CustomEvent('firstMessageType', { detail: { data: selectedId } });
      //alert('测试复选框id' + selectedId);
      window.dispatchEvent(checkboxId);
    }
  });
  tableUpdate();
}

// 删除行
function deleteRow(button) {
  const row = button.parentNode.parentNode;
  row.parentNode.removeChild(row); // 删除所在行
  updateTaskNumbers(); // 更新任务编号
}

// 更新任务编号
function updateTaskNumbers() {
  const rows = document.querySelectorAll('.task-list tr');
  rows.forEach((row, index) => {
    if (index > 0) { // 跳过表头
      row.cells[0].textContent = index; // 更新任务编号
    }
  });
}

function tableUpdate() {
  let task_times = parseInt(document.getElementById('times').value);
  let Seconds = parseInt(((document.getElementById('minute').value * 60) + parseInt(document.getElementById('second').value)) * task_times);
  const minute = Math.floor(Seconds / 60);
  const second = Seconds % 60;
  document.getElementById('task-times').textContent = `第${nowTimes}次专注`;
  document.getElementById('time-summary').textContent = `${minute}分${second}秒`;
}

//右下 任务列表 end


//主页面左下选择宠物 start

function openPopup() {
  const popup = document.getElementById('popup');
  popup.style.display = 'block';
}

function optionSelected(option) {
  switch (option) {
    case 1:
      alert('您选择了第一个宠物');
      window.location.href = "pet1.html"; // 跳转到宠物 1 页面
      break;
    case 2:
      alert('您选择了第二个宠物');
      window.location.href = "pet2.html"; // 跳转到宠物 2 页面
      break;
    case 3:
      alert('您选择了第三个宠物');
      window.location.href = "pet3.html"; // 跳转到宠物 3 页面
      break;
    default:
      alert('无效的选项');
  }
}

function closePopup() {
  const popup = document.getElementById('popup');
  popup.style.display = 'none';
}


//用户登录和注册页面 start
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

  // 清空注册表单
  document.getElementById('fullname').value = '';
  document.getElementById('registerEmail').value = '';
  document.getElementById('registerPassword').value = '';
  document.getElementById('confirmPassword').value = '';

  // 提示注册成功
  alert("注册成功，请登录！");

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
  var foundUser = users.find(function (user) {
    return user.email === email && user.password === password;
  });

  if (foundUser) {
    // 登录成功
    alert("登录成功");
    isLogin = true;
    // 设置 iframe 的 src 属性为个人中心页面
    window.location.href = './userpage.html';
    console.log("用户登录成功:", foundUser);
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




