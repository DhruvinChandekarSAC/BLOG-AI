// pages/api/huggingface.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const HUGGING_FACE_API_URL = 'https://api-inference.huggingface.co/models/meta-llama/Llama-3.2-1B'; // Your model URL
const huggingFaceApiToken = process.env.HUGGING_FACE_API_TOKEN;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { inputText } = req.body;

  if (!inputText) {
    return res.status(400).json({ message: 'Input text is required.' });
  }

  console.log('Input text received:', inputText); // Add a log to see if inputText is reaching the server

  try {
    console.log('Sending request to Hugging Face API...');
    const response = await axios.post(
      HUGGING_FACE_API_URL,
      { inputs: inputText },
      {
        headers: {
          Authorization: `Bearer ${huggingFaceApiToken}`,
          'Content-Type': 'application/json',
        },
      }
    );
    console.log('Hugging Face API response:', response.data); // Log the full response from the API

    // Return the response back to the client
    return res.status(200).json(response.data);
  } catch (error) {
    console.error('Error calling Hugging Face API:', error.response?.data || error.message);
    return res.status(500).json({ message: 'Failed to generate text', error: error.response?.data || error.message });
  }
}
