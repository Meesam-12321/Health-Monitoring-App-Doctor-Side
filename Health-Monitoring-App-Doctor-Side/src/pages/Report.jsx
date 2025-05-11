// Report.jsx - Part 1
import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Clipboard, 
  Calendar, 
  Activity, 
  Pill, 
  FileText, 
  PrinterIcon, 
  Share2, 
  Download,
  Clock,
  Phone,
  Mail,
  Heart,
  Shield
} from 'lucide-react';
import { DarkModeContext } from "../Context/DarkModeContext";

const Report = () => {
  const navigate = useNavigate();
  const { darkMode } = useContext(DarkModeContext);

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

  const dummyReport = {
    patientName: 'Aleena Sehar',
    age: 22,
    date: '2025-05-10',
    time: '10:30 AM',
    diagnosis: 'Hypertension',
    treatment: 'Prescribed Amlodipine 5mg daily',
    notes: 'Follow-up in 2 weeks. Monitor blood pressure at home. Patient should maintain a low-sodium diet and exercise regularly.',
    contactInfo: {
      phone: '(555) 123-4567',
      email: 'aleena@example.com'
    },
    vitalSigns: {
      bloodPressure: '140/90 mmHg',
      heartRate: '78 bpm',
      temperature: '98.6°F',
      respiratoryRate: '16/min'
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? "bg-gray-950 text-white" : "bg-gray-50 text-gray-900"}`}>
      {/* Header with back button */}
      <motion.header 
        className={`shadow-sm ${darkMode ? "bg-gray-900" : "bg-white"}`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <button 
            onClick={() => navigate(-1)}
            className={`flex items-center gap-2 ${darkMode ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-800"} transition-colors font-medium`}
          >
            <ArrowLeft size={18} />
            <span>Back</span>
          </button>
          <h1 className={`text-lg font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>Patient Records</h1>
          <div className="w-20"></div> {/* Spacer for centering */}
        </div>
      </motion.header>

      {/* Main content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Report Card */}
        <motion.div 
          className={`rounded-xl overflow-hidden shadow-xl ${darkMode ? "bg-gray-900 border border-gray-800" : "bg-white shadow-md"}`}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className={`border-b ${darkMode ? "border-gray-800 bg-blue-900/30" : "border-gray-200 bg-blue-50"} px-6 py-5`}>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="flex items-center mb-4 md:mb-0">
                <div className={`h-12 w-12 rounded-full flex items-center justify-center ${darkMode ? "bg-blue-900/50" : "bg-blue-100"} mr-4`}>
                  <FileText className={`h-6 w-6 ${darkMode ? "text-blue-300" : "text-blue-700"}`} />
                </div>
                <div>
                  <h2 className={`text-2xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
                    Patient Report
                  </h2>
                  <p className={`${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                    Medical evaluation and treatment plan
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${darkMode ? "bg-blue-900/50 text-blue-200" : "bg-blue-100 text-blue-800"}`}>
                  Medical Record
                </span>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${darkMode ? "bg-green-900/50 text-green-200" : "bg-green-100 text-green-800"}`}>
                  Verified
                </span>
              </div>
            </div>
          </div>

          <div className="grid gap-0 md:grid-cols-2">
            {/* Patient Info Section */}
            <motion.div 
              className={`p-6 ${darkMode ? "bg-gray-800/50" : "bg-white"}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className={`mb-8 pb-6 border-b ${darkMode ? "border-gray-700" : "border-gray-100"}`}>
                <h3 className={`text-lg font-semibold mb-4 ${darkMode ? "text-blue-300" : "text-blue-700"}`}>
                  Patient Information
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className={`flex items-start gap-3 p-4 rounded-lg ${darkMode ? "bg-gray-900/80" : "bg-gray-50"}`}>
                    <div className={`mt-1 ${darkMode ? "text-blue-400" : "text-blue-600"}`}>
                      <Clipboard size={20} />
                    </div>
                    <div>
                      <span className={`block text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Patient Name</span>
                      <span className={`block text-lg font-medium ${darkMode ? "text-white" : "text-gray-900"}`}>{dummyReport.patientName}</span>
                    </div>
                  </div>

                  <div className={`flex items-start gap-3 p-4 rounded-lg ${darkMode ? "bg-gray-900/80" : "bg-gray-50"}`}>
                    <div className={`mt-1 ${darkMode ? "text-blue-400" : "text-blue-600"}`}>
                      <Calendar size={20} />
                    </div>
                    <div>
                      <span className={`block text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Age</span>
                      <span className={`block text-lg font-medium ${darkMode ? "text-white" : "text-gray-900"}`}>{dummyReport.age} years</span>
                    </div>
                  </div>

                  <div className={`flex items-start gap-3 p-4 rounded-lg ${darkMode ? "bg-gray-900/80" : "bg-gray-50"}`}>
                    <div className={`mt-1 ${darkMode ? "text-blue-400" : "text-blue-600"}`}>
                      <Calendar size={20} />
                    </div>
                    <div>
                      <span className={`block text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Date</span>
                      <span className={`block text-lg font-medium ${darkMode ? "text-white" : "text-gray-900"}`}>{dummyReport.date}</span>
                    </div>
                  </div>

                  <div className={`flex items-start gap-3 p-4 rounded-lg ${darkMode ? "bg-gray-900/80" : "bg-gray-50"}`}>
                    <div className={`mt-1 ${darkMode ? "text-blue-400" : "text-blue-600"}`}>
                      <Clock size={20} />
                    </div>
                    <div>
                      <span className={`block text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Time</span>
                      <span className={`block text-lg font-medium ${darkMode ? "text-white" : "text-gray-900"}`}>{dummyReport.time}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className={`text-lg font-semibold mb-4 ${darkMode ? "text-blue-300" : "text-blue-700"}`}>
                  Contact Information
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className={`flex items-start gap-3 p-4 rounded-lg ${darkMode ? "bg-gray-900/80" : "bg-gray-50"}`}>
                    <div className={`mt-1 ${darkMode ? "text-blue-400" : "text-blue-600"}`}>
                      <Phone size={20} />
                    </div>
                    <div>
                      <span className={`block text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Phone</span>
                      <span className={`block text-lg font-medium ${darkMode ? "text-white" : "text-gray-900"}`}>{dummyReport.contactInfo.phone}</span>
                    </div>
                  </div>

                  <div className={`flex items-start gap-3 p-4 rounded-lg ${darkMode ? "bg-gray-900/80" : "bg-gray-50"}`}>
                    <div className={`mt-1 ${darkMode ? "text-blue-400" : "text-blue-600"}`}>
                      <Mail size={20} />
                    </div>
                    <div>
                      <span className={`block text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Email</span>
                      <span className={`block text-lg font-medium ${darkMode ? "text-white" : "text-gray-900"}`}>{dummyReport.contactInfo.email}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            {/* Medical Info & Treatment Section */}
            <motion.div 
              className={`p-6 ${darkMode ? "bg-gray-800" : "bg-gray-50"}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className={`mb-8 pb-6 border-b ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
                <h3 className={`text-lg font-semibold mb-4 ${darkMode ? "text-blue-300" : "text-blue-700"}`}>
                  Medical Assessment
                </h3>
                
                <div className={`p-4 rounded-lg mb-6 ${darkMode ? "bg-gray-900/80" : "bg-white"} shadow-sm`}>
                  <div className="flex items-start gap-3">
                    <div className={`mt-1 ${darkMode ? "text-blue-400" : "text-blue-600"}`}>
                      <Activity size={20} />
                    </div>
                    <div>
                      <span className={`block text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Diagnosis</span>
                      <span className={`block text-lg font-medium ${darkMode ? "text-white" : "text-gray-900"}`}>{dummyReport.diagnosis}</span>
                    </div>
                  </div>
                </div>
                
                <h4 className={`text-md font-medium mb-3 ${darkMode ? "text-gray-200" : "text-gray-700"}`}>Vital Signs</h4>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className={`p-3 rounded-lg ${darkMode ? "bg-gray-900" : "bg-white"} shadow-sm`}>
                    <div className={`text-xs uppercase font-medium mb-1 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Blood Pressure</div>
                    <div className={`text-base font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>{dummyReport.vitalSigns.bloodPressure}</div>
                  </div>
                  
                  <div className={`p-3 rounded-lg ${darkMode ? "bg-gray-900" : "bg-white"} shadow-sm`}>
                    <div className={`text-xs uppercase font-medium mb-1 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Heart Rate</div>
                    <div className={`text-base font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>{dummyReport.vitalSigns.heartRate}</div>
                  </div>
                  
                  <div className={`p-3 rounded-lg ${darkMode ? "bg-gray-900" : "bg-white"} shadow-sm`}>
                    <div className={`text-xs uppercase font-medium mb-1 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Temperature</div>
                    <div className={`text-base font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>{dummyReport.vitalSigns.temperature}</div>
                  </div>
                  
                  <div className={`p-3 rounded-lg ${darkMode ? "bg-gray-900" : "bg-white"} shadow-sm`}>
                    <div className={`text-xs uppercase font-medium mb-1 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Respiratory Rate</div>
                    <div className={`text-base font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>{dummyReport.vitalSigns.respiratoryRate}</div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className={`text-lg font-semibold mb-4 ${darkMode ? "text-blue-300" : "text-blue-700"}`}>
                  Treatment Plan
                </h3>
                
                <div className={`p-4 rounded-lg mb-6 ${darkMode ? "bg-gray-900/80" : "bg-white"} shadow-sm`}>
                  <div className="flex items-start gap-3">
                    <div className={`mt-1 ${darkMode ? "text-blue-400" : "text-blue-600"}`}>
                      <Pill size={20} />
                    </div>
                    <div>
                      <span className={`block text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Prescribed Treatment</span>
                      <span className={`block text-lg font-medium ${darkMode ? "text-white" : "text-gray-900"}`}>{dummyReport.treatment}</span>
                    </div>
                  </div>
                </div>
                
                <div className={`p-4 rounded-lg ${darkMode ? "bg-gray-900/80" : "bg-white"} shadow-sm`}>
                  <div className="flex items-start gap-3">
                    <div className={`mt-1 ${darkMode ? "text-blue-400" : "text-blue-600"}`}>
                      <FileText size={20} />
                    </div>
                    <div>
                      <span className={`block text-sm ${darkMode ? "text-gray-400" : "text-gray-500"} mb-1`}>Clinical Notes</span>
                      <p className={darkMode ? "text-gray-300" : "text-gray-800"}>{dummyReport.notes}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Actions Footer */}
          <motion.div 
            className={`px-6 py-5 flex flex-wrap justify-end gap-3 border-t ${darkMode ? "bg-gray-900 border-gray-800" : "bg-gray-50 border-gray-200"}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <button className={`inline-flex items-center gap-2 px-4 py-2 border rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              darkMode 
                ? "border-gray-600 text-gray-300 hover:bg-gray-800 focus:ring-blue-500" 
                : "border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-blue-500"
            }`}>
              <Download size={16} />
              Download
            </button>
            <button className={`inline-flex items-center gap-2 px-4 py-2 border rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              darkMode 
                ? "border-gray-600 text-gray-300 hover:bg-gray-800 focus:ring-blue-500" 
                : "border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-blue-500"
            }`}>
              <PrinterIcon size={16} />
              Print Report
            </button>
            <button className={`inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              darkMode 
                ? "bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500" 
                : "bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500"
            }`}>
              <Share2 size={16} />
              Send to Patient
            </button>
          </motion.div>
        </motion.div>
        
        {/* Additional Health Recommendations Section */}
        <motion.div
          className={`mt-8 p-6 rounded-xl shadow-md ${darkMode ? "bg-gray-900 border border-gray-800" : "bg-white"}`}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <h3 className={`text-xl font-semibold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>Health Recommendations</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className={`p-4 rounded-lg ${darkMode ? "bg-gray-800" : "bg-gray-50"}`}>
              <div className={`mb-3 ${darkMode ? "text-blue-400" : "text-blue-600"}`}>
                <Heart />
              </div>
              <h4 className={`font-medium mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>Lifestyle Changes</h4>
              <p className={darkMode ? "text-gray-400" : "text-gray-600"}>Regular exercise for 30 minutes daily. Maintain a balanced, low-sodium diet rich in fruits and vegetables.</p>
            </div>
            
            <div className={`p-4 rounded-lg ${darkMode ? "bg-gray-800" : "bg-gray-50"}`}>
              <div className={`mb-3 ${darkMode ? "text-blue-400" : "text-blue-600"}`}>
                <Activity />
              </div>
              <h4 className={`font-medium mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>Monitoring</h4>
              <p className={darkMode ? "text-gray-400" : "text-gray-600"}>Check blood pressure twice daily and record readings. Report any readings above 150/95 mmHg immediately.</p>
            </div>
            
            <div className={`p-4 rounded-lg ${darkMode ? "bg-gray-800" : "bg-gray-50"}`}>
              <div className={`mb-3 ${darkMode ? "text-blue-400" : "text-blue-600"}`}>
                <Shield />
              </div>
              <h4 className={`font-medium mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>Next Steps</h4>
              <p className={darkMode ? "text-gray-400" : "text-gray-600"}>Schedule follow-up appointment in two weeks. Complete blood work one week before your next visit.</p>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Report;