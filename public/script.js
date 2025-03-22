function checkPassword() {
    const password = document.getElementById('password').value;
    if (password === '32cl47') {
        window.location.href = '/main.html';
    } else {
        document.getElementById('error').style.display = 'block';
    }
}

function submitMessage() {
    const message = document.getElementById('message').value;
    fetch('/api/submit', {  // 修改为 /api/submit
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            document.getElementById('success').style.display = 'block';
        }
    });
}