import React, { useState, useEffect, useRef, useContext } from "react";
import { 
  MessageSquare, 
  Send, 
  Search, 
  MoreVertical, 
  Users, 
  Phone, 
  Video, 
  Coffee,
  Calendar,
  BellRing,
  LogOut,
  Info,
  AlertCircle,
  FileText,
  User,
  Menu,
  X,
  Check,
  Clock
} from "lucide-react";
import { DarkModeContext } from "../Context/DarkModeContext";
import { formatDistanceToNow } from "date-fns";

const DoctorChat = () => {
  // State management
  const { darkMode } = useContext(DarkModeContext);
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [selectedChat, setSelectedChat] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [doctorProfile, setDoctorProfile] = useState(null);
  const [showSidebar, setShowSidebar] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [patientDetails, setPatientDetails] = useState(null);
  const [showPatientInfo, setShowPatientInfo] = useState(false);
  
  // Refs
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const inputRef = useRef(null);

  // Dummy doctor profile
  const DUMMY_DOCTOR = {
    id: "d-001",
    name: "Dr. Meesam",
    specialty: "Cardiologist",
    avatar: null,
    initials: "DM",
    online: true
  };

  // Dummy conversations data
  const DUMMY_CONVERSATIONS = [
    {
      _id: "c-001",
      patientId: "p-001",
      patientName: "Faseeha",
      lastMessage: "Thank you for the prescription, doctor. I'll follow your advice.",
      lastMessageTimestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
      unreadCount: { doctor: 2 }
    },
    {
      _id: "c-002",
      patientId: "p-002",
      patientName: "Areej",
      lastMessage: "When should I schedule my next appointment?",
      lastMessageTimestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
      unreadCount: { doctor: 0 }
    },
    {
      _id: "c-003",
      patientId: "p-003",
      patientName: "Noor Naveed",
      lastMessage: "The new medication seems to be working well.",
      lastMessageTimestamp: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
      unreadCount: { doctor: 0 }
    },
    {
      _id: "c-004",
      patientId: "p-004",
      patientName: "Fizza",
      lastMessage: "I've been experiencing some side effects.",
      lastMessageTimestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
      unreadCount: { doctor: 3 }
    },
    {
      _id: "c-005",
      patientId: "p-005",
      patientName: "Muddaser Raza",
      lastMessage: "My blood pressure readings are attached.",
      lastMessageTimestamp: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
      unreadCount: { doctor: 0 }
    }
  ];

  // Dummy chat messages (will be set for selected conversation)
  const DUMMY_MESSAGES = {
    "p-001": [
      {
        _id: "m-001-1",
        senderId: "p-001",
        receiverId: "d-001",
        senderModel: "Patient",
        message: "Hello Dr. Meesam, I've been experiencing chest pain for the past two days.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
        delivered: true
      },
      {
        _id: "m-001-2",
        senderId: "d-001",
        receiverId: "p-001",
        senderModel: "Doctor",
        message: "Hi Faseeha. Can you describe the pain? Is it sharp or dull? Does it come and go?",
        timestamp: new Date(Date.now() - 1000 * 60 * 55).toISOString(),
        delivered: true
      },
      {
        _id: "m-001-3",
        senderId: "p-001",
        receiverId: "d-001",
        senderModel: "Patient",
        message: "It's a sharp pain, usually when I exert myself. Sometimes it radiates to my left arm.",
        timestamp: new Date(Date.now() - 1000 * 60 * 50).toISOString(),
        delivered: true
      },
      {
        _id: "m-001-4",
        senderId: "d-001",
        receiverId: "p-001",
        senderModel: "Doctor",
        message: "That could be concerning. I'd like you to come in for an EKG as soon as possible. In the meantime, avoid strenuous activity and take aspirin if you have it available.",
        timestamp: new Date(Date.now() - 1000 * 60 * 40).toISOString(),
        delivered: true
      },
      {
        _id: "m-001-5",
        senderId: "p-001",
        receiverId: "d-001",
        senderModel: "Patient",
        message: "Should I go to the emergency room?",
        timestamp: new Date(Date.now() - 1000 * 60 * 35).toISOString(),
        delivered: true
      },
      {
        _id: "m-001-6",
        senderId: "d-001",
        receiverId: "p-001",
        senderModel: "Doctor",
        message: "If the pain is severe or persists, yes. I've sent a prescription for nitroglycerin to your pharmacy that might help in the meantime.",
        timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
        delivered: true
      },
      {
        _id: "m-001-7",
        senderId: "p-001",
        receiverId: "d-001",
        senderModel: "Patient",
        message: "Thank you for the prescription, doctor. I'll follow your advice.",
        timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
        delivered: true
      }
    ],
    "p-002": [
      {
        _id: "m-002-1",
        senderId: "p-002",
        receiverId: "d-001",
        senderModel: "Patient",
        message: "Good morning, Dr. Meesam. How are you today?",
        timestamp: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
        delivered: true
      },
      {
        _id: "m-002-2",
        senderId: "d-001", 
        receiverId: "p-002",
        senderModel: "Doctor",
        message: "I'm well, thank you . How can I help you today?",
        timestamp: new Date(Date.now() - 1000 * 60 * 175).toISOString(),
        delivered: true
      },
      {
        _id: "m-002-3",
        senderId: "p-002",
        receiverId: "d-001",
        senderModel: "Patient",
        message: "I've been taking the medication for my hypertension for two weeks now, and my blood pressure readings have improved.",
        timestamp: new Date(Date.now() - 1000 * 60 * 170).toISOString(),
        delivered: true
      },
      {
        _id: "m-002-4",
        senderId: "d-001",
        receiverId: "p-002",
        senderModel: "Doctor",
        message: "That's excellent news! What are your latest readings?",
        timestamp: new Date(Date.now() - 1000 * 60 * 165).toISOString(),
        delivered: true
      },
      {
        _id: "m-002-5",
        senderId: "p-002",
        receiverId: "d-001",
        senderModel: "Patient",
        message: "My average this week has been 128/82, down from 146/94 before.",
        timestamp: new Date(Date.now() - 1000 * 60 * 160).toISOString(),
        delivered: true
      },
      {
        _id: "m-002-6",
        senderId: "d-001",
        receiverId: "p-002",
        senderModel: "Doctor",
        message: "That's a significant improvement. Keep monitoring and continue with the current dosage. Any side effects?",
        timestamp: new Date(Date.now() - 1000 * 60 * 155).toISOString(),
        delivered: true
      },
      {
        _id: "m-002-7",
        senderId: "p-002",
        receiverId: "d-001",
        senderModel: "Patient",
        message: "Just a bit of dizziness in the mornings, but it passes quickly.",
        timestamp: new Date(Date.now() - 1000 * 60 * 150).toISOString(),
        delivered: true
      },
      {
        _id: "m-002-8",
        senderId: "d-001",
        receiverId: "p-002",
        senderModel: "Doctor",
        message: "That's a common side effect. Try taking it with food and stay hydrated. It should diminish over time.",
        timestamp: new Date(Date.now() - 1000 * 60 * 145).toISOString(),
        delivered: true
      },
      {
        _id: "m-002-9",
        senderId: "p-002",
        receiverId: "d-001",
        senderModel: "Patient",
        message: "When should I schedule my next appointment?",
        timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
        delivered: true
      }
    ]
  };
  // Dummy patient details
  const DUMMY_PATIENT_DETAILS = {
    "p-001": {
      name: "Faseeha",
      age: 57,
      email: "Faseeha.wilson@example.com",
      phone: "+1 (555) 123-4567",
      lastVisit: "March 15, 2025",
      medicalHistory: [
        "Hypertension (diagnosed 2020)",
        "Type 2 Diabetes (diagnosed 2018)",
        "Coronary artery disease",
        "Hip replacement surgery (2022)"
      ]
    },
    "p-002": {
      name: "Areej",
      age: 34,
      email: "Areej.parker@example.com",
      phone: "+1 (555) 987-6543",
      lastVisit: "April 2, 2025",
      medicalHistory: [
        "Hypertension (diagnosed 2023)",
        "Anxiety disorder",
        "Migraine with aura"
      ]
    }
  };

  // Initialize with dummy data
  useEffect(() => {
    setDoctorProfile(DUMMY_DOCTOR);
    setConversations(DUMMY_CONVERSATIONS);
    setLoading(false);
  }, []);

  // Play notification sound
  const playNotificationSound = () => {
    // In a real implementation, this would play a sound file
    console.log("Notification sound played");
  };

  // Format timestamp to relative time
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

  // Handle chat selection
  const handleSelectChat = async (chat) => {
    setSelectedChat(chat);
    setMessages([]);
    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const chatMessages = DUMMY_MESSAGES[chat.patientId] || [];
      setMessages(chatMessages);
      setLoading(false);
      
      // Mark messages as read
      setConversations(prevConversations =>
        prevConversations.map(conv =>
          conv.patientId === chat.patientId
            ? { ...conv, unreadCount: { ...conv.unreadCount, doctor: 0 } }
            : conv
        )
      );
      
      // Set patient details
      setPatientDetails(DUMMY_PATIENT_DETAILS[chat.patientId] || {
        name: chat.patientName,
        age: "Unknown",
        email: "Unknown",
        phone: "Unknown",
        lastVisit: "Unknown",
        medicalHistory: []
      });
      
      // Scroll to bottom of messages
      scrollToBottom();
    }, 500);
  };

  // Smooth scroll to bottom of messages
  const scrollToBottom = () => {
    setTimeout(() => {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  // Handle typing simulation
  const handleTyping = () => {
    // In a real implementation, this would emit a socket event
    console.log("Doctor is typing...");
  };

  // Send message function
  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedChat) return;

    const messageData = {
      _id: `new-${Date.now()}`,
      senderId: DUMMY_DOCTOR.id,
      receiverId: selectedChat.patientId,
      senderModel: "Doctor",
      receiverModel: "Patient",
      message: newMessage.trim(),
      timestamp: new Date().toISOString(),
      pending: true
    };

    // Add message to UI immediately
    setMessages(prev => [...prev, messageData]);
    setNewMessage("");
    scrollToBottom();
    
    // Focus back on input after sending
    if (inputRef.current) {
      inputRef.current.focus();
    }

    // Simulate message sending delay
    setTimeout(() => {
      // Update message status to delivered
      setMessages(prev => 
        prev.map(msg => msg._id === messageData._id ? { ...msg, pending: false, delivered: true } : msg)
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

      // Simulate patient typing response after a short delay
      if (selectedChat.patientId === "p-001" || selectedChat.patientId === "p-002") {
        setTimeout(() => {
          setIsTyping(true);
          
          // Simulate patient response after typing
          setTimeout(() => {
            setIsTyping(false);
            
            const responseMessage = {
              _id: `resp-${Date.now()}`,
              senderId: selectedChat.patientId,
              receiverId: DUMMY_DOCTOR.id,
              senderModel: "Patient",
              message: selectedChat.patientId === "p-001" 
                ? "Thank you for your quick response, doctor." 
                : "I'll make sure to follow your instructions.",
              timestamp: new Date().toISOString(),
              delivered: true
            };
            
            setMessages(prev => [...prev, responseMessage]);
            
            // Update conversation
            setConversations(prev => {
              const updatedConversations = prev.map(conv => {
                if (conv.patientId === selectedChat.patientId) {
                  return {
                    ...conv,
                    lastMessage: responseMessage.message,
                    lastMessageTimestamp: responseMessage.timestamp
                  };
                }
                return conv;
              });
              
              return updatedConversations.sort((a, b) => 
                new Date(b.lastMessageTimestamp) - new Date(a.lastMessageTimestamp)
              );
            });
            
            scrollToBottom();
          }, 3000);
        }, 1000);
      }
    }, 1000);
  };

  // Filter conversations based on search term
  const filteredConversations = conversations.filter((conv) =>
    conv.patientName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.lastMessage?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Simulate random patient typing
  useEffect(() => {
    if (selectedChat && ["p-001", "p-003"].includes(selectedChat.patientId)) {
      const typingInterval = setInterval(() => {
        // 10% chance of typing every 30 seconds
        if (Math.random() < 0.1) {
          setIsTyping(true);
          
          setTimeout(() => {
            setIsTyping(false);
          }, 5000);
        }
      }, 30000);
      
      return () => clearInterval(typingInterval);
    }
  }, [selectedChat]);
  // UI for patient information panel
  const renderPatientInfoPanel = () => {
    if (!patientDetails) return null;
    
    return (
      <div className="w-72 border-l border-gray-800 bg-gray-900 p-4 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
        <h3 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Patient Info</h3>
          <button 
            onClick={() => setShowPatientInfo(false)}
            className="text-gray-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="mb-6">
          <div className="w-20 h-20 bg-gray-800 rounded-full mx-auto flex items-center justify-center mb-4">
            <User className="text-gray-400 w-10 h-10" />
          </div>
          <h4 className={`text-lg font-medium text-center ${darkMode ? 'text-white' : 'text-gray-900'}`}>{patientDetails.name}</h4>
          <p className="text-gray-400 text-center">{patientDetails.age || "N/A"} years old</p>
        </div>
        
        <div className="mb-4 p-3 bg-gray-800 rounded-lg">
          <h5 className="text-sm font-medium text-gray-300 mb-2">Last Visit</h5>
          <p className="text-white">{patientDetails.lastVisit || "No recent visits"}</p>
        </div>
        
        <div className="mb-4 p-3 bg-gray-800 rounded-lg">
          <h5 className="text-sm font-medium text-gray-300 mb-2">Contact</h5>
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
    <div className={`flex h-screen ${darkMode ? "bg-gray-900" : "bg-gray-100"}`}>
      {/* Mobile sidebar toggle button */}
      <button 
        onClick={() => setShowSidebar(!showSidebar)}
        className="md:hidden fixed top-4 left-4 z-20 p-2 bg-blue-600 rounded-full text-white shadow-lg"
      >
        {showSidebar ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>
      
      {/* Conversations sidebar */}
      <div className={`${showSidebar ? 'translate-x-0' : '-translate-x-full'} 
             md:translate-x-0 transform transition-transform duration-300 ease-in-out
             w-full md:w-80 border-r ${darkMode ? 'border-gray-800' : 'border-gray-300'} flex flex-col
             absolute md:relative z-10 h-full ${darkMode ? 'bg-gray-900' : 'bg-white'}`}
        >
        {/* Doctor profile section */}
        <div className={`p-4 ${darkMode ? 'bg-gray-800 border-b border-gray-700' : 'bg-gray-100 border-b border-gray-300'}`}>
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">{doctorProfile?.initials || "DR"}</span>
            </div>
            <div className="ml-3">
            <h3 className={`${darkMode ? 'text-white' : 'text-gray-900'} font-medium`}>
                {doctorProfile?.name || "Doctor"}
              </h3>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                <span className="text-gray-400 text-xs">Online</span>
              </div>
            </div>
          </div>
          
          {/* Search input */}
          <div className={`flex items-center space-x-2 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-lg px-3 py-2`}>
            <Search className="text-gray-400 w-4 h-4" />
            <input type="text"
              placeholder="Search patients..."
              className={`bg-transparent ${darkMode ? 'text-white placeholder-gray-400' : 'text-gray-800 placeholder-gray-500'} focus:outline-none w-full text-sm`}
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
            <div className={`text-center ${darkMode ? 'text-gray-400' : 'text-gray-600'} py-8`}>
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
                className={`flex items-center p-3 cursor-pointer transition-colors duration-200 ${
                  selectedChat?._id === chat._id 
                    ? darkMode ? "bg-gray-800" : "bg-gray-300" 
                    : ""
                } ${
                  darkMode ? "hover:bg-gray-800" : "hover:bg-gray-200"
                }`}
              >
                <div className="relative">
                <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-200'} w-12 h-12 rounded-full flex items-center justify-center`}>

                    <User className="text-gray-400 w-6 h-6" />
                  </div>
                  {chat.unreadCount?.doctor > 0 && (
                    <div className="absolute top-0 right-0 bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                      {chat.unreadCount.doctor}
                    </div>
                  )}
                </div>
                <div className="ml-3 flex-1 overflow-hidden">
                  <div className="flex justify-between items-center">
                  <span className={`${darkMode ? 'text-white' : 'text-gray-900'} font-medium truncate`}>

                      {chat.patientName}
                    </span>
                    <span className="text-gray-400 text-xs whitespace-nowrap">
                      {formatDistanceToNow(new Date(chat.lastMessageTimestamp), { addSuffix: true })}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                  <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} text-sm truncate max-w-[80%]`}>

                      {chat.lastMessage}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        
        {/* Doctor menu options */}
        <div className={`p-3 ${darkMode ? 'bg-gray-800 border-t border-gray-700' : 'bg-gray-100 border-t border-gray-300'}`}>
          <div className="flex justify-around">
            <button className="p-2 rounded-full hover:bg-gray-700 text-gray-400 hover:text-white transition-colors">
              <Calendar className="w-5 h-5" />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-700 text-gray-400 hover:text-white transition-colors">
              <BellRing className="w-5 h-5" />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-700 text-gray-400 hover:text-white transition-colors">
              <FileText className="w-5 h-5" />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-700 text-gray-400 hover:text-white transition-colors">
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
          <div className={`p-3 flex items-center justify-between shadow-md ${darkMode ? 'bg-gray-800' : 'bg-gray-100 border-b border-gray-300'}`}>
            <div className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${darkMode ? 'bg-gray-700' : 'bg-gray-300'}`}>
                <User className="text-gray-400 w-5 h-5" />
              </div>
              <div className="ml-3">
                <span className={`${darkMode ? 'text-white' : 'text-gray-900'} font-medium`}>{selectedChat.patientName}</span>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-gray-400 text-xs">Online</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button className={`p-2 rounded-full transition-colors ${
                darkMode ? 'hover:bg-gray-700 text-gray-400 hover:text-white' : 'hover:bg-gray-200 text-gray-600 hover:text-gray-900'
              }`}>
                <Phone className="w-5 h-5" />
              </button>
              <button className={`p-2 rounded-full transition-colors ${
                darkMode ? 'hover:bg-gray-700 text-gray-400 hover:text-white' : 'hover:bg-gray-200 text-gray-600 hover:text-gray-900'
              }`}>
                <Video className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setShowPatientInfo(!showPatientInfo)}
                className={`p-2 rounded-full transition-colors ${
                  darkMode 
                    ? `${showPatientInfo ? 'bg-gray-700 text-white' : 'text-gray-400 hover:bg-gray-700 hover:text-white'}`
                    : `${showPatientInfo ? 'bg-gray-200 text-gray-900' : 'text-gray-600 hover:bg-gray-200 hover:text-gray-900'}`
                }`}
              >
                <Info className="w-5 h-5" />
              </button>
            </div>
          </div>


{/* Messages area */}
<div 
  ref={messagesContainerRef}
  className={`flex-1 overflow-y-auto p-4 ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}
>
  {loading ? (
    <div className="flex justify-center items-center h-full">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
    </div>
  ) : (
    groupMessagesByDate().map((group, groupIndex) => (
      <div key={groupIndex} className="mb-6">
        <div className="flex justify-center mb-4">
          <div className={`px-3 py-1 rounded-full ${darkMode ? 'bg-gray-800' : 'bg-gray-300'}`}>
            <span className={`${darkMode ? 'text-gray-400' : 'text-gray-700'} text-xs`}>{group.date}</span>
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
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 self-end ${darkMode ? 'bg-gray-700' : 'bg-gray-300'}`}>
                <User className="text-gray-400 w-4 h-4" />
              </div>
            )}
            
            <div
              className={`max-w-xs md:max-w-md px-4 py-2 rounded-lg ${
                message.senderModel === "Doctor"
                  ? `${darkMode ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-900'} rounded-tr-none`
                  : `${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-900'} rounded-tl-none`
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
                      <Check className="w-3 h-3 text-gray-300" />
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
            <div className={`p-3 shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-100 border-t border-gray-300'}`}>

              <div className="flex items-center space-x-3">
                <input
                  ref={inputRef}
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  onInput={handleTyping}
                  className={`flex-1 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all
                    ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900 border border-gray-300'}`}
        
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
          <div className={`flex-1 flex flex-col items-center justify-center ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>

          <div className={`${darkMode ? 'bg-gray-800' : 'bg-gray-200'} p-6 rounded-full mb-6`}>

              <Coffee className="w-12 h-12 text-blue-500" />
            </div>
            <h2 className={`text-2xl font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}></h2>
            <p className={`text-center max-w-md px-4 mb-6 ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}>
              Select a patient conversation from the left to start chatting
            </p>
            <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
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