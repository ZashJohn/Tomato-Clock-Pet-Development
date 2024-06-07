
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
  if (!isTimerRunning && !isBreak && isPause) {
    isTimerRunning = true;
    isPause = false;
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
  };

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
    sendTimeContentToParent();
  }
}
function sendTimeContentToParent() {
  var table_time = (totalSeconds * times);  // 替换成实际的表格 id
  var tableData = {
    data : table_time,
    flag : 'nowtasktimeinformation'
  };
  console.log('测试---当前任务的时间为',tableData);
  // 获取到任务总时间，将内容存储到 tableData 变量中
  // 将表格数据发送给父页面
  window.parent.postMessage(tableData, '*');
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
      var workedtime = totalSeconds;
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



// 当前任务清单 start

function tableUpdate() {
  let task_times = parseInt(document.getElementById('times').value);
  let Seconds = parseInt(((document.getElementById('minute').value * 60) + parseInt(document.getElementById('second').value)) * task_times);
  const minute = Math.floor(Seconds / 60);
  const second = Seconds % 60;
  document.getElementById('task-times').textContent = `第${nowTimes}次专注`;
  document.getElementById('time-summary').textContent = `${minute}分${second}秒`;
}

// 当前任务清单 end




window.addEventListener("load", () => {
  console.log('测试标记');
  var clockload = {
    flag: 'clockloadinformation'
  };
  window.parent.postMessage(clockload, '*');
})

window.addEventListener('message', function (event) {
  // 确定消息来源是否可信
  if (event.origin !== 'file://') {
    return;
  }
  if (event.data.flag === 'nowtasknameinformation') {
    // 处理接收到的消息
    document.getElementById('task-target').textContent = event.data.data;
  }
}, false);




