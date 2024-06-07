let walletAmount = 1000; // Initial amount in wallet
let myPets = []; // Array to store bought pets
var backpackExp; // 背包初始经验值
let petProgress = 0; // 宠物进度条初始值
let petLevel = 1; // 宠物初始等级
const maxPetLevel = 3; // 宠物的最高等级
const expThresholds = [50, 100, 150]; // 每个等级的经验值阈值
const progressLengths = ['50%', '75%', '100%']; // 不同阶段的进度条长度
const progressIncrements = [20, 10, 5]; // 不同等级对应的进度条增量

// Function to update UI
function updateUI() {
    const progress = document.getElementById('progress');
    const expDisplay = document.getElementById('exp');
    const petImg = document.getElementById('petImg');
    const walletDisplay = document.getElementById('walletAmount');

    // 更新进度条宽度和进度
    const progressBar = document.querySelector('.progress-bar');
    progressBar.style.width = progressLengths[petLevel - 1];
    progress.style.width = `${petProgress}%`;

    // 更新背包经验值显示
    expDisplay.textContent = `背包经验值: ${backpackExp}`;
    walletDisplay.textContent = `￥${walletAmount}`;

    // 更新宠物图片
    if (petLevel === 2) {
        petImg.src = './images/Hello_2.gif';
    } else if (petLevel === 3) {
        petImg.src = './images/Hello_3.gif';
    } else {
        petImg.src = './images/Hello_1.gif'; // 默认图片
    }
}

// 喂食事件处理函数
function feedPet() {
    if (backpackExp >= 50) {
        backpackExp -= 50; // 从背包中扣除50经验值
        petProgress += progressIncrements[petLevel - 1]; // 根据等级增加进度
        if (petProgress > 100) {
            petProgress = 100; // 确保进度条不超过100%
        }
        document.getElementById('progress').style.backgroundColor = '#ffb6c1'; // 进度条变为绿色
        checkLevelUp(); // 检查是否升级
        updateUI();
    } else {
        alert("背包经验值不足，无法喂食！");
    }
}

// 检查是否升级
function checkLevelUp() {
    if (petProgress >= 100) {
        if (petLevel < maxPetLevel) {
            petProgress = 100; // 先将进度条填满
            updateUI(); // 立即更新UI显示满的进度条
            setTimeout(() => {
                petLevel++; // 提升宠物等级
                petProgress = 0; // 重置宠物进度
                document.getElementById('progress').style.backgroundColor = '#fff'; // 重置为白色
                updateUI(); // 再次更新UI
                alert("宠物升级啦！"); // 然后显示提示
            }, 500); // 延迟0.5秒显示提示
        } else {
            alert("宠物已经满级啦！"); // 弹出提示宠物已经满级
        }
    }
}

const wallet = document.querySelector('.wallet');
const moneySpan = document.querySelector('.money');

wallet.addEventListener('mouseover', () => {
    moneySpan.style.display = 'inline';
});

wallet.addEventListener('mouseleave', () => {
    moneySpan.style.display = 'none';
});

moneySpan.addEventListener('click', () => {
    let money = parseInt(moneySpan.textContent.replace('￥', ''));

    if (money >= 20) {
        money -= 20;
        moneySpan.textContent = '￥' + money;
        alert('兑换成功！');
    } else {
        alert('你的钱不够哦！');
    }
});



// 初始化界面
document.addEventListener("DOMContentLoaded", updateUI);


window.addEventListener('load', () => {
    var totalexp = {
        flag: 'totalexpinformation'
    };
    window.parent.postMessage(totalexp, '*');
})


window.addEventListener('message', function (event) {
    if (event.origin !== 'file://') {
        return;
    }
    if (event.data.flag === 'expinformation') {
        backpackExp = event.data.data;
        console.log('backpackExp为:', backpackExp);
        updateUI();
    }
})