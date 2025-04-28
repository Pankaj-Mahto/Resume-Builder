import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini with your API key
const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);

async function generateWorkDescription(jobTitle) {
  if (!process.env.REACT_APP_GEMINI_API_KEY) {
    console.error('Gemini API Key is missing.');
    return 'API Key is missing. Please check your environment variables.';
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    const prompt = `You are a professional resume writer. Write a 4-5 line job description in bullet points for the job title: "${jobTitle}".`;

    const result = await model.generateContent(prompt);

    const response = result.response;

    // ⭐ Correct way to fetch text: Use `response.text()` properly
    const generatedDescription = (await response.text()).trim();

    if (!generatedDescription) {
      console.error('No description generated from Gemini API.');
      return 'Failed to generate description. Please try again later.';
    }

    console.log('Gemini API Response:', generatedDescription); // Always console.log the API's response
    return generatedDescription; // Return clean description
  } catch (error) {
    console.error('Error generating description from Gemini:', error);
    return 'Failed to generate description. Please try again later.';
  }
}

export { generateWorkDescription };
