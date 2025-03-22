const mongoose = require('mongoose');

// 从环境变量中获取 MongoDB 连接字符串
const mongoURI = process.env.MONGO_URI;

// 连接 MongoDB Atlas
mongoose
  .connect(mongoURI)
  .then(() => console.log('MongoDB connected successfully!'))
  .catch(err => console.error('MongoDB connection error:', err));

// 定义留言模型
const messageSchema = new mongoose.Schema({
  content: String,
  date: { type: Date, default: Date.now }
});

const Message = mongoose.model('Message', messageSchema);

module.exports = async (req, res) => {
  console.log('Received request:', req.method, req.url); // 请求日志

  if (req.method === 'POST') {
    const { message } = req.body;

    // 检查留言内容是否为空
    if (!message || message.trim() === '') {
      console.error('Message content is empty'); // 空内容日志
      return res.status(400).json({ error: 'Message content cannot be empty' });
    }

    console.log('Message content:', message); // 留言内容日志

    // 创建新留言
    const newMessage = new Message({ content: message });

    try {
      await newMessage.save();
      console.log('Message saved successfully:', newMessage); // 保存成功日志
      res.status(200).json({ success: true });
    } catch (err) {
      console.error('Failed to save message:', err); // 保存失败日志
      res.status(500).json({ error: 'Failed to save message' });
    }
  } else {
    console.error('Method not allowed:', req.method); // 方法不允许日志
    res.status(405).json({ error: 'Method not allowed' });
  }
};
