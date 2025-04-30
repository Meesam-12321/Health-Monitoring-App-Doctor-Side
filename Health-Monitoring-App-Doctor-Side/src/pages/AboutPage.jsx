import React, { useContext, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { DarkModeContext } from "../Context/DarkModeContext";
import { Heart, Stethoscope, Award, Calendar, MessageCircle, Users, Activity, FileText, Shield } from 'lucide-react';

const AboutPage = () => {
  const { darkMode } = useContext(DarkModeContext);
  const teamRef = useRef(null);
  const missionRef = useRef(null);
  const historyRef = useRef(null);

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  // Animation variants
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const teamMembers = [
    {
      name: "Dr. Sarah Johnson",
      role: "Founder & CEO",
      image: "/api/placeholder/120/120",
      bio: "Board-certified cardiologist with over 15 years of experience in both clinical practice and healthcare technology."
    },
    {
      name: "Dr. Michael Chen",
      role: "Chief Medical Officer",
      image: "/api/placeholder/120/120",
      bio: "Former hospital administrator and family physician dedicated to improving healthcare accessibility."
    },
    {
      name: "Emma Rodriguez",
      role: "Head of Product",
      image: "/api/placeholder/120/120",
      bio: "Healthcare IT specialist with expertise in creating intuitive software solutions for medical professionals."
    },
    {
      name: "James Wilson",
      role: "Lead Developer",
      image: "/api/placeholder/120/120",
      bio: "Full-stack engineer specializing in secure healthcare applications and HIPAA-compliant systems."
    }
  ];

  const milestones = [
    {
      year: "2020",
      title: "Our Beginning",
      description: "Doctor's Hub was founded by a team of physicians and technologists who recognized the need for better digital tools in healthcare."
    },
    {
      year: "2021",
      title: "First Platform Release",
      description: "Launched our initial platform with basic scheduling and patient management features to select medical practices."
    },
    {
      year: "2022",
      title: "Expansion & Growth",
      description: "Expanded our team and feature set, adding secure messaging and improved analytics based on practitioner feedback."
    },
    {
      year: "2023",
      title: "Security Certification",
      description: "Achieved HIPAA compliance certification and expanded our security protocols to meet international standards."
    },
    {
      year: "2024",
      title: "Advanced Analytics",
      description: "Introduced AI-powered analytics to help physicians identify trends and provide preventative care recommendations."
    }
  ];

  return (
    <div className={`min-h-screen ${darkMode ? "bg-gray-950 text-white" : "bg-white text-gray-900"}`}>
      {/* Hero Section */}
      <motion.div 
        className={`pt-24 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden ${darkMode ? "bg-gradient-to-br from-gray-900 via-gray-950 to-black" : "bg-gradient-to-br from-blue-50 via-white to-blue-50"}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div 
            className="absolute -right-20 -top-20 w-96 h-96 rounded-full opacity-10 bg-blue-500 blur-3xl"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1]
            }}
            transition={{ 
              duration: 8,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
          <motion.div 
            className="absolute -left-20 top-40 w-72 h-72 rounded-full opacity-10 bg-indigo-500 blur-3xl"
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.1, 0.15, 0.1]
            }}
            transition={{ 
              duration: 10,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
        </div>
        
        {/* Hero content */}
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className={`text-5xl md:text-6xl font-bold mb-6 ${darkMode ? "text-white" : "text-gray-900"}`}>
              About Doctor's Hub
            </h1>
          </motion.div>
          
          <motion.p 
            className={`text-xl md:text-2xl max-w-3xl mx-auto mb-8 ${darkMode ? "text-gray-300" : "text-gray-700"}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Transforming healthcare management through innovative technology created by doctors, for doctors.
          </motion.p>
        </div>
      </motion.div>

      {/* Our Mission Section */}
      <motion.div 
        ref={missionRef}
        className={`py-24 px-4 sm:px-6 lg:px-8 ${darkMode ? "bg-gray-900" : "bg-white"}`}
        initial="initial"
        animate="animate"
        variants={fadeIn}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative">
                <div className={`absolute inset-0 rounded-2xl -rotate-6 ${darkMode ? "bg-blue-900/20" : "bg-blue-100"}`}></div>
                <div className={`relative rounded-2xl overflow-hidden ${darkMode ? "bg-gray-800" : "bg-white"} shadow-xl border ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
                  <div className="aspect-w-16 aspect-h-9 bg-blue-500 flex items-center justify-center">
                    <Stethoscope className="w-24 h-24 text-white" />
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${darkMode ? "text-white" : "text-gray-900"}`}>
                Our Mission
              </h2>
              <p className={`text-lg mb-6 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                At Doctor's Hub, we're on a mission to revolutionize healthcare management by providing physicians with powerful digital tools that simplify administrative tasks and enhance patient care.
              </p>
              <p className={`text-lg mb-6 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                We believe that when doctors spend less time on paperwork and more time with patients, everyone benefits. Our platform combines intuitive design with powerful features to create a seamless experience for healthcare providers.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <div className={`p-6 rounded-xl ${darkMode ? "bg-gray-800" : "bg-gray-50"} shadow-md`}>
                  <div className="mb-4 text-blue-500">
                    <Shield className="w-8 h-8" />
                  </div>
                  <h3 className={`text-xl font-semibold mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
                    Data Security First
                  </h3>
                  <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                    HIPAA-compliant platform with military-grade encryption
                  </p>
                </div>
                
                <div className={`p-6 rounded-xl ${darkMode ? "bg-gray-800" : "bg-gray-50"} shadow-md`}>
                  <div className="mb-4 text-blue-500">
                    <Users className="w-8 h-8" />
                  </div>
                  <h3 className={`text-xl font-semibold mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
                    Patient Centered
                  </h3>
                  <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                    Designed to improve healthcare outcomes and patient satisfaction
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Our Values Section */}
      <motion.div 
        className={`py-24 px-4 sm:px-6 lg:px-8 ${darkMode ? "bg-gray-950" : "bg-gray-50"}`}
        initial="initial"
        animate="animate"
        variants={fadeIn}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>
              Our Core Values
            </h2>
            <p className={`text-xl max-w-3xl mx-auto ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              The principles that guide everything we do at Doctor's Hub
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              className={`p-8 rounded-xl ${darkMode ? "bg-gray-900" : "bg-white"} shadow-xl`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              whileHover={{ y: -10 }}
            >
              <div className="mb-5 text-blue-500 bg-blue-500/10 p-3 rounded-lg inline-block">
                <Award className="w-8 h-8" />
              </div>
              <h3 className={`text-xl font-semibold mb-3 ${darkMode ? "text-white" : "text-gray-900"}`}>
                Excellence
              </h3>
              <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                We're committed to delivering the highest quality software that exceeds the expectations of healthcare professionals.
              </p>
            </motion.div>
            
            <motion.div
              className={`p-8 rounded-xl ${darkMode ? "bg-gray-900" : "bg-white"} shadow-xl`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              whileHover={{ y: -10 }}
            >
              <div className="mb-5 text-blue-500 bg-blue-500/10 p-3 rounded-lg inline-block">
                <MessageCircle className="w-8 h-8" />
              </div>
              <h3 className={`text-xl font-semibold mb-3 ${darkMode ? "text-white" : "text-gray-900"}`}>
                Communication
              </h3>
              <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                We believe clear, secure communication between healthcare providers and their patients is fundamental to good care.
              </p>
            </motion.div>
            
            <motion.div
              className={`p-8 rounded-xl ${darkMode ? "bg-gray-900" : "bg-white"} shadow-xl`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              whileHover={{ y: -10 }}
            >
              <div className="mb-5 text-blue-500 bg-blue-500/10 p-3 rounded-lg inline-block">
                <Activity className="w-8 h-8" />
              </div>
              <h3 className={`text-xl font-semibold mb-3 ${darkMode ? "text-white" : "text-gray-900"}`}>
                Innovation
              </h3>
              <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                We continuously explore new technologies to improve our platform and the healthcare experience for all stakeholders.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* How It Works Section */}
      <motion.div 
        ref={historyRef}
        className={`py-24 px-4 sm:px-6 lg:px-8 ${darkMode ? "bg-gray-900" : "bg-white"}`}
        initial="initial"
        animate="animate"
        variants={fadeIn}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>
              How Doctor's Hub Works
            </h2>
            <p className={`text-xl max-w-3xl mx-auto ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              A seamless experience for healthcare providers and their patients
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            <motion.div
              className={`p-8 rounded-xl shadow-lg ${darkMode ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-100"}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              whileHover={{ y: -5 }}
            >
              <div className="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center mb-6 mx-auto">
                <Calendar className="w-8 h-8 text-blue-500" />
              </div>
              <h3 className={`text-xl font-semibold mb-4 text-center ${darkMode ? "text-white" : "text-gray-900"}`}>
                1. Streamlined Scheduling
              </h3>
              <div className={`space-y-4 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                <p>
                  Doctor's Hub provides an intelligent appointment system that optimizes your clinic's workflow.
                </p>
                <p>
                  Patients can request appointments, receive automatic reminders, and complete pre-appointment forms digitally.
                </p>
                <p>
                  Doctors can view their complete schedule at a glance and manage their availability efficiently.
                </p>
              </div>
            </motion.div>
            
            <motion.div
              className={`p-8 rounded-xl shadow-lg ${darkMode ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-100"}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              whileHover={{ y: -5 }}
            >
              <div className="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center mb-6 mx-auto">
                <MessageCircle className="w-8 h-8 text-blue-500" />
              </div>
              <h3 className={`text-xl font-semibold mb-4 text-center ${darkMode ? "text-white" : "text-gray-900"}`}>
                2. Secure Communication
              </h3>
              <div className={`space-y-4 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                <p>
                  Our HIPAA-compliant messaging system enables secure doctor-patient conversations anytime, anywhere.
                </p>
                <p>
                  Patients can ask questions, request prescription refills, or share updates about their condition securely.
                </p>
                <p>
                  Doctors can respond when convenient, attach educational resources, and maintain complete records of all communications.
                </p>
              </div>
            </motion.div>
            
            <motion.div
              className={`p-8 rounded-xl shadow-lg ${darkMode ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-100"}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              whileHover={{ y: -5 }}
            >
              <div className="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center mb-6 mx-auto">
                <Activity className="w-8 h-8 text-blue-500" />
              </div>
              <h3 className={`text-xl font-semibold mb-4 text-center ${darkMode ? "text-white" : "text-gray-900"}`}>
                3. Patient Monitoring
              </h3>
              <div className={`space-y-4 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                <p>
                  Monitor patient vitals and health metrics through our intuitive dashboard interface.
                </p>
                <p>
                  Receive alerts for abnormal readings or missed treatments that require attention.
                </p>
                <p>
                  Track treatment progress over time with comprehensive analytics and visual reports.
                </p>
              </div>
            </motion.div>
          </div>
          
          <motion.div 
            className={`rounded-2xl overflow-hidden shadow-xl ${darkMode ? "bg-gray-800" : "bg-white"} border ${darkMode ? "border-gray-700" : "border-gray-200"}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className={`p-8 ${darkMode ? "bg-gray-800" : "bg-white"}`}>
                <h3 className={`text-2xl font-bold mb-6 ${darkMode ? "text-white" : "text-gray-900"}`}>
                  Comprehensive Dashboard
                </h3>
                <ul className={`space-y-4 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium mr-3 mt-0.5">✓</div>
                    <span>Complete patient records at your fingertips</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium mr-3 mt-0.5">✓</div>
                    <span>Real-time patient vitals monitoring</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium mr-3 mt-0.5">✓</div>
                    <span>Digital prescription management</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium mr-3 mt-0.5">✓</div>
                    <span>Treatment plan tracking and alerts</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium mr-3 mt-0.5">✓</div>
                    <span>Appointment calendar with smart scheduling</span>
                  </li>
                </ul>
              </div>
              <div className={`${darkMode ? "bg-gray-900" : "bg-blue-50"} p-8 flex items-center justify-center`}>
                <div className="w-full max-w-md h-64 bg-blue-500/10 rounded-lg relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <FileText className="w-24 h-24 text-blue-500 opacity-50" />
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 p-4 rounded-lg bg-white/90 shadow-lg">
                    <div className="h-2 w-32 bg-blue-200 rounded mb-2"></div>
                    <div className="h-2 w-48 bg-blue-200 rounded mb-2"></div>
                    <div className="h-2 w-24 bg-blue-200 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      
      {/* Call to action section */}
      <div className={`py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden ${darkMode ? "bg-gradient-to-br from-blue-900 to-gray-900" : "bg-gradient-to-br from-blue-500 to-blue-700"}`}>
        {/* Background animation elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div 
            className="absolute right-0 bottom-0 w-96 h-96 rounded-full opacity-10 bg-white blur-3xl"
            animate={{ 
              scale: [1, 1.2, 1],
              x: [0, 50, 0],
              opacity: [0.1, 0.15, 0.1]
            }}
            transition={{ 
              duration: 12,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
          <motion.div 
            className="absolute -left-48 -top-48 w-96 h-96 rounded-full opacity-10 bg-white blur-3xl"
            animate={{ 
              scale: [1, 1.5, 1],
              opacity: [0.1, 0.15, 0.1]
            }}
            transition={{ 
              duration: 10,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-6 text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Ready to Transform Your Medical Practice?
          </motion.h2>
          <motion.p 
            className="text-xl mb-10 text-blue-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Join thousands of healthcare providers who trust Doctor's Hub to streamline their operations.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row justify-center gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <button
              className="px-8 py-4 rounded-lg bg-white text-blue-700 hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-medium text-lg flex items-center justify-center"
              onClick={() => window.location.href = '/register'}
            >
              Get Started
            </button>
            <button
              className="px-8 py-4 rounded-lg bg-transparent border-2 border-white text-white hover:bg-white/10 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-medium text-lg flex items-center justify-center"
              onClick={() => window.location.href = '/contact'}
            >
              Contact Us
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;