// pages/api/generate-text.ts
import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

const HUGGING_FACE_API_URL = 'https://api-inference.huggingface.co/models/Qwen/Qwen2.5-1.5B-Instruct';
const HUGGING_FACE_API_TOKEN = process.env.HUGGING_FACE_API_TOKEN; // Ensure this is set in your environment variables

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { prompt } = req.body;

    try {
      const response = await axios.post(
        HUGGING_FACE_API_URL,
        { inputs: prompt },
        {
          headers: {
            Authorization: `Bearer ${HUGGING_FACE_API_TOKEN}`,
          },
        }
      );

      res.status(200).json(response.data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error generating text' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
