// 处理密码页面的逻辑
function checkPassword() {
  const password = document.getElementById('password').value;

  // 调用无服务器函数验证密码
  fetch('/api/check-password', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password }),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('网络响应异常');
      }
      return response.json();
    })
    .then(data => {
      if (data.success) {
        // 密码正确，跳转到留言页面
        window.location.href = '/main.html';
      } else {
        // 密码错误，显示错误信息
        document.getElementById('error').style.display = 'block';
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('密码验证失败，请检查网络连接或稍后重试！');
    });
}

// 处理留言页面的逻辑
function submitMessage() {
  const message = document.getElementById('message').value;

  // 检查留言是否为空
  if (!message.trim()) {
    alert('留言内容不能为空！');
    return;
  }

  // 发送 POST 请求到 /api/submit
  fetch('/api/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message }),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('网络响应异常');
      }
      return response.json();
    })
    .then(data => {
      if (data.success) {
        // 留言提交成功，显示成功信息
        document.getElementById('success').style.display = 'block';
        // 清空留言框
        document.getElementById('message').value = '';
      } else {
        // 留言提交失败，显示错误信息
        alert('留言提交失败，请重试！');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('留言提交失败，请检查网络连接或稍后重试！');
    });
}
