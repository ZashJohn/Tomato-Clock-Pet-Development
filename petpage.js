let walletAmount = 1000; // Initial amount in wallet
let myPets = []; // Array to store bought pets
let backpackExp = 10000; // 背包初始经验值
let petProgress = 0; // 宠物进度条初始值
let petLevel = 1; // 宠物初始等级
const maxPetLevel = 3; // 宠物的最高等级
const expThresholds = [50, 100, 150]; // 每个等级的经验值阈值
const progressLengths = ['50%', '75%', '100%']; // 不同阶段的进度条长度
const progressIncrements = [20, 10, 5]; // 不同等级对应的进度条增量


// 爱心动画效果
document.addEventListener("DOMContentLoaded", function() {
    const petImg = document.getElementById("petImg");
    const heartImg = document.createElement("img"); // 创建爱心图片元素
    heartImg.src = "./images/love_1.png"; // 初始爱心图片
    heartImg.id = "heartImg"; // 给爱心图片设置 id
    petImg.parentNode.appendChild(heartImg); // 将爱心图片添加到宠物图片的父元素中

    let frameIndex = 1;
    setInterval(() => {
        frameIndex = (frameIndex % 4) + 1; // Assuming you have 4 frames of animation
        petImg.src = `./images/pet_frame_${frameIndex}.png`;
        if (petLevel >= 2) { // 只有在宠物等级达到第二级及以上时才显示爱心图片
            heartImg.style.display = "inline"; // 显示爱心图片
            heartImg.src = `./images/love_${frameIndex}.png`; // 更新爱心图片
        } else {
            heartImg.style.display = "none"; // 隐藏爱心图片
        }
    }, 200); // Change frame every 200 milliseconds
});

// 蝴蝶结动画效果
document.addEventListener("DOMContentLoaded", function() {
    const petImg = document.getElementById("petImg");
    const jieImg = document.createElement("img"); // 创建蝴蝶结图片元素
    jieImg.src = "./images/jie_1.png"; // 初始蝴蝶结图片
    jieImg.id = "jieImg"; // 给蝴蝶结图片设置 id
    petImg.parentNode.appendChild(jieImg); // 将蝴蝶结图片添加到宠物图片的父元素中

    let frameIndex = 1;
    setInterval(() => {
        frameIndex = (frameIndex % 4) + 1; // Assuming you have 4 frames of animation
        petImg.src = `./images/pet_frame_${frameIndex}.png`;
        if (petLevel == 3) { // 只有在宠物等级达到第三级时才显示蝴蝶结图片
            jieImg.style.display = "inline"; // 显示蝴蝶结图片
            jieImg.src = `./images/jie_${frameIndex}.png`; // 更新蝴蝶结图片
        } else {
            jieImg.style.display = "none"; // 隐藏蝴蝶结图片
        }
    }, 200); // Change frame every 200 milliseconds
});



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

    // 更新宠物图片
    petImg.src = `./images/pet_level${petLevel}.png`;

    // 更新背包经验值显示
    expDisplay.textContent = `背包经验值: ${backpackExp}`;
    walletDisplay.textContent = `￥${walletAmount}`;
}

// Function to buy a pet
function buyPet(price) {
    if (walletAmount >= price) {
        walletAmount -= price;
        alert("兑换成功!");
        let petId = event.target.parentNode.id;
        let petImg = document.getElementById(petId).querySelector("img").src;
        myPets.push(petImg);
        updateMyPets();
    } else {
        alert("你的钱包里没有足够的钱!");
    }
    updateUI();
}

// Function to update My Pets list
function updateMyPets() {
    let myPetsList = document.getElementById("myPetsList");
    myPetsList.innerHTML = "";
    myPets.forEach(pet => {
        let img = document.createElement("img");
        img.src = pet;
        myPetsList.appendChild(img);
    });
}

// 喂食事件处理函数
function feedPet() {
    if (backpackExp >= 50) {
        backpackExp -= 50; // 从背包中扣除50经验值
        petProgress += progressIncrements[petLevel - 1]; // 根据等级增加进度
        if (petProgress > 100) {
            petProgress = 100; // 确保进度条不超过100%
        }
        document.getElementById('progress').style.backgroundColor = '#4caf50'; // 进度条变为绿色
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

// 动画效果
document.addEventListener("DOMContentLoaded", function() {
    const petImg = document.getElementById("petImg");
    let frameIndex = 1;
    setInterval(() => {
        frameIndex = (frameIndex % 4) + 1; // Assuming you have 4 frames of animation
        petImg.src = `./images/pet_frame_${frameIndex}.png`;
    }, 200); // Change frame every 200 milliseconds
});

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
