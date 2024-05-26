let walletAmount = 200; // Initial amount in wallet
let myPets = []; // Array to store bought pets

// Function to buy a pet
function buyPet(price) {
    if (walletAmount >= price) {
        walletAmount -= price;
        document.getElementById("walletAmount").innerText = "￥" + walletAmount;
        alert("兑换成功!");
        let petId = event.target.parentNode.id;
        let petImg = document.getElementById(petId).querySelector("img").src;
        myPets.push(petImg);
        updateMyPets();
    } else {
        alert("你的钱包里没有足够的钱!");
    }
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

const wallet = document.querySelector('.wallet');
const moneySpan = document.querySelector('.money');

wallet.addEventListener('mouseover', () => {
    moneySpan.style.display = 'inline';
});

wallet.addEventListener('mouseleave', () => {
    moneySpan.style.display = 'none';
});

moneySpan.addEventListener('click', () => {
    let money = parseInt(moneySpan.textContent);

    if (money >= 20) {
        money -= 20;
        moneySpan.textContent = money;
        alert('兑换成功！');
    } else {
        alert('你的钱不够哦！');
    }
});