import type { NextApiRequest, NextApiResponse } from 'next';
import connectMongo from '../../../lib/mongodb';
import Result from '../../../models/resultSchema';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectMongo();

  if (req.method === 'DELETE') {
    try {
      const { name } = req.query;
      const results = await Result.deleteMany({name: name});
      res.status(200).send(results);
    } catch (error) {
      res.status(500).json({"Internal Server Error": "Error deleting results"});
    }
  } else {
    res.setHeader('Allow', ['DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
