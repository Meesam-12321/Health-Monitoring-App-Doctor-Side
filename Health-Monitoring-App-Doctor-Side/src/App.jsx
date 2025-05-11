import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout"; // ✅ Corrected path
import Dashboard from "./pages/Dashboard";
import Appointments from "./pages/Appointments";
import AppointmentDetails from "./pages/AppointmentDetails";
import AppointmentRequests from "./pages/AppointmentRequests";
import ChatPage from "./pages/ChatPage";
import Chatbot from "./pages/Chatbot";
import DoctorLogin from "./pages/DoctorLogin";
import DoctorRegister from "./pages/DoctorRegister";
import Patients from "./pages/Patients";
import PatientDetails from "./pages/PatientDetails";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import LandingPage from "./pages/LandingPage";
import Settings from "./pages/Settings";
import PrescriptionForm from './pages/Prescriptions';
import ContactUs from './pages/ContactUs'
import Features from './pages/Features'
import AboutPage from './pages/AboutPage'; // ❗️About page is standalone
import { DarkModeProvider } from "./Context/DarkModeContext";

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("darkMode", "true");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("darkMode", "false");
    }
  }, [darkMode]);

  const [currentChatId, setCurrentChatId] = useState(null);

  const handleStartNewChat = (newChatId) => {
    setCurrentChatId(newChatId);
  };

  return (
    <DarkModeProvider>
      <BrowserRouter>
        <Routes>
          {/* Standalone Pages (No Navbar/Sidebar) */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<DoctorLogin />} />
          <Route path="/register" element={<DoctorRegister />} />
          <Route path="/about" element={<AboutPage />} /> {/* ✅ No layout */}
          <Route path="/ContactUs" element={<ContactUs />} />
          <Route path="/Features" element={<Features/>} />

          {/* Pages Wrapped in MainLayout */}
          <Route path="/dashboard" element={<MainLayout><Dashboard /></MainLayout>} />
          <Route path="/appointments" element={<MainLayout><Appointments /></MainLayout>} />
          <Route path="/appointments/:id" element={<MainLayout><AppointmentDetails /></MainLayout>} />
          <Route path="/appointmentRequests" element={<MainLayout><AppointmentRequests /></MainLayout>} />
          <Route path="/patients" element={<MainLayout><Patients /></MainLayout>} />
          <Route path="/patients/:id" element={<MainLayout><PatientDetails /></MainLayout>} />
          <Route path="/profile" element={<MainLayout><Profile /></MainLayout>} />
          <Route path="/profile/edit" element={<MainLayout><EditProfile /></MainLayout>} />
          <Route path="/settings" element={<MainLayout><Settings /></MainLayout>} />
          
          <Route path="/prescription" element={<MainLayout><PrescriptionForm /></MainLayout>} />

          {/* Chatbot has optional Chat Sidebar */}
          <Route
            path="/chatbot"
            element={
              <MainLayout isChatbot={true} currentChatId={currentChatId} onStartNewChat={handleStartNewChat}>
                <Chatbot chatId={currentChatId} />
              </MainLayout>
            }
          />

          {/* Chat Page (Standalone) */}
          <Route path="/chat" element={<ChatPage />} />
        </Routes>
      </BrowserRouter>
    </DarkModeProvider>
  );
}

export default App;
