import type { NextApiRequest, NextApiResponse } from 'next';
import { mockBooks } from '../../__mocks__/booksMock'; 

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const books = mockBooks;
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch books' });
  }
}
