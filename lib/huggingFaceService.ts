// lib/huggingFaceService.ts
// import axios from 'axios';

// const HUGGING_FACE_API_URL = 'https://api-inference.huggingface.co/models/meta-llama/Llama-3.2-1B'; // Use the LLaMA model URL
// const huggingFaceApiToken = process.env.HUGGING_FACE_API_TOKEN;

// export const generateText = async (inputText: string) => {
//   // Check for empty input
//   if (!inputText.trim()) {
//       console.log("Input text is empty");
//       throw new Error("Input text is required.");
//   }

//   try {
//       console.log("Making API request with input:", inputText);
//       const response = await axios.post(
//           HUGGING_FACE_API_URL,
//           {
//               inputs: inputText,
//           },
//           {
//               headers: {
//                   Authorization: `Bearer ${huggingFaceApiToken}`,
//                   'Content-Type': 'application/json',
//               },
//           }
//       );

//       console.log("API Response:", response.data); // Log the full response
//       if (!response.data || !Array.isArray(response.data) || response.data.length === 0) {
//           console.log("Unexpected response structure:", response.data);
//           throw new Error("Unexpected response structure from API.");
//       }

//       return response.data;
//   } catch (error) {
//       console.error("Error generating text:", (error as Error).message || error.toString());
//       throw error; // Re-throw the error after logging it
//   }
// };

// lib/huggingFaceService.ts
import axios from 'axios';

export const generateText = async (inputText: string) => {
  if (!inputText.trim()) {
    console.log('Input text is empty');
    throw new Error('Input text is required.');
  }

  try {
    console.log('Making API request to server with input:', inputText);
    const response = await axios.post('/api/huggingface', { inputText });

    console.log('Server API Response:', response.data);
    if (!response.data || !Array.isArray(response.data) || response.data.length === 0) {
      console.log('Unexpected response structure:', response.data);
      throw new Error('Unexpected response structure from API.');
    }

    return response.data;
  } catch (error) {
    console.error('Error generating text:', error.message || error.toString());
    throw error;
  }
};
