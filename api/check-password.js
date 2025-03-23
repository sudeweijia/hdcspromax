export default async function handler(req, res) {
  const { password } = req.body;

  // 验证密码
  if (password === '32cl47') {
    res.status(200).json({ success: true });
  } else {
    res.status(401).json({ success: false });
  }
}
