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

    // 插入留言
    const { message } = req.body;
    const result = await collection.insertOne({ message, date: new Date() });
    res.status(200).json({ success: true, result });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  } finally {
    await client.close();
  }
}
