document.addEventListener("DOMContentLoaded", function() {
  updateUI();
});

// 更新界面，生成所有评论
function updateUI() {
  const mainContentArea = document.getElementById("main-content-area");
  mainContentArea.innerHTML = ''; // 清空当前内容

  // 获取保存的评论
  const comments = JSON.parse(localStorage.getItem("comments")) || [];

  // 动态生成评论卡片
  comments.forEach(commentObj => {
    const contentLeft = document.createElement("div");
    contentLeft.className = "content-left";

    const leftLeft = document.createElement("div");
    leftLeft.className = "left-left";
    const img = document.createElement("img");
    img.src = "./images/profilephoto.jpg";
    img.alt = "个人头像";
    leftLeft.appendChild(img);

    const leftRight = document.createElement("div");
    leftRight.className = "left-right";
    const p1 = document.createElement("p");
    p1.textContent = commentObj.text;
    leftRight.appendChild(p1);

    const likeBtn = document.createElement("button");
    likeBtn.className = "like-btn";
    if (commentObj.liked) {
      likeBtn.disabled = true; // 如果已经点赞，则禁用按钮
    }
    likeBtn.onclick = function() { likePost(this) };
    const likeImg = document.createElement("img");
    likeImg.className = "like-img";
    likeImg.src = "./images/like.png";
    likeImg.alt = "点赞";
    likeBtn.appendChild(likeImg);
    leftRight.appendChild(likeBtn);

    const likeCount = document.createElement("span");
    likeCount.className = "like-count";
    likeCount.textContent = commentObj.likes;
    leftRight.appendChild(likeCount);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "删除";
    deleteBtn.className = "delete-btn";
    deleteBtn.onclick = function() { deletePost(this) };
    leftRight.appendChild(deleteBtn);

    contentLeft.appendChild(leftLeft);
    contentLeft.appendChild(leftRight);

    mainContentArea.insertBefore(contentLeft, mainContentArea.firstChild); // 插入到顶部
  });
}

// 点赞功能
function likePost(btn) {
  const likeCountSpan = btn.nextElementSibling;
  let likeCount = parseInt(likeCountSpan.textContent);
  if (likeCount === 0) {
    likeCount++;
    likeCountSpan.textContent = likeCount;
    btn.disabled = true; // 禁用按钮
  }
  // 更新 localStorage 中的点赞数和点赞状态
  const commentText = btn.parentNode.querySelector("p").textContent;
  const comments = JSON.parse(localStorage.getItem("comments")) || [];
  const index = comments.findIndex(comment => comment.text === commentText);
  if (index !== -1) {
    comments[index].likes = likeCount;
    comments[index].liked = true;
    localStorage.setItem("comments", JSON.stringify(comments));
  }
}

// 删除帖子功能
function deletePost(btn) {
  const commentItem = btn.parentNode.parentNode; // 获取帖子卡片元素
  const commentText = commentItem.querySelector("p").textContent; // 获取帖子内容
  const comments = JSON.parse(localStorage.getItem("comments")) || [];
  const index = comments.findIndex(comment => comment.text === commentText); // 查找帖子在数组中的索引
  if (index !== -1) {
    comments.splice(index, 1); // 从数组中删除帖子内容
    localStorage.setItem("comments", JSON.stringify(comments)); // 更新 localStorage
    updateUI(); // 更新界面
  }
}

// 发送评论
function sendComment() {
  const commentInput = document.getElementById("comment-input");
  const commentText = commentInput.value.trim();

  if (commentText !== "") {
    // 保存评论到 localStorage
    const comments = JSON.parse(localStorage.getItem("comments")) || [];
    comments.push({ text: commentText, likes: 0, liked: false });
    localStorage.setItem("comments", JSON.stringify(comments));

    commentInput.value = ''; // 清空输入框
    updateUI(); // 更新界面
  } else {
    alert("评论不能为空！");
  }
}
