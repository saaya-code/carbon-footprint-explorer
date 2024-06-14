import type { NextApiRequest, NextApiResponse } from 'next';
import connectMongo from '../../lib/mongodb';
import mongoose from 'mongoose';

const resultSchema = new mongoose.Schema({
  name: String,
});

const Result = mongoose.models.Result || mongoose.model('Result', resultSchema);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectMongo();

  if (req.method === 'GET') {
    try {
      const results = await Result.find();
      res.status(200).send(results);
    } catch (error) {
      res.status(500).send('Error fetching results');
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
