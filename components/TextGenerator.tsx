// // components/TextGenerator.tsx
// import { useState } from 'react';
// import { generateText } from '../lib/huggingFaceService';

// const TextGenerator = () => {
//   const [generatedText, setGeneratedText] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleGenerate = async () => {
//     setLoading(true);
//     const prompt = "Write a poem about love and loss."; // Set your prompt here
//     try {
//       const result = await generateText(prompt);
//       console.log("Response from Hugging Face:", result);
//       setGeneratedText(result[0]?.generated_text || 'No text generated'); // Adjust based on the response structure
//     } catch (error) {
//       console.error("Error generating text:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <h1>Text Generator</h1>
//       <button onClick={handleGenerate} disabled={loading}>
//         {loading ? 'Generating...' : 'Generate Text'}
//       </button>
//       <div>
//         <h2>Generated Text:</h2>
//         <p>{generatedText}</p>
//       </div>
//     </div>
//   );
// };

// export default TextGenerator;
// components/TextGenerator.tsx
import { useState } from 'react';
import { generateText } from '../lib/huggingFaceService';

const TextGenerator = () => {
  const [generatedText, setGeneratedText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    const prompt = "Write a poem about love and loss."; // Set your prompt here
    try {
      const result = await generateText(prompt);
      console.log("Response from server:", result);
      setGeneratedText(result[0]?.generated_text || 'No text generated');
    } catch (error) {
      console.error("Error generating text:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Text Generator</h1>
      <button onClick={handleGenerate} disabled={loading}>
        {loading ? 'Generating...' : 'Generate Text'}
      </button>
      <div>
        <h2>Generated Text:</h2>
        <p>{generatedText}</p>
      </div>
    </div>
  );
};

export default TextGenerator;
