import type { NextApiRequest, NextApiResponse } from 'next';
import connectMongo from '../../lib/mongodb';
import apiResponse from '@/types/responseType';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectMongo();

  if (req.method === 'GET') {
    try {
      const { q } = req.query;
      let results: Array<apiResponse> = [];
      let nextUrl = `https://swapi.dev/api/people/?search=${q}`;

      while (nextUrl) {
        const response = await fetch(nextUrl);
        const data = await response.json();
        results = [...results, ...data.results];
        nextUrl = data.next;
      }

      res.status(200).send({ count: results.length, results  });
    } catch (error) {
      res.status(500).send('Error fetching results');
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
