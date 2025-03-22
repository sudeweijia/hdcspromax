import { MongoClient } from 'mongodb';

export default async function handler(req, res) {
  // 验证请求（可选）
  if (req.headers['x-proxy-secret'] !== process.env.PROXY_SECRET) {
    return res.status(403).json({ error: 'Unauthorized' });
  }

  const client = new MongoClient(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect();
    const db = client.db('your-database-name');
    const collection = db.collection('your-collection-name');

    // 根据请求方法处理数据库操作
    switch (req.method) {
      case 'GET':
        const data = await collection.find({}).toArray();
        res.status(200).json(data);
        break;
      case 'POST':
        const result = await collection.insertOne(req.body);
        res.status(201).json(result);
        break;
      default:
        res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    await client.close();
  }
}
