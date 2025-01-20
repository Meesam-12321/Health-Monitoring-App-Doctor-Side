import React, { useState, useContext } from "react";
import { DarkModeContext } from "../../Context/DarkModeContext";

const ChatbotSidebar = ({ onStartNewChat, currentChatId }) => {
  const [chats, setChats] = useState([]);

  const { darkMode } = useContext(DarkModeContext);

  const startNewChat = () => {
    const newChatId = Date.now().toString();
    const newChat = { id: newChatId, name: `Chat ${chats.length + 1}` };
    setChats([...chats, newChat]);
    onStartNewChat(newChatId); // Inform parent component of the new chat
  };

  return (
    <div
      className={`h-full flex flex-col p-4 ${darkMode ? "bg-gray-900" : "bg-gray-100"}`}
    >
      <button
        className={`bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mb-4 transition-all ${
          darkMode ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-500 hover:bg-blue-600"
        } mt-16`}
        onClick={startNewChat}
      >
        + New Chat
      </button>

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
            >
              {chat.name}
            </li>
          ))
        ) : (
          <p className="text-gray-400 text-sm">No chats available. Start a new one!</p>
        )}
      </ul>
    </div>
  );
};

export default ChatbotSidebar;
