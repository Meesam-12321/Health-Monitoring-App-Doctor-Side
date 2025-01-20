import React, { useState, useEffect, useRef } from "react";
import { MessageSquare, Send, Search, MoreVertical, Users, Phone, Video, Coffee } from "lucide-react";
import axios from "axios";
import {jwtDecode} from "jwt-decode";

const DoctorChat = () => {
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [selectedChat, setSelectedChat] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);
  const messagesEndRef = useRef(null);

  // Initialize user ID and axios defaults
  useEffect(() => {
    console.log("Initializing component and checking for auth token...");
    const token = localStorage.getItem("authToken");
    console.log("Token from localStorage:", token);

    if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log("Decoded JWT:", decoded);
        setCurrentUserId(decoded.id);
        console.log("Current User ID set to:", decoded.id);

        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        console.log("Authorization header set in Axios:", axios.defaults.headers.common["Authorization"]);
      } catch (error) {
        console.error("Error decoding JWT:", error);
      }
    } else {
      console.warn("No token found in localStorage.");
    }

    axios.defaults.baseURL = "http://localhost:3000/api";
    console.log("Axios base URL set to:", axios.defaults.baseURL);
  }, []);

  // Fetch conversations when userId is available
  useEffect(() => {
    if (currentUserId) {
      console.log("User ID available, fetching conversations...");
      fetchConversations();
    } else {
      console.warn("User ID is not available, skipping fetchConversations.");
    }
  }, [currentUserId]);

  // Fetch conversations from the API
  const fetchConversations = async () => {
    console.log("Fetching conversations for User ID:", currentUserId);
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:3000/api/chat/conversations/${currentUserId}`);
      console.log("Conversations API response:", response);
      setConversations(response.data.data || []);
      console.log("Conversations set to state:", response.data.data);
    } catch (error) {
      console.error("Error fetching conversations:", error);
      if (error.response?.status === 401) {
        handleUnauthorized();
      }
    } finally {
      setLoading(false);
      console.log("Finished fetching conversations.");
    }
  };

  // Fetch messages between two users
  const fetchMessages = async (patientId) => {
    console.log("Fetching messages for Patient ID:", patientId);
    try {
      setLoading(true);
      const response = await axios.get(`/messages/${currentUserId}/${patientId}`);
      console.log("Messages API response:", response);
      setMessages(response.data.data || []);
      console.log("Messages set to state:", response.data.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
      if (error.response?.status === 401) {
        handleUnauthorized();
      }
    } finally {
      setLoading(false);
      console.log("Finished fetching messages.");
    }
  };

  // Send a new message
  const handleSendMessage = async () => {
    console.log("Sending message...");
    if (newMessage.trim() && selectedChat && currentUserId) {
      const messageData = {
        senderId: currentUserId,
        receiverId: selectedChat.patientId,
        senderModel: "Doctor",
        receiverModel: "Patient",
        message: newMessage,
      };

      console.log("Message data to be sent:", messageData);

      try {
        const response = await axios.post("http://localhost:3000/api/chat/send-message", messageData);
        console.log("Send message API response:", response);

        if (response.data.success) {
          setMessages((prevMessages) => [...prevMessages, response.data.data]);
          console.log("New message added to state:", response.data.data);
          setNewMessage("");
          fetchConversations(); // Refresh conversations to update last message
        }
      } catch (error) {
        console.error("Error sending message:", error);
        if (error.response?.status === 401) {
          handleUnauthorized();
        }
      }
    } else {
      console.warn("Message not sent: Missing newMessage, selectedChat, or currentUserId.");
    }
  };

  // Mark messages as read
  const markMessagesAsRead = async (patientId) => {
    console.log("Marking messages as read for Patient ID:", patientId);
    try {
      await axios.post("/mark-as-read", {
        senderId: currentUserId,
        receiverId: patientId,
      });
      console.log("Messages marked as read for Patient ID:", patientId);

      setConversations((prevConversations) =>
        prevConversations.map((conv) =>
          conv.patientId === patientId
            ? { ...conv, unreadCount: { ...conv.unreadCount, doctor: 0 } }
            : conv
        )
      );
    } catch (error) {
      console.error("Error marking messages as read:", error);
      if (error.response?.status === 401) {
        handleUnauthorized();
      }
    }
  };

  // Handle unauthorized access
  const handleUnauthorized = () => {
    console.warn("Unauthorized access, redirecting to login...");
    localStorage.removeItem("authToken");
    window.location.href = "/login";
  };

  // Select a conversation and load messages
  const handleSelectChat = (chat) => {
    console.log("Selected chat:", chat);
    setSelectedChat(chat);
    fetchMessages(chat.patientId);
    markMessagesAsRead(chat.patientId);
  };

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      console.log("Scrolling to the bottom of messages...");
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Filter conversations based on search term
  const filteredConversations = conversations.filter((conv) =>
    conv.patientName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.lastMessage?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  console.log("Filtered conversations based on search term:", filteredConversations);

  return (
    <div className="flex h-screen bg-gray-900">
      {/* Left sidebar - Conversations list */}
      <div className="w-1/3 border-r border-gray-800 flex flex-col">
        <div className="p-4 bg-gray-800">
          <div className="flex items-center space-x-2 bg-gray-700 rounded-lg px-4 py-2">
            <Search className="text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search patients..."
              className="bg-transparent text-white placeholder-gray-400 focus:outline-none w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <p className="text-center text-gray-400 py-4">Loading conversations...</p>
          ) : (
            filteredConversations.map((chat) => (
              <div
                key={chat._id}
                onClick={() => handleSelectChat(chat)}
                className={`flex items-center p-4 hover:bg-gray-800 cursor-pointer ${
                  selectedChat?._id === chat._id ? "bg-gray-800" : ""
                }`}
              >
                <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center">
                  <Users className="text-gray-400 w-6 h-6" />
                </div>
                <div className="ml-4 flex-1">
                  <div className="flex justify-between">
                    <span className="text-white font-medium">{chat.patientName}</span>
                    <span className="text-gray-400 text-sm">
                      {new Date(chat.lastMessageTimestamp).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400 text-sm truncate">{chat.lastMessage}</span>
                    {chat.unreadCount?.doctor > 0 && (
                      <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                        {chat.unreadCount.doctor}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Right side - Chat area */}
      <div className="flex-1 flex flex-col">
        {selectedChat ? (
          <>
            <div className="p-4 bg-gray-800 flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
                  <Users className="text-gray-400 w-5 h-5" />
                </div>
                <span className="ml-3 text-white font-medium">{selectedChat.patientName}</span>
              </div>
              <div className="flex items-center space-x-4">
                <Phone className="text-gray-400 w-5 h-5 cursor-pointer" />
                <Video className="text-gray-400 w-5 h-5 cursor-pointer" />
                <MoreVertical className="text-gray-400 w-5 h-5 cursor-pointer" />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 bg-gray-900">
              {messages.map((message) => (
                <div
                  key={message._id}
                  className={`flex mb-4 ${
                    message.senderModel === "Doctor" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-xs px-4 py-3 rounded-lg ${
                      message.senderModel === "Doctor"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-700 text-white"
                    }`}
                  >
                    <p className="text-sm">{message.message}</p>
                    <span className="block text-xs mt-1 opacity-75">
                      {new Date(message.timestamp).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 bg-gray-800">
              <div className="flex items-center space-x-4">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  className="flex-1 bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Type a message..."
                />
                <button
                  onClick={handleSendMessage}
                  className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center bg-gray-900">
            <Coffee className="w-24 h-24 text-gray-700 mb-6" />
            <h2 className="text-2xl text-gray-300 font-medium mb-2">Welcome, Doctor</h2>
            <p className="text-gray-500 text-center max-w-md">
              Select a patient conversation from the left to start chatting
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorChat;
