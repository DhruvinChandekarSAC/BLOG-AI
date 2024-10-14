import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { generateText } from '../lib/huggingFaceService';
import styles from '../styles/CreatePost.module.css'; // Import CSS module

const CreatePost = () => {
    const [inputText, setInputText] = useState('');
    const [generatedText, setGeneratedText] = useState('');
    const [loading, setLoading] = useState(false);

    const handleGenerateText = async () => {
        setLoading(true);
        try {
            const response = await generateText(inputText);
            setGeneratedText(response[0]?.generated_text || 'No text generated');
        } catch (error) {
            console.error("Error generating text:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!generatedText.trim()) {
            alert("Generated text is empty. Please generate text before submitting.");
            return;
        }

        const { data, error } = await supabase
            .from('posts')
            .insert([{ title: inputText, content: generatedText,created_at: new Date() }]);

        if (error) {
            console.error("Error creating post:", error);
            alert("Error creating post: " + error.message);
        } else {
            setInputText('');
            setGeneratedText('');
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Create Post</h1>
            <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Enter your prompt here"
                className={styles.textarea}
            />
            <button
                onClick={handleGenerateText}
                disabled={loading}
                className={`${styles.button} ${loading ? styles.disabled : ''}`}
            >
                {loading ? 'Generating...' : 'Generate Text'}
            </button>
            <h2 className={styles.subtitle}>Generated Text:</h2>
            <p className={styles.generatedText}>{generatedText}</p>
            <button
                onClick={handleSubmit}
                disabled={!generatedText}
                className={`${styles.button} ${!generatedText ? styles.disabled : ''}`}
            >
                Submit Post
            </button>
        </div>
    );
};

export default CreatePost;
