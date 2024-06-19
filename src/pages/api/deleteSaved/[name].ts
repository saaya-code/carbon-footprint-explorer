import type { NextApiRequest, NextApiResponse } from 'next';
import connectMongo from '../../../lib/mongodb';
import mongoose from 'mongoose';
//get the name from the url
const resultSchema = new mongoose.Schema({
  name: String,
});

const Result = mongoose.models.Result || mongoose.model('Result', resultSchema);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectMongo();

  if (req.method === 'DELETE') {
    try {
        const { name } = req.query;
      const results = await Result.deleteMany({name: name});
      res.status(200).send(results);
    } catch (error) {
      res.status(500).send('Error deleting results');
    }
  } else {
    res.setHeader('Allow', ['DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
