const { MongoClient } = require('mongodb');

export default async function handler(req, res) {
  const client = new MongoClient(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect();
    const db = client.db('my-database');
    const collection = db.collection('my-collection');

    // 处理 POST 请求
    if (req.method === 'POST') {
      const { name, message } = req.body;
      const result = await collection.insertOne({ name, message });
      res.status(200).json({ success: true, result });
    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    await client.close();
  }
}
