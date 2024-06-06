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
}

// 新建任务
function addNewTask() {
  const taskList = document.querySelector('.task-list');
  const rowCount = taskList.rows.length;
  const newRow = taskList.insertRow(rowCount); // 插入新行
  newRow.innerHTML = '<td>' + rowCount + '</td>' + // 编号列
    '<td class="editable" contenteditable="true">新建任务</td>' + // 任务列
    '<td><input type="checkbox" onclick="toggleCheckbox(this)"></td>' + // 新添加的勾选按钮列
    '<td><button onclick="deleteRow(this)">删除</button></td>'; // 新添加的删除按钮列
}

// 选择任务
function selectTask(row) {
  if (selectedRow !== null) {
    selectedRow.classList.remove('selected');
  }
  row.classList.add('selected');
  selectedRow = row;
}

// 切换勾选按钮状态
function toggleCheckbox(checkbox) {
  const checkboxes = document.querySelectorAll('.task-list input[type="checkbox"]');
  checkboxes.forEach(cb => {
    if (cb !== checkbox) {
      cb.checked = false; // 只允许一个勾选按钮被选中
    }
    if (cb === checkbox) {
      let selectedRow = checkbox.parentElement.parentElement;
      let secondCellContent = selectedRow.cells[1].textContent;
      document.getElementById('task-target').textContent = secondCellContent;
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




function closePopup() {
  const popup = document.getElementById('popup');
  popup.style.display = 'none';
}
//主页面左下选择宠物 end

//左侧导航栏页面定位函数 start
function changeToMainpage(){
  var iframe = document.querySelector('iframe');
  // 设置 iframe 的 src 属性为百度网址
  iframe.src = './mainpage.html';
  if (isTimerRunning) {
    alert("专注的时候不要做其他事情哦！");
    return false; // 阻止默认行为（不进行页面跳转）
  }
  // 如果时钟不在运行，则允许跳转到时钟页面
  return true;
}

function changeToPetpage(){
  var iframe = document.querySelector('iframe');
  // 设置 iframe 的 src 属性为百度网址
  iframe.src = './petpage.html';
}

function changeToCommunitypage(){
  var iframe = document.querySelector('iframe');
  // 设置 iframe 的 src 属性为百度网址
  iframe.src = './communitypage.html';
}

function changeToUserpage(){
  var iframe = document.querySelector('iframe');
  // 设置 iframe 的 src 属性为百度网址
  iframe.src = './userpage.html';
}
//左侧导航栏页面定位函数 end