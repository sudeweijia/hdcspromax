const mongoose = require('mongoose');

// 从环境变量中获取 MongoDB 连接字符串
const mongoURI = process.env.MONGO_URI;

// 连接 MongoDB Atlas
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected successfully!'))
  .catch(err => console.error('MongoDB connection error:', err));

// 定义留言模型
const messageSchema = new mongoose.Schema({
  content: String,
  date: { type: Date, default: Date.now }
});

const Message = mongoose.model('Message', messageSchema);

module.exports = async (req, res) => {
  if (req.method === 'POST') {
    const { message } = req.body;

    // 创建新留言
    const newMessage = new Message({ content: message });

    try {
      await newMessage.save();
      res.status(200).json({ success: true });
    } catch (err) {
      res.status(500).json({ error: 'Failed to save message' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};