import React, { useState } from "react";

const ChatbotSidebar = () => {
  // State for managing chats and the active chat
  const [chats, setChats] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null);
  const [message, setMessage] = useState("");

  // Function to start a new chat
  const startNewChat = () => {
    const newChatId = Date.now().toString();
    const newChat = { id: newChatId, name: `Chat ${chats.length + 1}` };
    setChats([...chats, newChat]);
    setCurrentChatId(newChatId);
  };

  // Handle sending a message
  const sendMessage = () => {
    if (message.trim() === "") return; // Ignore empty messages
    console.log(`Message sent: ${message}`);
    setMessage(""); // Clear the input field after sending
  };

  return (
    <div className="bg-gray-800 h-full flex flex-col p-4">
      {/* New Chat Button */}
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mb-4"
        onClick={startNewChat}
      >
        + New Chat
      </button>

      {/* Chat List */}
      <ul className="flex-1 overflow-y-auto space-y-2">
        {chats && chats.length > 0 ? (
          chats.map((chat) => (
            <li
              key={chat.id}
              className={`p-2 rounded cursor-pointer transition-all ${
                chat.id === currentChatId
                  ? "bg-blue-500 text-white"
                  : "bg-gray-700 hover:bg-gray-600"
              }`}
              onClick={() => setCurrentChatId(chat.id)}
            >
              {chat.name}
            </li>
          ))
        ) : (
          <p className="text-gray-400 text-sm">No chats available. Start a new one!</p>
        )}
      </ul>

      {/* Message Input and Send Button */}
      <div className="mt-4 flex items-center">
        <input
          type="text"
          className="flex-1 p-2 rounded border border-gray-600 bg-gray-700 text-white"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          className="ml-2 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatbotSidebar;
