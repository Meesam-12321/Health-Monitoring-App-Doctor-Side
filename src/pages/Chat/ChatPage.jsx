import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

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
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl border-2 border-gray-600">
        <h1 className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-6">Chat with Patient</h1>

        <div className="h-96 overflow-y-auto bg-gray-50 dark:bg-gray-700 p-6 rounded-lg border-2 border-gray-600 shadow-lg">
          {isLoading ? (
            <div className="text-center text-gray-500 dark:text-gray-300">Loading chat...</div>
          ) : (
            <div>
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex mb-4 ${message.sender === 'doctor' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-xs rounded-lg px-4 py-3 ${message.sender === 'doctor' ? 'bg-blue-600 text-white' : 'bg-green-600 text-white'}`}>
                    <p className="text-sm">{message.text}</p>
                    <span className="block text-xs mt-1 text-gray-300">{message.timestamp}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-6 flex items-center">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="w-full px-4 py-3 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Type your message..."
          />
          <button
            onClick={handleSendMessage}
            className="ml-4 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
