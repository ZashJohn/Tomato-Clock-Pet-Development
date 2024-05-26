function submitForm() {
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;

    fetch('/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: name, email: email })
    })
    .then(response => {
        if (response.ok) {
            alert('数据已成功提交到数据库！');
        } else {
            alert('发生错误，请重试。');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
