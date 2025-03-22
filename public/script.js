function checkPassword() {
  const password = document.getElementById('password').value;
  if (password === '32cl47') {
    window.location.href = '/main.html';
  } else {
    document.getElementById('error').style.display = 'block';
  }
}
