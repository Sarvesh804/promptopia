"use client"
import { useState } from 'react';
import {ChatInterface} from './ChatInterface';

export default function ChatButton() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {isOpen && <ChatInterface isOpen={isOpen} setIsOpen={setIsOpen}/>}
      <button
        onClick={toggleChat}
        className="fixed bottom-4 right-4 p-4 bg-black text-white rounded-full z-50 transition-all hover:bg-white hover:text-black shadow-lg"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8 10h.01M12 10h.01M16 10h.01M9 16h6m2 4H7a2 2 0 01-2-2V5a2 2 0 012-2h10a2 2 0 012 2v13a2 2 0 01-2 2z"
          />
        </svg>
      </button>

      
    </>
  );
}
