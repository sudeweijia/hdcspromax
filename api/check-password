// api/check-password.js
export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { password } = req.body;

    // 验证密码（假设正确密码是 "32cl47"）
    if (password === '32cl47') {
      res.status(200).json({ success: true });
    } else {
      res.status(401).json({ success: false });
    }
  } else {
    // 如果不是 POST 请求，返回 405 Method Not Allowed
    res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }
}
