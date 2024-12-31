import React, { useState, useContext } from "react";
import { DarkModeContext } from "../../Context/DarkModeContext"; // Import DarkModeContext

const ChatbotSidebar = () => {
  // State for managing chats and the active chat
  const [chats, setChats] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null);
  const [message, setMessage] = useState("");

  const { darkMode } = useContext(DarkModeContext); // Access darkMode state

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
    <div
      className={`h-full flex flex-col p-4 ${darkMode ? "bg-gray-900" : "bg-gray-100"}`}
    >
      {/* New Chat Button */}
      <button
        className={`bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mb-4 transition-all ${
          darkMode ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-500 hover:bg-blue-600"
        } mt-16`} // Added margin-top to push the button down
        onClick={startNewChat}
      >
        + New Chat
      </button>

      {/* Chat List */}
      <ul
        className={`flex-1 overflow-y-auto space-y-2 ${darkMode ? "text-white" : "text-gray-900"}`}
      >
        {chats && chats.length > 0 ? (
          chats.map((chat) => (
            <li
              key={chat.id}
              className={`p-2 rounded cursor-pointer transition-all ${
                chat.id === currentChatId
                  ? darkMode
                    ? "bg-blue-600 text-white"
                    : "bg-blue-500 text-white"
                  : darkMode
                  ? "bg-gray-800 hover:bg-gray-700"
                  : "bg-gray-200 hover:bg-gray-300"
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
          className={`flex-1 p-2 rounded border ${darkMode ? "bg-gray-800 text-white border-gray-700" : "bg-white text-gray-900 border-gray-300"} focus:outline-none focus:ring-2 focus:ring-blue-500`}
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          className={`ml-2 py-2 px-4 rounded font-bold transition-all ${
            darkMode ? "bg-green-500 hover:bg-green-600" : "bg-green-600 hover:bg-green-700"
          } text-white`}
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatbotSidebar;
