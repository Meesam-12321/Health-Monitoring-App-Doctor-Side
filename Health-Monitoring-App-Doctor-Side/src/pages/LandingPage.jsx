import React, { useContext, useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { DarkModeContext } from "../Context/DarkModeContext";
import { Calendar, MessageCircle, Activity, Clock, Users, FileText, ChevronRight, Heart, Shield, Star } from 'lucide-react';

const LandingPage = () => {
  const { darkMode } = useContext(DarkModeContext);
  const [displayText, setDisplayText] = useState('');
  const message = "Welcome to Doctor's Hub";
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef(null);

  // Typing animation effect
  useEffect(() => {
    let index = 0;
    let isDeleting = false;
    
    const interval = setInterval(() => {
      if (!isDeleting) {
        setDisplayText((prev) => message.substring(0, prev.length + 1));
        if (displayText === message) {
          setTimeout(() => {
            isDeleting = true;
          }, 1500);
        }
      } else {
        setDisplayText((prev) => message.substring(0, prev.length - 1));
        if (displayText === '') {
          isDeleting = false;
        }
      }
    }, 120);
    
    return () => clearInterval(interval);
  }, [displayText]);

  // Scroll detection for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    
    if (heroRef.current) {
      observer.observe(heroRef.current);
    }
    
    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
    };
  }, []);

  // Animation variants
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  // Enhanced features with more medical-themed icons and descriptions
  const features = [
    {
      icon: <Calendar className="w-8 h-8" />,
      title: "Intelligent Scheduling",
      description: "AI-powered appointment system that optimizes your clinic's workflow and reduces wait times."
    },
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: "Secure Patient Communication",
      description: "HIPAA-compliant messaging with end-to-end encryption for confidential doctor-patient conversations."
    },
    {
      icon: <Activity className="w-8 h-8" />,
      title: "Advanced Health Analytics",
      description: "Comprehensive tools to track patient vitals, medication adherence, and treatment progress."
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Data Security & Compliance",
      description: "Military-grade encryption and full regulatory compliance to protect sensitive patient information."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Complete Patient Management",
      description: "Unified platform for patient records, history, and care plans with intelligent insights."
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Preventive Care Tools",
      description: "Proactive health monitoring and AI-driven recommendations for preventive care measures."
    }
  ];

  // Testimonials section data
  const testimonials = [
    {
      quote: "Doctor's Hub transformed our practice. We've reduced administrative work by 70% and improved patient satisfaction scores.",
      author: "Dr. Sarah Johnson",
      position: "Cardiologist, Memorial Health"
    },
    {
      quote: "The patient engagement features have revolutionized how we deliver care. Our patients love the easy communication and appointment management.",
      author: "Dr. Michael Chen",
      position: "Family Medicine, Westside Clinic"
    },
    {
      quote: "The analytics tools help us identify trends and improve outcomes. It's like having a data scientist on staff.",
      author: "Dr. Lisa Rodriguez",
      position: "Pediatrician, Children's Wellness Center"
    }
  ];
  return (
    <div className={`min-h-screen ${darkMode ? "bg-gray-950 text-white" : "bg-white text-gray-900"}`}>
      {/* Enhanced Navigation with gradient and better spacing */}
      <nav className={`fixed w-full z-10 shadow-lg ${darkMode ? "bg-gray-900/90 border-b border-gray-800" : "bg-white/90 border-b border-gray-200"} backdrop-blur-sm`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center"
            >
              <span className={`text-2xl font-bold ${darkMode ? "text-white" : "text-gray-900"} flex items-center`}>
                <Heart className="w-8 h-8 mr-2 text-blue-500" fill="#3b82f6" />
                Doctor's Hub
              </span>
            </motion.div>
            <div className="flex items-center space-x-6">
              <Link
                to="/features"
                className={`px-4 py-2 rounded-md ${darkMode ? "text-gray-300 hover:text-white" : "text-gray-700 hover:text-gray-900"} hover:underline transition-colors duration-300`}
              >
                Features
              </Link>
              <Link
                to="/pricing"
                className={`px-4 py-2 rounded-md ${darkMode ? "text-gray-300 hover:text-white" : "text-gray-700 hover:text-gray-900"} hover:underline transition-colors duration-300`}
              >
                Pricing
              </Link>
              <Link
                to="/about"
                className={`px-4 py-2 rounded-md ${darkMode ? "text-gray-300 hover:text-white" : "text-gray-700 hover:text-gray-900"} hover:underline transition-colors duration-300`}
              >
                About
              </Link>
              <Link
                to="/login"
                className={`px-5 py-2.5 rounded-md ${darkMode ? "bg-gray-800 text-white hover:bg-gray-700" : "bg-gray-100 text-gray-800 hover:bg-gray-200"} transition-colors duration-300`}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-5 py-2.5 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-300 shadow-md hover:shadow-lg"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Enhanced Hero Section with gradient background and medical imagery */}
      <motion.div 
        ref={heroRef}
        className={`pt-40 pb-24 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden ${darkMode ? "bg-gradient-to-br from-gray-900 via-gray-950 to-black" : "bg-gradient-to-br from-blue-50 via-white to-blue-50"}`}
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
        <div className="relative z-10 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className={`text-5xl md:text-6xl font-bold mb-6 ${darkMode ? "text-white" : "text-gray-900"}`}>
              {displayText}
              <span className="inline-block animate-pulse">|</span>
            </h1>
          </motion.div>
          
          <motion.p 
            className={`text-xl md:text-2xl max-w-3xl mx-auto mb-8 ${darkMode ? "text-gray-300" : "text-gray-700"}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Elevate your healthcare practice with our comprehensive digital solution.
            Designed by doctors, for doctors.
          </motion.p>
          
          <motion.div
            className="flex flex-col sm:flex-row justify-center gap-4 mt-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link
              to="/register"
              className="px-8 py-4 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-medium text-lg flex items-center justify-center"
            >
              Get Started Free
              <ChevronRight className="ml-2 w-5 h-5" />
            </Link>
            <Link
              to="/demo"
              className={`px-8 py-4 rounded-lg ${darkMode ? "bg-gray-800 text-white hover:bg-gray-700" : "bg-white text-gray-900 hover:bg-gray-100"} transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-medium text-lg flex items-center justify-center border ${darkMode ? "border-gray-700" : "border-gray-200"}`}
            >
              Watch Demo
            </Link>
          </motion.div>
          
          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="mt-12 flex items-center justify-center space-x-4"
          >
            <div className="flex -space-x-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className={`w-10 h-10 rounded-full ${darkMode ? "bg-gray-800" : "bg-gray-100"} border-2 ${darkMode ? "border-gray-900" : "border-white"} flex items-center justify-center font-medium text-xs`}>
                  {i}
                </div>
              ))}
            </div>
            <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              Trusted by <span className="font-semibold">5,000+</span> healthcare professionals
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Features Section with improved cards and animations */}
      <motion.div 
        className={`py-24 px-4 sm:px-6 lg:px-8 ${darkMode ? "bg-gray-950" : "bg-white"}`}
        variants={staggerChildren}
        initial="initial"
        animate="animate"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>
              Advanced Features for Modern Healthcare
            </h2>
            <p className={`text-xl max-w-3xl mx-auto ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              Everything you need to streamline your practice and provide exceptional patient care.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className={`p-8 rounded-xl ${darkMode ? 
                  "bg-gradient-to-br from-gray-900 to-gray-950 shadow-xl border border-gray-800" : 
                  "bg-gradient-to-br from-white to-gray-50 shadow-xl border border-gray-100"} 
                  hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-blue-900/5`}
                variants={fadeIn}
                whileHover={{ y: -10 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div className="mb-5 text-blue-500 bg-blue-500/10 p-3 rounded-lg inline-block">
                  {feature.icon}
                </div>
                <h3 className={`text-xl font-semibold mb-3 ${darkMode ? "text-white" : "text-gray-900"}`}>
                  {feature.title}
                </h3>
                <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
      {/* Testimonials section */}
      <div className={`py-24 px-4 sm:px-6 lg:px-8 ${darkMode ? "bg-gray-900" : "bg-blue-50"}`}>
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>
              Trusted by Healthcare Professionals
            </h2>
            <p className={`text-xl max-w-3xl mx-auto ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              See what doctors are saying about their experience with Doctor's Hub
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className={`p-8 rounded-xl ${darkMode ? 
                  "bg-gray-800 border border-gray-700" : 
                  "bg-white border border-gray-100"} 
                  shadow-lg hover:shadow-xl transition-all duration-300`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <div className="mb-6 flex">
                  {[1, 2, 3, 4, 5].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-500" fill="#f59e0b" />
                  ))}
                </div>
                <p className={`mb-6 text-lg ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                  "{testimonial.quote}"
                </p>
                <div>
                  <p className={`font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>{testimonial.author}</p>
                  <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>{testimonial.position}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Statistics section */}
      <div className={`py-20 px-4 sm:px-6 lg:px-8 ${darkMode ? "bg-gray-950" : "bg-white"}`}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <p className={`text-4xl font-bold mb-2 text-blue-500`}>5,000+</p>
              <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>Medical Professionals</p>
            </motion.div>
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <p className={`text-4xl font-bold mb-2 text-blue-500`}>1.2M+</p>
              <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>Patients Managed</p>
            </motion.div>
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <p className={`text-4xl font-bold mb-2 text-blue-500`}>98%</p>
              <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>Customer Satisfaction</p>
            </motion.div>
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <p className={`text-4xl font-bold mb-2 text-blue-500`}>30%</p>
              <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>Admin Time Saved</p>
            </motion.div>
          </div>
        </div>
      </div>
      
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
            Join thousands of healthcare professionals who are providing better care
            with less administrative burden.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row justify-center gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link
              to="/register"
              className="px-8 py-4 rounded-lg bg-white text-blue-700 hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-medium text-lg flex items-center justify-center"
            >
              Start Free Trial
              <ChevronRight className="ml-2 w-5 h-5" />
            </Link>
            <Link
              to="/contact"
              className="px-8 py-4 rounded-lg bg-transparent border-2 border-white text-white hover:bg-white/10 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-medium text-lg flex items-center justify-center"
            >
              Schedule a Demo
            </Link>
          </motion.div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className={`py-16 px-4 sm:px-6 lg:px-8 ${darkMode ? "bg-gray-950 border-t border-gray-800" : "bg-gray-50 border-t border-gray-100"}`}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            <div>
              <h3 className={`text-lg font-semibold mb-6 ${darkMode ? "text-white" : "text-gray-900"}`}>Product</h3>
              <ul className="space-y-4">
                <li><Link to="/features" className={`${darkMode ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"}`}>Features</Link></li>
                <li><Link to="/pricing" className={`${darkMode ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"}`}>Pricing</Link></li>
                <li><Link to="/integrations" className={`${darkMode ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"}`}>Integrations</Link></li>
                <li><Link to="/security" className={`${darkMode ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"}`}>Security</Link></li>
              </ul>
            </div>
            <div>
              <h3 className={`text-lg font-semibold mb-6 ${darkMode ? "text-white" : "text-gray-900"}`}>Company</h3>
              <ul className="space-y-4">
                <li><Link to="/about" className={`${darkMode ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"}`}>About Us</Link></li>
                <li><Link to="/careers" className={`${darkMode ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"}`}>Careers</Link></li>
                <li><Link to="/blog" className={`${darkMode ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"}`}>Blog</Link></li>
                <li><Link to="/contact" className={`${darkMode ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"}`}>Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className={`text-lg font-semibold mb-6 ${darkMode ? "text-white" : "text-gray-900"}`}>Resources</h3>
              <ul className="space-y-4">
                <li><Link to="/help" className={`${darkMode ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"}`}>Help Center</Link></li>
                <li><Link to="/docs" className={`${darkMode ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"}`}>Documentation</Link></li>
                <li><Link to="/guides" className={`${darkMode ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"}`}>Guides</Link></li>
                <li><Link to="/webinars" className={`${darkMode ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"}`}>Webinars</Link></li>
              </ul>
            </div>
            <div>
              <h3 className={`text-lg font-semibold mb-6 ${darkMode ? "text-white" : "text-gray-900"}`}>Legal</h3>
              <ul className="space-y-4">
                <li><Link to="/privacy" className={`${darkMode ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"}`}>Privacy Policy</Link></li>
                <li><Link to="/terms" className={`${darkMode ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"}`}>Terms of Service</Link></li>
                <li><Link to="/compliance" className={`${darkMode ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"}`}>Compliance</Link></li>
                <li><Link to="/hipaa" className={`${darkMode ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"}`}>HIPAA</Link></li>
              </ul>
            </div>
          </div>
          
          <div className={`pt-8 mt-8 border-t ${darkMode ? "border-gray-800" : "border-gray-200"} flex flex-col md:flex-row justify-between items-center`}>
            <div className="flex items-center mb-4 md:mb-0">
              <Heart className="w-6 h-6 mr-2 text-blue-500" fill="#3b82f6" />
              <span className={`text-xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>Doctor's Hub</span>
            </div>
            <p className={`text-sm ${darkMode ? "text-gray-500" : "text-gray-600"}`}>
              © {new Date().getFullYear()} Doctor's Hub. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;