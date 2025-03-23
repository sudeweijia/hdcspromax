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
