import React, { useState, useEffect, useRef } from "react";
import { 
  MessageSquare, 
  Send, 
  Search, 
  MoreVertical, 
  Users, 
  Phone, 
  Video, 
  Coffee,
  Clock,
  Calendar,
  BellRing,
  LogOut,
  Info,
  AlertCircle,
  FileText,
  User,
  Menu,
  X
} from "lucide-react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { io } from "socket.io-client";
import { formatDistanceToNow } from "date-fns";

const DoctorChat = () => {
  // State management
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [selectedChat, setSelectedChat] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [doctorProfile, setDoctorProfile] = useState(null);
  const [showSidebar, setShowSidebar] = useState(true);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [patientDetails, setPatientDetails] = useState(null);
  const [showPatientInfo, setShowPatientInfo] = useState(false);
  
  // Refs
  const messagesEndRef = useRef(null);
  const socketRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const inputRef = useRef(null);

  // Initialize connection and auth
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setCurrentUserId(decoded.id);
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        fetchDoctorProfile(decoded.id);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
    axios.defaults.baseURL = "http://localhost:3000/api";

    // Socket connection
    socketRef.current = io("http://localhost:3000", {
      auth: { token },
      transports: ['websocket'],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000
    });

    // Socket event listeners
    socketRef.current.on("connect", () => {
      console.log("Socket connected:", socketRef.current.id);
    });

    socketRef.current.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
    });

    socketRef.current.on("message:new", handleNewMessage);
    
    socketRef.current.on("patient:typing", ({ patientId, isTyping }) => {
      if (selectedChat?.patientId === patientId) {
        setIsTyping(isTyping);
      }
    });

    socketRef.current.on("disconnect", () => {
      console.log("Socket disconnected");
    });

    socketRef.current.on("reconnect", (attemptNumber) => {
      console.log("Socket reconnected after", attemptNumber, "attempts");
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
      if (typingTimeout) {
        clearTimeout(typingTimeout);
      }
    };
  }, []);

  // Join doctor room when user ID is available
  useEffect(() => {
    if (currentUserId && socketRef.current) {
      socketRef.current.emit("join", { userId: currentUserId, userType: "Doctor" });
    }
  }, [currentUserId]);

  // Fetch doctor profile
  const fetchDoctorProfile = async (doctorId) => {
    try {
      const response = await axios.get(`/doctors/${doctorId}`);
      setDoctorProfile(response.data);
    } catch (error) {
      console.error("Error fetching doctor profile:", error);
    }
  };

  // Handle new incoming messages
  const handleNewMessage = (newMessage) => {
    setMessages((prevMessages) => {
      const messageExists = prevMessages.some(msg => msg._id === newMessage._id);
      if (messageExists) return prevMessages;

      const updatedMessages = [...prevMessages, newMessage];
      return updatedMessages.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
    });

    setConversations((prevConversations) => {
      return prevConversations.map((conv) => {
        if (conv.patientId === newMessage.senderId || conv.patientId === newMessage.receiverId) {
          return {
            ...conv,
            lastMessage: newMessage.message,
            lastMessageTimestamp: newMessage.timestamp,
            unreadCount: {
              ...conv.unreadCount,
              doctor: selectedChat?.patientId !== conv.patientId && newMessage.senderModel === "Patient" 
                ? (conv.unreadCount?.doctor || 0) + 1 
                : conv.unreadCount?.doctor || 0
            }
          };
        }
        return conv;
      });
    });

    // Play notification sound if message is from patient
    if (newMessage.senderModel === "Patient") {
      playNotificationSound();
    }

    scrollToBottom();
    
    // Reset typing indicator when message is received
    if (newMessage.senderModel === "Patient" && selectedChat?.patientId === newMessage.senderId) {
      setIsTyping(false);
    }
  };

  // Play notification sound
  const playNotificationSound = () => {
    const audio = new Audio('/notification.mp3');
    audio.play().catch(error => console.error("Error playing notification sound:", error));
  };

  // Fetch patient details
  const fetchPatientDetails = async (patientId) => {
    try {
      const response = await axios.get(`/patients/${patientId}`);
      const patientData = response.data;
      return patientData.name || `${patientData.firstName} ${patientData.lastName}`;
    } catch (error) {
      console.error(`Error fetching patient details for ID ${patientId}:`, error);
      return `Patient ${patientId}`;
    }
  };

  // Get detailed patient information when selected
  const fetchDetailedPatientInfo = async (patientId) => {
    try {
      const response = await axios.get(`/patients/${patientId}/details`);
      setPatientDetails(response.data);
    } catch (error) {
      console.error("Error fetching detailed patient info:", error);
      setPatientDetails({
        name: selectedChat.patientName,
        age: "Unknown",
        lastVisit: "Unknown",
        medicalHistory: []
      });
    }
  };

  // Update conversations with patient names
  const updateConversationsWithPatientNames = async (conversationsData) => {
    try {
      const updatedConversations = await Promise.all(
        conversationsData.map(async (conv) => {
          const patientName = await fetchPatientDetails(conv.patientId);
          return {
            ...conv,
            patientName
          };
        })
      );
      return updatedConversations;
    } catch (error) {
      console.error("Error updating conversations with patient names:", error);
      return conversationsData;
    }
  };

  // Fetch all conversations
  const fetchConversations = async () => {
    if (!currentUserId) return;
    
    setLoading(true);
    try {
      const response = await axios.get(`/chat/conversations/${currentUserId}`);
      const conversationsWithNames = await updateConversationsWithPatientNames(response.data.data || []);
      
      // Sort conversations by last message timestamp (newest first)
      const sortedConversations = conversationsWithNames.sort((a, b) => 
        new Date(b.lastMessageTimestamp) - new Date(a.lastMessageTimestamp)
      );
      
      setConversations(sortedConversations);
    } catch (error) {
      console.error("Error fetching conversations:", error);
    } finally {
      setLoading(false);
    }
  };

  // Periodically refresh conversations
  useEffect(() => {
    if (currentUserId) {
      fetchConversations();
      const intervalId = setInterval(fetchConversations, 30000);
      return () => clearInterval(intervalId);
    }
  }, [currentUserId]);

  // Fetch messages for a conversation
  const fetchMessages = async (patientId, before = null) => {
    try {
      const params = before ? { before } : {};
      const response = await axios.get(`/chat/messages/${currentUserId}/${patientId}`, { params });
      return response.data.data || [];
    } catch (error) {
      console.error("Error fetching messages:", error);
      return [];
    }
  };

  // Handle chat selection
  const handleSelectChat = async (chat) => {
    setSelectedChat(chat);
    setMessages([]);
    setLoading(true);
    
    try {
      const messages = await fetchMessages(chat.patientId);
      setMessages(messages);
      markMessagesAsRead(chat.patientId);
      await fetchDetailedPatientInfo(chat.patientId);
    } catch (error) {
      console.error("Error loading chat:", error);
    } finally {
      setLoading(false);
      scrollToBottom();
    }
  };

  // Mark messages as read
  const markMessagesAsRead = async (patientId) => {
    try {
      await axios.post("/chat/mark-as-read", {
        senderId: currentUserId,
        receiverId: patientId,
      });
      
      setConversations((prevConversations) =>
        prevConversations.map((conv) =>
          conv.patientId === patientId
            ? { ...conv, unreadCount: { ...conv.unreadCount, doctor: 0 } }
            : conv
        )
      );
    } catch (error) {
      console.error("Error marking messages as read:", error);
    }
  };

  // Infinite scroll handler for message history
  const handleScroll = async (e) => {
    const element = e.target;
    
    // Set scrolling state for animation effects
    if (!isScrolling) {
      setIsScrolling(true);
      setTimeout(() => setIsScrolling(false), 100);
    }
    
    if (element.scrollTop === 0 && selectedChat && !loading) {
      const oldestMessageTimestamp = messages[0]?.timestamp;
      if (!oldestMessageTimestamp) return;

      try {
        setLoading(true);
        const olderMessages = await fetchMessages(selectedChat.patientId, oldestMessageTimestamp);
        
        if (olderMessages.length > 0) {
          setMessages(prev => {
            const uniqueMessages = [...olderMessages, ...prev].reduce((acc, curr) => {
              acc[curr._id] = curr;
              return acc;
            }, {});
            return Object.values(uniqueMessages).sort((a, b) => 
              new Date(a.timestamp) - new Date(b.timestamp)
            );
          });
          
          // Maintain scroll position after loading older messages
          setTimeout(() => {
            element.scrollTop = 100;
          }, 100);
        }
      } catch (error) {
        console.error("Error fetching older messages:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  // Smooth scroll to bottom of messages
  const scrollToBottom = () => {
    setTimeout(() => {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  // Handle typing indicators
  const handleTyping = () => {
    if (socketRef.current && selectedChat) {
      socketRef.current.emit("doctor:typing", {
        doctorId: currentUserId,
        patientId: selectedChat.patientId,
        isTyping: true
      });
      
      if (typingTimeout) {
        clearTimeout(typingTimeout);
      }
      
      const timeout = setTimeout(() => {
        socketRef.current.emit("doctor:typing", {
          doctorId: currentUserId,
          patientId: selectedChat.patientId,
          isTyping: false
        });
      }, 2000);
      
      setTypingTimeout(timeout);
    }
  };
  // Format timestamp to relative time (e.g., "5 minutes ago")
  const formatMessageTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    
    // If same day, show time
    if (date.toDateString() === now.toDateString()) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    
    // If within last 7 days, show day name
    const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
    if (diffDays < 7) {
      return date.toLocaleDateString([], { weekday: 'short' }) + ' ' + 
             date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    
    // Otherwise show date
    return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
  };

  // Group messages by date for better UI organization
  const groupMessagesByDate = () => {
    const groups = {};
    
    messages.forEach(message => {
      const date = new Date(message.timestamp).toLocaleDateString();
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(message);
    });
    
    return Object.entries(groups).map(([date, messages]) => ({
      date,
      messages
    }));
  };

  // Send message function
  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedChat || !socketRef.current) return;

    const messageData = {
      senderId: currentUserId,
      receiverId: selectedChat.patientId,
      senderModel: "Doctor",
      receiverModel: "Patient",
      message: newMessage.trim(),
      timestamp: new Date().toISOString()
    };

    try {
      const tempId = `temp-${Date.now()}`;
      const tempMessage = { ...messageData, _id: tempId, pending: true };
      
      setMessages(prev => [...prev, tempMessage]);
      setNewMessage("");
      scrollToBottom();
      
      // Focus back on input after sending
      if (inputRef.current) {
        inputRef.current.focus();
      }

      socketRef.current.emit("sendMessage", messageData, (acknowledgment) => {
        if (acknowledgment.success) {
          // Update with confirmed message from server
          setMessages(prev => 
            prev.map(msg => msg._id === tempId ? { ...acknowledgment.message, delivered: true } : msg)
          );

          // Update conversation list with most recent message
          setConversations(prev => {
            const updatedConversations = prev.map(conv => {
              if (conv.patientId === selectedChat.patientId) {
                return {
                  ...conv,
                  lastMessage: messageData.message,
                  lastMessageTimestamp: messageData.timestamp
                };
              }
              return conv;
            });
            
            // Resort conversations to put most recent first
            return updatedConversations.sort((a, b) => 
              new Date(b.lastMessageTimestamp) - new Date(a.lastMessageTimestamp)
            );
          });
        } else {
          // Handle failed message
          setMessages(prev => 
            prev.map(msg => 
              msg._id === tempId ? { ...msg, error: true, pending: false } : msg
            )
          );
          console.error("Failed to send message:", acknowledgment.error);
        }
      });
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  // Filter conversations based on search term
  const filteredConversations = conversations.filter((conv) =>
    conv.patientName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.lastMessage?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // UI for patient information panel
  const renderPatientInfoPanel = () => {
    if (!patientDetails) return null;
    
    return (
      <div className="w-80 border-l border-gray-800 bg-gray-900 p-4 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-white">Patient Information</h3>
          <button 
            onClick={() => setShowPatientInfo(false)}
            className="text-gray-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="mb-6">
          <div className="w-24 h-24 bg-gray-800 rounded-full mx-auto flex items-center justify-center mb-4">
            <User className="text-gray-400 w-12 h-12" />
          </div>
          <h4 className="text-white text-lg font-medium text-center">{patientDetails.name}</h4>
          <p className="text-gray-400 text-center">{patientDetails.age || "N/A"} years old</p>
        </div>
        
        <div className="mb-4 p-3 bg-gray-800 rounded-lg">
          <h5 className="text-sm font-medium text-gray-300 mb-2">Last Visit</h5>
          <p className="text-white">{patientDetails.lastVisit || "No recent visits"}</p>
        </div>
        
        <div className="mb-4 p-3 bg-gray-800 rounded-lg">
          <h5 className="text-sm font-medium text-gray-300 mb-2">Contact Information</h5>
          <p className="text-white mb-1">{patientDetails.email || "No email"}</p>
          <p className="text-white">{patientDetails.phone || "No phone"}</p>
        </div>
        
        <div className="p-3 bg-gray-800 rounded-lg">
          <h5 className="text-sm font-medium text-gray-300 mb-2">Medical History</h5>
          {patientDetails.medicalHistory && patientDetails.medicalHistory.length > 0 ? (
            <ul className="list-disc pl-5 text-white">
              {patientDetails.medicalHistory.map((item, index) => (
                <li key={index} className="mb-1">{item}</li>
              ))}
            </ul>
          ) : (
            <p className="text-white">No medical history available</p>
          )}
        </div>
      </div>
    );
  };

  // Main component render
  return (
    <div className="flex h-screen bg-gray-900">
      {/* Responsive sidebar toggle for mobile */}
      <button 
        onClick={() => setShowSidebar(!showSidebar)}
        className="md:hidden fixed top-4 left-4 z-20 p-2 bg-blue-600 rounded-full text-white shadow-lg"
      >
        {showSidebar ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>
      
      {/* Conversations sidebar */}
      <div 
        className={`${showSidebar ? 'translate-x-0' : '-translate-x-full'} 
                   md:translate-x-0 transform transition-transform duration-300 ease-in-out
                   w-full md:w-1/4 lg:w-1/3 border-r border-gray-800 flex flex-col
                   absolute md:relative z-10 h-full bg-gray-900`}
      >
        {/* Doctor profile section */}
        <div className="p-4 bg-gray-800 border-b border-gray-700">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              {doctorProfile?.initials || 
                <span className="text-white font-bold">DR</span>
              }
            </div>
            <div className="ml-3">
              <h3 className="text-white font-medium">
                {doctorProfile?.name || "Doctor"}
              </h3>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                <span className="text-gray-400 text-xs">Online</span>
              </div>
            </div>
          </div>
          
          {/* Search input */}
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

        {/* Conversations list */}
        <div className="flex-1 overflow-y-auto">
          {loading && conversations.length === 0 ? (
            <div className="text-center text-gray-400 py-8">
              <div className="inline-block p-3 bg-gray-800 rounded-full mb-2">
                <MessageSquare className="w-6 h-6 animate-pulse" />
              </div>
              <p>Loading conversations...</p>
            </div>
          ) : filteredConversations.length === 0 ? (
            <div className="text-center text-gray-400 py-8">
              <div className="inline-block p-3 bg-gray-800 rounded-full mb-2">
                <AlertCircle className="w-6 h-6" />
              </div>
              <p>No conversations found</p>
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm("")}
                  className="text-blue-500 hover:underline mt-2"
                >
                  Clear search
                </button>
              )}
            </div>
          ) : (
            filteredConversations.map((chat) => (
              <div
                key={chat._id}
                onClick={() => handleSelectChat(chat)}
                className={`flex items-center p-4 hover:bg-gray-800 cursor-pointer transition-colors duration-200 ${
                  selectedChat?._id === chat._id ? "bg-gray-800" : ""
                }`}
              >
                <div className="relative">
                  <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center">
                    <Users className="text-gray-400 w-6 h-6" />
                  </div>
                  {chat.unreadCount?.doctor > 0 && (
                    <div className="absolute top-0 right-0 bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                      {chat.unreadCount.doctor}
                    </div>
                  )}
                </div>
                <div className="ml-4 flex-1 overflow-hidden">
                  <div className="flex justify-between items-center">
                    <span className="text-white font-medium truncate">
                      {chat.patientName}
                    </span>
                    <span className="text-gray-400 text-xs whitespace-nowrap">
                      {formatDistanceToNow(new Date(chat.lastMessageTimestamp), { addSuffix: true })}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-gray-400 text-sm truncate max-w-[80%]">
                      {chat.lastMessage}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        
        {/* Doctor menu options */}
        <div className="p-3 bg-gray-800 border-t border-gray-700">
          <div className="flex justify-around">
            <button className="p-2 rounded-full hover:bg-gray-700 text-gray-400 hover:text-white transition-colors duration-200">
              <Calendar className="w-5 h-5" />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-700 text-gray-400 hover:text-white transition-colors duration-200">
              <BellRing className="w-5 h-5" />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-700 text-gray-400 hover:text-white transition-colors duration-200">
              <FileText className="w-5 h-5" />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-700 text-gray-400 hover:text-white transition-colors duration-200">
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Chat area */}
      <div className="flex-1 flex flex-col">
        {selectedChat ? (
          <>
            {/* Chat header with patient info */}
            <div className="p-4 bg-gray-800 flex items-center justify-between shadow-md">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
                  <Users className="text-gray-400 w-5 h-5" />
                </div>
                <div className="ml-3">
                  <span className="text-white font-medium">{selectedChat.patientName}</span>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-gray-400 text-xs">Online</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <button className="p-2 rounded-full hover:bg-gray-700 text-gray-400 hover:text-white transition-colors duration-200">
                  <Phone className="w-5 h-5" />
                </button>
                <button className="p-2 rounded-full hover:bg-gray-700 text-gray-400 hover:text-white transition-colors duration-200">
                  <Video className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => setShowPatientInfo(!showPatientInfo)}
                  className={`p-2 rounded-full hover:bg-gray-700 transition-colors duration-200 
                              ${showPatientInfo ? 'bg-gray-700 text-white' : 'text-gray-400'}`}
                >
                  <Info className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Messages area */}
            <div 
              ref={messagesContainerRef}
              onScroll={handleScroll}
              className={`flex-1 overflow-y-auto p-4 bg-gray-900 scrollbar-thin scrollbar-thumb-gray-700 
                        scrollbar-track-gray-900 ${isScrolling ? 'scroll-smooth' : ''}`}
            >
              {loading && messages.length === 0 ? (
                <div className="flex justify-center items-center h-full">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                </div>
              ) : (
                groupMessagesByDate().map((group, groupIndex) => (
                  <div key={groupIndex} className="mb-6">
                    <div className="flex justify-center mb-4">
                      <div className="px-3 py-1 bg-gray-800 rounded-full">
                        <span className="text-gray-400 text-xs">{group.date}</span>
                      </div>
                    </div>
                    
                    {group.messages.map((message) => (
                      <div
                        key={message._id}
                        className={`flex mb-4 ${
                          message.senderModel === "Doctor" ? "justify-end" : "justify-start"
                        } ${message.pending ? "opacity-70" : "opacity-100"}`}
                      >
                        {message.senderModel !== "Doctor" && (
                          <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center mr-2 self-end">
                            <Users className="text-gray-400 w-4 h-4" />
                          </div>
                        )}
                        
                        <div
                          className={`max-w-xs md:max-w-md px-4 py-3 rounded-lg ${
                            message.senderModel === "Doctor"
                              ? "bg-blue-600 text-white rounded-tr-none"
                              : "bg-gray-700 text-white rounded-tl-none"
                          }`}
                        >
                          <p className="text-sm break-words">{message.message}</p>
                          <div className="flex items-center justify-end mt-1">
                            <span className="text-xs opacity-75 mr-1">
                              {formatMessageTime(message.timestamp)}
                            </span>
                            
                            {message.senderModel === "Doctor" && (
                              <span>
                                {message.error ? (
                                  <AlertCircle className="w-3 h-3 text-red-500" />
                                ) : message.delivered ? (
                                  <div className="flex">
                                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                  </div>
                                ) : message.pending ? (
                                  <Clock className="w-3 h-3 text-gray-300" />
                                ) : (
                                  <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                                )}
                              </span>
                            )}
                          </div>
                        </div>
                        
                        {message.senderModel === "Doctor" && (
                          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center ml-2 self-end">
                            <span className="text-white text-xs font-bold">
                              {doctorProfile?.initials || "DR"}
                            </span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ))
              )}
              
              {/* Typing indicator */}
              {isTyping && (
                <div className="flex mb-4 justify-start">
                  <div className="flex items-center bg-gray-800 rounded-lg px-4 py-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-100"></div>
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-200"></div>
                    </div>
                    <span className="text-gray-400 text-xs ml-2">
                      {selectedChat.patientName} is typing...
                    </span>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Message input area */}
            <div className="p-4 bg-gray-800 shadow-lg">
              <div className="flex items-center space-x-4">
                <input
                  ref={inputRef}
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  onInput={handleTyping}
                  className="flex-1 bg-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  placeholder="Type a message..."
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  className={`p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500
                            ${newMessage.trim() 
                                ? 'bg-blue-600 text-white hover:bg-blue-700' 
                                : 'bg-gray-700 text-gray-400'} 
                            transition-colors duration-200`}
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </>
        ) : (
          // Empty state when no chat is selected
          <div className="flex-1 flex flex-col items-center justify-center bg-gray-900">
            <div className="bg-gray-800 p-6 rounded-full mb-6">
              <Coffee className="w-16 h-16 text-blue-500" />
            </div>
            <h2 className="text-2xl text-gray-300 font-medium mb-2">Welcome, Doctor</h2>
            <p className="text-gray-500 text-center max-w-md px-4 mb-6">
              Select a patient conversation from the left to start chatting
            </p>
            <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200">
              New Consultation
            </button>
          </div>
        )}
      </div>
      
      {/* Patient info sidebar - conditionally rendered */}
      {selectedChat && showPatientInfo && renderPatientInfoPanel()}
    </div>
  );
};

export default DoctorChat;