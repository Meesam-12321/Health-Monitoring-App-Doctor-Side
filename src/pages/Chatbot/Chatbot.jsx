import React, { useState } from 'react';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [chatId, setChatId] = useState(null); // Store chat ID

  // Generate a unique chat ID if not already created
  const ensureChatId = () => {
    if (!chatId) {
      const newChatId = Date.now().toString(); // Generate a unique ID based on timestamp
      setChatId(newChatId);
      return newChatId;
    }
    return chatId;
  };

  // Handle sending a message
  const handleSendMessage = () => {
    if (!currentMessage.trim()) {
      alert('Please type a message.');
      return;
    }

    // Ensure we have a chat ID
    const currentChatId = ensureChatId();

    // Add user message to the conversation
    const userMessage = { role: 'user', content: currentMessage };
    setMessages([...messages, userMessage]);

    // Send the message to the backend
    fetch('http://localhost:5000/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: currentChatId, // Include the chat ID
        message: currentMessage,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          alert(data.response);
        } else {
          const botMessage = { role: 'bot', content: data.response };
          setMessages((prevMessages) => [...prevMessages, botMessage]);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('Something went wrong.');
      });

    setCurrentMessage(''); // Clear input field
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white p-4">
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto bg-gray-800 rounded-lg p-4 space-y-3">
        {messages.length === 0 ? (
          <p className="text-center text-gray-400">Start the conversation!</p>
        ) : (
          messages.map((msg, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg ${
                msg.role === 'bot'
                  ? 'bg-gray-700 text-gray-200 self-start'
                  : 'bg-blue-600 text-white self-end'
              }`}
            >
              <span className="font-semibold">
                {msg.role === 'bot' ? 'Bot' : 'You'}:
              </span>
              <p>{msg.content}</p>
            </div>
          ))
        )}
      </div>

      {/* Input Area */}
      <div className="mt-4 flex items-center gap-2">
        <input
          type="text"
          className="flex-1 bg-gray-800 text-gray-200 p-3 rounded-lg border border-gray-700 focus:outline-none focus:ring focus:ring-blue-600"
          placeholder="Type your message..."
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
        />
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition"
          onClick={handleSendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
