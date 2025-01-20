import React, { useState, useContext, useEffect } from "react";
import { DarkModeContext } from "../../Context/DarkModeContext";
import ReactMarkdown from "react-markdown"; 

const Chatbot = ({ chatId }) => {
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");

  const { darkMode } = useContext(DarkModeContext);

  useEffect(() => {
    // Reset the chat when the chatId changes
    setMessages([]);
    setCurrentMessage("");
  }, [chatId]);

  const handleSendMessage = () => {
    if (!currentMessage.trim()) {
      alert("Please type a message.");
      return;
    }

    const userMessage = { role: "user", content: currentMessage };
    setMessages([...messages, userMessage]);

    fetch("http://localhost:5000/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId, // Use the chatId from the parent
        message: currentMessage,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          alert(data.response);
        } else {
          const botMessage = { role: "bot", content: data.response };
          setMessages((prevMessages) => [...prevMessages, botMessage]);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Something went wrong.");
      });

    setCurrentMessage(""); // Clear input field
  };

  return (
    <div
      className={`flex flex-col h-screen ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      } p-4`}
    >
      <div
        className={`flex-1 overflow-y-auto ${
          darkMode ? "bg-gray-800" : "bg-white"
        } rounded-lg p-4 space-y-3`}
      >
        {messages.length === 0 ? (
          <p
            className={`text-center ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Start the conversation!
          </p>
        ) : (
          messages.map((msg, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg ${
                msg.role === "bot"
                  ? darkMode
                    ? "bg-gray-700 text-gray-200 self-start"
                    : "bg-gray-200 text-gray-900 self-start"
                  : darkMode
                  ? "bg-blue-600 text-white self-end"
                  : "bg-blue-500 text-white self-end"
              }`}
            >
              <span className="font-semibold">
                {msg.role === "bot" ? "Bot" : "You"}:
              </span>
              {msg.role === "bot" ? (
                // Render bot messages using ReactMarkdown
                <ReactMarkdown>{msg.content}</ReactMarkdown>
              ) : (
                <p>{msg.content}</p>
              )}
            </div>
          ))
        )}
      </div>

      <div className="mt-4 flex items-center gap-2">
        <input
          type="text"
          className={`flex-1 p-3 rounded-lg border focus:outline-none focus:ring ${
            darkMode
              ? "bg-gray-800 text-gray-200 border-gray-700 focus:ring-blue-600"
              : "bg-white text-gray-900 border-gray-300 focus:ring-blue-500"
          }`}
          placeholder="Type your message..."
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
        />
        <button
          className={`px-6 py-3 rounded-lg transition ${
            darkMode
              ? "bg-blue-600 hover:bg-blue-700 text-white"
              : "bg-blue-500 hover:bg-blue-600 text-white"
          }`}
          onClick={handleSendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
