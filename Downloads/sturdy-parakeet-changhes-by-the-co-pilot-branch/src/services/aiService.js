import axios from 'axios';

// Configuration
// In a real app, these should be in a .env file (e.g., VITE_AI_API_URL, VITE_AI_API_KEY)
// For security, it is recommended to call your own backend, which then calls the AI provider.
const API_URL = import.meta.env.VITE_AI_API_URL || 'https://api.openai.com/v1/chat/completions';
const API_KEY = import.meta.env.VITE_AI_API_KEY; // Leave empty to trigger safe fallback mode

export const sendMessageToAI = async (messages) => {
    // Fallback if no API key is present (to prevent crashing in demo/dev without setup)
    if (!API_KEY && !import.meta.env.VITE_AI_PROVIDER_URL) {
        console.warn("AI Service: No API Key found. Returning mock response.");
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    role: 'ai',
                    content: "I am currently running in **Demo Mode** because no API Key is configured.\n\nTo connect me to a real AI:\n1. Create a `.env` file in your project root.\n2. Add `VITE_AI_API_KEY=your_key_here`.\n\nFor now, I can only echo this message!"
                });
            }, 1000);
        });
    }

    try {
        const response = await axios.post(API_URL, {
            model: "gpt-3.5-turbo", // Customizable model
            messages: messages.map(m => ({ role: m.role, content: m.content })),
            temperature: 0.7,
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`
            }
        });

        // Assuming OpenAI standard format. Adjust if using a different provider.
        const aiContent = response.data.choices[0].message.content;
        return { role: 'ai', content: aiContent };

    } catch (error) {
        console.error("AI Service Error:", error);

        // Return a safe error message to the chat
        throw new Error(
            error.response?.data?.error?.message ||
            "Failed to connect to the AI service. Please check your internet or API configuration."
        );
    }
};
