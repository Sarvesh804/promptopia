import { useState, useEffect, useRef } from "react";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export const ChatInterface = ({isOpen,setIsOpen})=> {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);

  const handleSend = async () => {
    if (input.trim()) {
      const userMessage = { text: input, sender: "user" };
      setMessages([...messages, userMessage]);
      setInput(""); // Clear the input field after sending

      try {
        const response = await fetch("/api/ai", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userMessage: input }),
        });
        const data = await response.json();
        const aiMessage = { text: data.response, sender: "ai" };
        setMessages((prevMessages) => [...prevMessages, aiMessage]);
      } catch (error) {
        console.error("Error fetching AI response:", error);
      }
    }
  };

  const handleInputChange = (e) => setInput(e.target.value);

  useEffect(() => {
    // Scroll to the bottom of the chat whenever a new message is added
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="fixed bottom-16 right-4 w-80 bg-white p-4 shadow-xl rounded-lg glassmorphism z-50">
      <div className="flex justify-between pb-2">
        <h2 className="text-lg font-semibold text-black">Chat with AI</h2>
        <button
          className="text-gray-500 hover:text-black"
          onClick={() => {
            setIsOpen(!isOpen)
          }}
        >
          &times;
        </button>
      </div>
      <div className="form_textarea bg-gray-100 p-2 rounded-lg h-48 overflow-y-auto flex-col">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 mt-2 w-fit rounded-lg my-1 ${
              msg.sender === "user"
                ? "bg-blue-200 text-right"
                : "bg-gray-200 text-left"
            }`}
          >
             <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {msg.text}
            </ReactMarkdown>
            
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        placeholder="Type your message..."
        className="form_input border-gray-300 p-2 rounded-lg mt-2 w-full"
      />
      <button className="black_btn w-full mt-2" onClick={handleSend}>
        Send
      </button>
    </div>
  );
}
