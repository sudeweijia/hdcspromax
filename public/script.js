function submitMessage() {
  const message = document.getElementById('message').value;
  fetch('/api/submit', {
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
  })
  .catch(error => {
    console.error('Error:', error);
  });
}
