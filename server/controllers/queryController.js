import genAI from '../utils/openaiConfig.js'

export const handleQuery = async (req, res) => {
  try {
    const { userQuery } = req.body;
    //const modifiedQuery = `Give a well-structured, detailed, and elaborated answer with multiple main points and subpoints. Format it properly using markdown. Query: ${userQuery}`;
    
   
    if (!userQuery) {
      return res.status(400).json({ message: "Query is required." });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const response = await model.generateContent(userQuery);
    const textResponse = response.response.text();

    // Convert response into Markdown format for better structuring
    const formattedResponse = `**Response:**\n\n${textResponse}`;

    res.json({ response: formattedResponse });
  } catch (error) {
    console.error("AI Query Error:", error);
    res.status(500).json({ message: "Error processing query" });
  }
};

export default handleQuery;
