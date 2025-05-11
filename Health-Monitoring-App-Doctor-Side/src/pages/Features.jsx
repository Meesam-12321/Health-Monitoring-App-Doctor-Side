import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Features = () => {
  // State to track which feature is selected for more details
  const [activeFeature, setActiveFeature] = useState('monitoring');

  // Features data
  const features = {
    monitoring: {
      title: "Health Monitoring",
      description: "Comprehensive patient health tracking in real-time",
      details: "Monitor vital signs, medication adherence, and chronic condition metrics. Get alerts for concerning changes and view historical data with customizable dashboards and reports.",
      icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" // Document icon path
    },
    appointments: {
      title: "Appointment Management",
      description: "Streamlined scheduling system for patient visits",
      details: "Manage your calendar efficiently with color-coded appointment types, automated reminders, and waitlist management. Reduce no-shows with automatic notifications and enable easy rescheduling for patients.",
      icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" // Calendar icon path
    },
    chat: {
      title: "Patient Chat",
      description: "Secure messaging platform for doctor-patient communication",
      details: "Maintain ongoing communication with patients through HIPAA-compliant messaging. Share lab results, answer quick questions, and provide follow-up care without unnecessary office visits.",
      icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" // Chat icon path
    },
    chatbot: {
      title: "AI Chatbot",
      description: "Intelligent virtual assistant for common patient inquiries",
      details: "Reduce administrative burden with an AI-powered chatbot that handles appointment scheduling, medication reminders, and answers frequently asked questions. Frees up your staff for more complex tasks.",
      icon: "M9.75 13.5l2.25-3l2.25 3m-4.5 0L7.5 18m9-5.25L18.75 18m-2.25-5.25l2.25-3l2.25 3m-9 0l2.25-3m-11.4-3.493a3 3 0 013.09-2.977h.33a3 3 0 012.94 1.49l.394.787a2 2 0 001.72 1.05h.537c1.105 0 2 .895 2 2v.055a2 2 0 001.93 1.995h.62a2 2 0 011.8 2.877l-.22.44a2 2 0 000 1.8l.22.44a2 2 0 01-1.8 2.877h-.62a2 2 0 00-1.93 1.995v.055c0 1.105-.895 2-2 2h-.537a2 2 0 00-1.72 1.05l-.393.787a3 3 0 01-2.94 1.49h-.33a3 3 0 01-3.09-2.977v-.055a2 2 0 00-1.93-1.995h-.62a2 2 0 01-1.8-2.877l.22-.44a2 2 0 000-1.8l-.22-.44a2 2 0 011.8-2.877h.62a2 2 0 001.93-1.995v-.055z" // Robot/gear icon path
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="container mx-auto px-4 py-4">
        <Link 
          to="/"
          className="flex items-center text-blue-600 hover:text-blue-800 transition duration-200"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5 mr-1" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Home
        </Link>
      </div>
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Powerful Features for Modern Healthcare</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Our platform empowers physicians with tools to provide exceptional care, streamline operations, and enhance patient communication.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {Object.entries(features).map(([key, feature]) => (
            <div 
              key={key}
              className={`p-6 rounded-lg shadow-md cursor-pointer transition-all duration-200 ${
                activeFeature === key ? 'bg-blue-50 border-2 border-blue-500' : 'bg-white hover:shadow-lg'
              }`}
              onClick={() => setActiveFeature(key)}
            >
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-6 w-6 text-blue-600" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={feature.icon} />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-800">{feature.title}</h3>
              </div>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Feature Details Section */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex flex-col items-center">
            <div className="w-full mb-6">
              <div className="bg-blue-100 p-6 rounded-xl inline-block mb-4">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-16 w-16 text-blue-600" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={features[activeFeature].icon} />
                </svg>
              </div>
              <h2 className="text-3xl font-bold mb-4 text-gray-800">{features[activeFeature].title}</h2>
              <p className="text-lg text-gray-600 mb-6">{features[activeFeature].details}</p>
              
              {/* Key Benefits */}
              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4 text-gray-800">Key Benefits</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="font-medium">Improved Efficiency</span>
                    </div>
                    <p className="text-gray-600 text-sm ml-7">Save time and streamline your workflow</p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="font-medium">Better Patient Care</span>
                    </div>
                    <p className="text-gray-600 text-sm ml-7">Enhance the quality of care you provide</p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="font-medium">Cost Savings</span>
                    </div>
                    <p className="text-gray-600 text-sm ml-7">Reduce administrative costs and overhead</p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="font-medium">HIPAA Compliant</span>
                    </div>
                    <p className="text-gray-600 text-sm ml-7">Secure and compliant with healthcare regulations</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;