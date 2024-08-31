import { GoogleGenerativeAI } from "@google/generative-ai";

// Assuming you have an async utility to connect to the database, you can include it here.
// import { connectToDB } from "@utils/database";

export const POST = async (request) => {
  try {
    // Parse the incoming request body
    const { userMessage } = await request.json();

    // Initialize the Generative AI with your API key
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEN_AI);

    // Get the model instance
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Start a new chat session with an initial history (optional)
    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: "Hello" }],
        },
        {
          role: "model",
          parts: [{ text: "Great to meet you. What would you like to know?" }],
        },
      ],
    });

    // Send a message from the user and get the response
    let result = await chat.sendMessage(userMessage);

    // Respond with the AI's response
    return new Response(JSON.stringify({ response: result.response.text() }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("API error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch AI response" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
