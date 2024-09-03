import Prompt from "@models/prompt";
import User from "@models/user";
import { connectToDB } from "@utils/database";

export const GET = async (request) => {
    try {
        await connectToDB();

        const prompts = await Prompt.find({}).populate("creator");

        // return new Response(JSON.stringify(prompts), {
        //     status: 200,
        //     headers: {
        //         'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        //     },
        // });

        const response = new Response(JSON.stringify(prompts), {
            status: 200,
          });
  
          // Add a unique identifier to the URL to force a cache-busting reload
          const url = new URL(request.url);
          url.searchParams.set("t", Date.now());
          response.headers.set("Cache-Control", "no-cache, no-store, must-revalidate");
          response.headers.set("Pragma", "no-cache");
          response.headers.set("Expires", "0");
          response.headers.set("Location", url.toString());
  
          return response;
    } catch (error) {
        return new Response(JSON.stringify({ message: "Failed to fetch all prompts", error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
          });
          
    }
} 