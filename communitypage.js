// JavaScript 文件：communitypage.js

function likePost(btn) {
  var likeCountElement = btn.parentElement.querySelector('.like-count'); // 获取显示点赞数的元素
  var likeCount = parseInt(likeCountElement.textContent); // 获取当前点赞数
  likeCount++; // 点赞数加一
  likeCountElement.textContent = likeCount; // 更新点赞数显示
  alert("点赞了！"); // 显示点赞提示信息
}

  