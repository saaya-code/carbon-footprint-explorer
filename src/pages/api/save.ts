import type { NextApiRequest, NextApiResponse } from 'next';
import connectMongo from '../../lib/mongodb';
import Result from '../../models/resultSchema';



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectMongo();

  if (req.method === 'POST') {
    const { name, eye_color, hair_color, gender, height  } = req.body;
    const newResult = new Result({ name, eye_color, hair_color, gender, height});

    try {
      await newResult.save();
      res.status(200).send('Result saved successfully');
    } catch (error) {
      console.log(error);
      res.status(500).json({ ERROR : 'Error saving result' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

