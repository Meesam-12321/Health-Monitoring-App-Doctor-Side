import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaPaperPlane } from 'react-icons/fa';

const ChatPage = () => {
  const { patientId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Simulated messages data (replace with API data fetching in real app)
  const simulatedMessages = [
    { id: 1, sender: 'doctor', text: 'Hello, how can I assist you today?', timestamp: '10:30 AM' },
    { id: 2, sender: 'patient', text: 'Hi, I have been feeling dizzy for a couple of days.', timestamp: '10:32 AM' },
    { id: 3, sender: 'doctor', text: 'I see. Could you provide more details about the dizziness?', timestamp: '10:35 AM' },
    { id: 4, sender: 'patient', text: 'It’s mostly when I stand up.', timestamp: '10:37 AM' },
  ];

  useEffect(() => {
    setMessages(simulatedMessages);
    setIsLoading(false);
  }, [patientId]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const newMessageObj = {
        id: messages.length + 1,
        sender: 'doctor',
        text: newMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages([...messages, newMessageObj]);
      setNewMessage('');
    }
  };

  return (
    <div className="flex flex-col w-full h-full bg-gray-900">
      <header className="flex items-center justify-between bg-gray-800 px-6 py-4 shadow-md">
        <h1 className="text-xl font-bold text-white">Chat with Patient</h1>
        <span className="text-gray-400">Patient ID: {patientId}</span>
      </header>
      <main className="flex-1 flex flex-col p-4">
        <div className="flex-1 overflow-y-auto bg-gray-800 p-4 rounded-lg shadow-md">
          {isLoading ? (
            <div className="text-center text-gray-400">Loading chat...</div>
          ) : (
            <div>
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex mb-4 ${message.sender === 'doctor' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs px-4 py-3 text-sm rounded-lg shadow-md ${
                      message.sender === 'doctor'
                        ? 'bg-blue-600 text-white'
                        : 'bg-green-600 text-white'
                    }`}
                  >
                    <p>{message.text}</p>
                    <span className="block text-xs mt-1 text-gray-300">{message.timestamp}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="mt-4 flex items-center">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1 px-4 py-2 bg-gray-700 text-white rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Type your message..."
          />
          <button
            onClick={handleSendMessage}
            className="ml-4 px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center"
          >
            <FaPaperPlane className="mr-2" /> Send
          </button>
        </div>
      </main>
    </div>
  );
};

export default ChatPage;
