// src/pages/api/save.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import connectMongo from '../../lib/mongodb';
import mongoose from 'mongoose';

const resultSchema = new mongoose.Schema({
  name: String,
});

const Result = mongoose.models.Result || mongoose.model('Result', resultSchema);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectMongo();

  if (req.method === 'POST') {
    const { name } = req.body;
    const newResult = new Result({ name });

    try {
      await newResult.save();
      res.status(200).send('Result saved successfully');
    } catch (error) {
      console.log(error);
      res.status(500).send('Error saving result');
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

