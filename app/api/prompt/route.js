import Prompt from "@models/prompt";
import User from "@models/user";
import { connectToDB } from "@utils/database";

export const GET = async (request) => {
    try {
        await connectToDB();

        const prompts = await Prompt.find({}).populate("creator");

        return new Response(JSON.stringify(prompts), {
            status: 200,
            headers: {
                'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
            },
        });
    } catch (error) {
        return new Response(JSON.stringify({ message: "Failed to fetch all prompts", error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
          });
          
    }
} 