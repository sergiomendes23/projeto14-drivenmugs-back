import { db } from '../mongo.js';

const listMugs = async (req, res) => {
  try {
    const mugs = await db.collection('mugs').find().toArray();
    res.status(200).json({ status: 200, message: mugs });
  } catch (error) {
    res.status(500);
  }
}

const retrieveMug = async (req, res) => {
  const { id } = req.params;
  try {
    const mug = await db.collection('mugs').find({id: Number(id)}).toArray();
    res.status(200).json({ status: 200, message: mug });
  } catch (error) {
    res.status(500);
  }
}

export { listMugs, retrieveMug };