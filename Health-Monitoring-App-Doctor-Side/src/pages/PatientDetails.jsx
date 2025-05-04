// import React, { useState, useEffect } from 'react';
// import { Bell, Calendar, ChevronDown, AlertCircle, User, Settings, Heart, Activity, LineChart, Clipboard, MessageSquare, FilePlus, Clock, TrendingUp, TrendingDown, Pill, FileText } from 'lucide-react';

import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Bell, Calendar, ChevronDown, AlertCircle, User, Settings, Heart, Activity, LineChart as LineChartIcon, Clipboard, MessageSquare, FilePlus, Clock, TrendingUp, TrendingDown, Pill, FileText, X } from 'lucide-react';

// Utility function to generate mock historical data
const generateMockHistoricalData = (currentValue, min, max, hours = 24) => {
  const data = [];
  let value = currentValue;
  
  // Generate data points for the last 24 hours (one per hour)
  for (let i = hours; i >= 0; i--) {
    // Create some natural-looking fluctuations
    const fluctuation = Math.random() * 4 - 2; // Random value between -2 and 2
    value = Math.max(min, Math.min(max, value + fluctuation));
    
    data.push({
      time: `${i}h ago`,
      value: Math.round(value * 10) / 10,
    });
  }
  
  return data;
};
// Simulated patient data
const patients = [
  {
    id: "P-12345",
    name: "Aleena Sehar",
    age: 21,
    gender: "Female",
    roomNumber: "304-B",
    admissionDate: "2025-04-10",
    primaryDoctor: "Dr. Ayesha",
    diagnosis: "Hypertension, Type 2 Diabetes",
    heartRate: { current: 78, min: 65, max: 88, trend: "stable" },
    bloodOxygen: { current: 97, min: 95, max: 99, trend: "stable" },
    bloodPressure: { systolic: 122, diastolic: 82, trend: "improving" },
    healthScore: 88,
    status: "Normal",
    lastAnomaly: null,
    confidence: null,
    medications: ["Metformin 500mg", "Lisinopril 10mg"],
    notes: [
      { date: "2025-04-16", text: "Patient reports feeling better. Blood pressure stabilizing.", author: "Dr. Ayesha" },
      { date: "2025-04-14", text: "Adjusted medication dosage. Monitor for side effects.", author: "Dr. Noor" }
    ],
    upcomingAppointments: [
      { date: "2025-04-20", time: "10:30 AM", type: "Follow-up" },
      { date: "2025-04-25", time: "2:15 PM", type: "Lab Work" }
    ],
    recentTests: [
      { name: "A1C", date: "2025-04-12", result: "7.2%", status: "High" },
      { name: "Cholesterol Panel", date: "2025-04-12", result: "195 mg/dL", status: "Normal" }
    ]
  },
  {
    id: "P-67890",
    name: "Michael Chen",
    age: 65,
    gender: "Male",
    roomNumber: "218-A",
    admissionDate: "2025-04-15",
    primaryDoctor: "Dr. Williams",
    diagnosis: "Post-Operative Recovery, Coronary Artery Disease",
    heartRate: { current: 95, min: 78, max: 102, trend: "fluctuating" },
    bloodOxygen: { current: 92, min: 90, max: 95, trend: "declining" },
    bloodPressure: { systolic: 142, diastolic: 90, trend: "worsening" },
    healthScore: 65,
    status: "At Risk",
    lastAnomaly: "2025-04-17T10:23:45",
    confidence: 83,
    medications: ["Aspirin 81mg", "Atorvastatin 20mg", "Metoprolol 25mg"],
    notes: [
      { date: "2025-04-17", text: "Patient experiencing increased fatigue. Monitor BP closely.", author: "Dr. Williams" },
      { date: "2025-04-16", text: "Wound healing well. Continue current medication regimen.", author: "Dr. Patel" }
    ],
    upcomingAppointments: [
      { date: "2025-04-18", time: "9:00 AM", type: "Wound Check" },
      { date: "2025-04-23", time: "11:45 AM", type: "Cardiology Consult" }
    ],
    recentTests: [
      { name: "EKG", date: "2025-04-16", result: "Abnormal", status: "Review" },
      { name: "CBC", date: "2025-04-16", result: "WBC 11.2", status: "High" }
    ]
  }
];

// Trend indicator component
const TrendIndicator = ({ trend }) => {
  if (trend === "improving" || trend === "stable") {
    return <TrendingUp size={16} className="text-green-500" />;
  } else if (trend === "worsening" || trend === "declining") {
    return <TrendingDown size={16} className="text-red-500" />;
  } else if (trend === "fluctuating") {
    return <Activity size={16} className="text-yellow-500" />;
  }
  return null;
};

// Enhanced Health Score Component with animation and interactivity
const HealthScore = ({ score }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [historicalData, setHistoricalData] = useState([]);
  
  useEffect(() => {
    const data = generateMockHistoricalData(score, 0, 100, 30);
    setHistoricalData(data);
  }, [score]);


  const getColor = () => {
    if (score >= 80) return "text-green-500";
    if (score >= 60) return "text-yellow-500";
    return "text-red-500";
  };
  
  const getBackgroundColor = () => {
    if (score >= 80) return "bg-green-100";
    if (score >= 60) return "bg-yellow-100";
    return "bg-red-100";
  };
  
  const getMessage = () => {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Warning";
    return "Critical";
  };
  
  const getDetailedMessage = () => {
    if (score >= 80) return "Patient is in stable condition with all vitals within normal ranges.";
    if (score >= 60) return "Patient requires monitoring due to some vitals outside normal ranges.";
    return "Patient requires immediate attention with multiple critical values.";
  };
  
  // Calculate stroke dash values
  const circumference = 2 * Math.PI * 45; // radius is 45
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (score / 100) * circumference;
  
  return (
    <div className="flex flex-col p-4 bg-white rounded-lg shadow-md">
      <h3 className="text-gray-700 font-semibold mb-3">Overall Health Score</h3>
      <div className="flex">
        <div className="relative w-28 h-28 flex items-center justify-center">
          {/* Background circle */}
          <svg className="w-full h-full -rotate-90 absolute" viewBox="0 0 100 100">
            <circle 
              cx="50" cy="50" r="45" 
              fill="none" 
              stroke="#e5e7eb" 
              strokeWidth="8"
            />
            {/* Score indicator with animation */}
            <circle 
              cx="50" cy="50" r="45" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="8"
              className={`${getColor()} transition-all duration-1000`}
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
            >
              <animate 
                attributeName="stroke-dashoffset"
                from={circumference}
                to={strokeDashoffset}
                dur="1s"
                begin="0s"
                fill="freeze"
              />
            </circle>
          </svg>
          <div className="flex flex-col items-center">
            <span className={`text-3xl font-bold ${getColor()} transition-all duration-500`}>{score}</span>
            <span className={`text-sm font-medium ${getColor()}`}>{getMessage()}</span>
          </div>
        </div>
        
        <div className="ml-6 flex-1">
          <p className="text-gray-600 mb-2">{getDetailedMessage()}</p>
          
          <div className="mt-2">
            <div className="text-sm text-gray-700 font-medium mb-1">Health Metrics:</div>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center">
                <div className={`w-3 h-3 rounded-full ${score >= 80 ? 'bg-green-500' : score >= 60 ? 'bg-yellow-500' : 'bg-red-500'} mr-2`}></div>
                <span className="text-sm text-gray-600">Current Score: {score}/100</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                <span className="text-sm text-gray-600">30-Day Avg: {score - 3}/100</span>
              </div>
            </div>
          </div>
          
          <div className="mt-4 flex justify-between">
            <button 
              className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
              onClick={() => setShowDetails(!showDetails)}
            >
              <LineChartIcon size={16} className="mr-1" /> 
              {showDetails ? 'Hide History' : 'View History'}
            </button>
            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center">
              <FileText size={16} className="mr-1" /> Full Report
            </button>
          </div>
        </div>
      </div>
      
      {/* Historical health score chart */}
      {showDetails && (
        <div className="mt-4 pt-4 border-t">
          <div className="flex justify-between items-center mb-2">
            <h4 className="text-sm font-medium text-gray-700">30-Day Health Score History</h4>
            <button 
              className="text-gray-500 hover:text-gray-700" 
              onClick={() => setShowDetails(false)}
            >
              <X size={16} />
            </button>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={historicalData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis 
                  dataKey="day" 
                  tick={{ fontSize: 10 }}
                  interval="preserveStartEnd"
                />
                <YAxis 
                  domain={[0, 100]}
                  ticks={[0, 20, 40, 60, 80, 100]}
                  tick={{ fontSize: 10 }}
                />
                <Tooltip 
                  formatter={(value) => [`${value}/100`, 'Health Score']}
                  labelFormatter={(label) => `${label}`}
                />
                
                {/* Zone indicators */}
                <rect x="0%" y={80} width="100%" height={20} fill="#d1fae5" fillOpacity={0.3} />
                <rect x="0%" y={60} width="100%" height={20} fill="#fef3c7" fillOpacity={0.3} />
                <rect x="0%" y={0} width="100%" height={60} fill="#fee2e2" fillOpacity={0.3} />
                
                <Line 
                  type="monotone" 
                  dataKey="score" 
                  stroke={
                    score >= 80 ? "#10b981" : 
                    score >= 60 ? "#f59e0b" : "#ef4444"
                  }
                  strokeWidth={2}
                  dot={{ 
                    r: 3, 
                    fill: (entry) => {
                      const val = entry.score;
                      return val >= 80 ? "#10b981" : val >= 60 ? "#f59e0b" : "#ef4444";
                    }
                  }}
                  activeDot={{ r: 5, stroke: '#FFF', strokeWidth: 2 }}
                  isAnimationActive={true}
                  animationDuration={1500}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-between mt-2 text-xs">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-green-500 mr-1"></div>
              <span>Excellent (80-100)</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-yellow-500 mr-1"></div>
              <span>Warning (60-79)</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-red-500 mr-1"></div>
              <span>Critical (0-59)</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
// Anomaly Detection Component
const AnomalyDetection = ({ status, lastAnomaly, confidence }) => {
  const isAtRisk = status === "At Risk";
  
  return (
    <div className={`p-4 rounded-lg shadow-md ${isAtRisk ? 'bg-red-50 border border-red-200' : 'bg-green-50 border border-green-200'}`}>
      <div className="flex items-center mb-3">
        <AlertCircle className={isAtRisk ? 'text-red-500 mr-2' : 'text-green-500 mr-2'} size={20} />
        <h3 className="font-semibold">AI-Powered Anomaly Detection</h3>
      </div>
      
      <div className="flex items-center mb-3">
        <span className="font-medium">Status:</span>
        <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${isAtRisk ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
          {status}
        </span>
      </div>
      
      {isAtRisk && (
        <>
          <div className="text-sm mb-3">
            <span className="font-medium">Anomalous Patterns Detected:</span>
            <ul className="mt-1 pl-5 list-disc space-y-1">
              <li className="text-gray-700">Elevated heart rate with fluctuating blood pressure</li>
              <li className="text-gray-700">Declining blood oxygen after activity</li>
              <li className="text-gray-700">Irregular cardiac rhythm detected in last 6 hours</li>
            </ul>
          </div>
          
          <div className="text-sm mb-3">
            <span className="font-medium">Recommended Actions:</span>
            <ul className="mt-1 pl-5 list-disc space-y-1">
              <li className="text-gray-700">Increase vital sign monitoring frequency</li>
              <li className="text-gray-700">Consider cardiology consultation</li>
              <li className="text-gray-700">Review current medication regimen</li>
            </ul>
          </div>
          
          {lastAnomaly && (
            <div className="text-sm mb-3">
              <span className="font-medium">Last Detected:</span>
              <p className="text-gray-700 mt-1 flex items-center">
                <Clock size={14} className="mr-1" />
                {new Date(lastAnomaly).toLocaleString()}
              </p>
            </div>
          )}
          
          {confidence && (
            <div className="text-sm mb-3">
              <span className="font-medium">AI Confidence Score:</span>
              <div className="flex items-center mt-1">
                <div className="h-2 flex-1 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-500 rounded-full" 
                    style={{ width: `${confidence}%` }}
                  ></div>
                </div>
                <span className="ml-2 text-xs font-medium">{confidence}%</span>
              </div>
            </div>
          )}
          
          <button className="mt-2 w-full py-2 bg-red-100 hover:bg-red-200 text-red-700 font-medium rounded-md flex items-center justify-center">
            <AlertCircle size={16} className="mr-2" />
            Send Alert to Medical Team
          </button>
        </>
      )}
      
      {!isAtRisk && (
        <>
          <div className="text-sm mb-4">
            <p className="text-gray-700">
              No anomalies detected in the patient's vital signs over the past 24 hours.
              The AI system continuously monitors for irregular patterns across all health metrics.
            </p>
          </div>
          
          <div className="text-sm mb-3">
            <span className="font-medium">Recent Analysis:</span>
            <ul className="mt-1 pl-5 list-disc space-y-1">
              <li className="text-gray-700">All vital signs within expected ranges</li>
              <li className="text-gray-700">Medication response appears effective</li>
              <li className="text-gray-700">Sleep patterns normal based on overnight monitoring</li>
            </ul>
          </div>
          
          <div className="bg-blue-50 p-3 rounded-md text-sm text-blue-700 flex items-start mt-3">
            <AlertCircle size={18} className="mr-2 mt-0.5 flex-shrink-0" />
            <p>AI system last updated health baselines on April 15, 2025. Continuous monitoring active.</p>
          </div>
        </>
      )}
    </div>
  );
};

// Component for circular vitals indicator
// Enhanced VitalIndicator Component with interactivity
const VitalIndicator = ({ title, value, unit, normal, warning, critical, showRange = true, trend, min, max }) => {
  const [showHistory, setShowHistory] = useState(false);
  const [historicalData, setHistoricalData] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);
  
  useEffect(() => {
    // Generate history data when component mounts
    setHistoricalData(generateMockHistoricalData(value.current, min || normal.min - 10, max || critical.max + 10));
    
    // Set up pulse animation that repeats
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 1000);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  const getColor = () => {
    if (value.current <= normal.max && value.current >= normal.min) return "text-green-500";
    if (value.current <= warning.max && value.current >= warning.min) return "text-yellow-500";
    return "text-red-500";
  };
  
  const getBackgroundColor = () => {
    if (value.current <= normal.max && value.current >= normal.min) return "bg-green-100";
    if (value.current <= warning.max && value.current >= warning.min) return "bg-yellow-100";
    return "bg-red-100";
  };
  
  // Calculate percentage for the indicator (how full the ring should be)
  const minValue = Math.min(normal.min, warning.min, critical.min);
  const maxValue = Math.max(normal.max, warning.max, critical.max);
  const percentage = ((value.current - minValue) / (maxValue - minValue)) * 100;
  
  // Calculate stroke dash values
  const circumference = 2 * Math.PI * 45; // radius is 45
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  
  return (
    <div className="flex flex-col p-4 bg-white rounded-lg shadow-md">
      <h3 className="text-gray-700 font-semibold mb-3">{title}</h3>
      <div className="flex items-center">
        <div className={`relative w-28 h-28 flex-shrink-0 ${isAnimating ? 'animate-pulse' : ''}`}>
          {/* Background circle */}
          <svg className="w-full h-full -rotate-90 absolute" viewBox="0 0 100 100">
            <circle 
              cx="50" cy="50" r="45" 
              fill="none" 
              stroke="#e5e7eb" 
              strokeWidth="8"
            />
            {/* Green zone */}
            <circle 
              cx="50" cy="50" r="45" 
              fill="none" 
              stroke="#d1fae5" 
              strokeWidth="8"
              strokeDasharray={`${(normal.max - normal.min) / (maxValue - minValue) * circumference} ${circumference}`}
              strokeDashoffset={circumference - ((normal.min - minValue) / (maxValue - minValue)) * circumference}
            />
            {/* Yellow zone */}
            <circle 
              cx="50" cy="50" r="45" 
              fill="none" 
              stroke="#fef3c7" 
              strokeWidth="8"
              strokeDasharray={`${(warning.max - warning.min) / (maxValue - minValue) * circumference} ${circumference}`}
              strokeDashoffset={circumference - ((warning.min - minValue) / (maxValue - minValue)) * circumference}
            />
            {/* Red zone */}
            <circle 
              cx="50" cy="50" r="45" 
              fill="none" 
              stroke="#fee2e2" 
              strokeWidth="8"
              strokeDasharray={`${(critical.max - critical.min) / (maxValue - minValue) * circumference} ${circumference}`}
              strokeDashoffset={circumference - ((critical.min - minValue) / (maxValue - minValue)) * circumference}
            />
            {/* Value indicator with animation */}
            <circle 
              cx="50" cy="50" r="45" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="8"
              className={`${getColor()} transition-all duration-1000`}
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={`text-2xl font-bold ${getColor()} transition-all duration-500`}>{value.current}</span>
            <span className="text-xs text-gray-500">{unit}</span>
          </div>
        </div>
        
        <div className="ml-4 flex-1">
          <div className="mb-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium text-gray-700">Current Status</span>
              <div className="flex items-center">
                <span className="text-sm text-gray-600 mr-1">Trend:</span>
                <TrendIndicator trend={value.trend} />
              </div>
            </div>
            <div className={`px-2 py-1 rounded-md text-sm ${getBackgroundColor()} ${getColor().replace('text', 'border')} border`}>
              {value.current <= normal.max && value.current >= normal.min ? 'Normal' : 
               value.current <= warning.max && value.current >= warning.min ? 'Caution' : 'Critical'}
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-2 mb-3">
            <div className="text-center">
              <div className="text-xs text-gray-500">24h Min</div>
              <div className="font-medium text-sm">{value.min}</div>
            </div>
            <div className="text-center">
              <div className="text-xs text-gray-500">Current</div>
              <div className={`font-bold text-sm ${getColor()}`}>{value.current}</div>
            </div>
            <div className="text-center">
              <div className="text-xs text-gray-500">24h Max</div>
              <div className="font-medium text-sm">{value.max}</div>
            </div>
          </div>
          
          <div className="text-xs text-gray-500 flex justify-between">
            <span>Normal Range: {normal.min}-{normal.max} {unit}</span>
            <button 
              className="text-blue-600 hover:text-blue-800 text-xs flex items-center"
              onClick={() => setShowHistory(!showHistory)}
            >
              <LineChartIcon size={12} className="mr-1" /> 
              {showHistory ? 'Hide History' : 'Show History'}
            </button>
          </div>
        </div>
      </div>
      
      {/* Historical data chart (conditionally rendered) */}
      {showHistory && (
        <div className="mt-4 border-t pt-4">
          <div className="flex justify-between items-center mb-2">
            <h4 className="text-sm font-medium text-gray-700">24-Hour History</h4>
            <button 
              className="text-gray-500 hover:text-gray-700" 
              onClick={() => setShowHistory(false)}
            >
              <X size={16} />
            </button>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={historicalData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="time" tick={{ fontSize: 10 }} />
                <YAxis 
                  domain={[
                    Math.floor(Math.min(...historicalData.map(d => d.value)) - 2), 
                    Math.ceil(Math.max(...historicalData.map(d => d.value)) + 2)
                  ]}
                  tick={{ fontSize: 10 }}
                />
                <Tooltip 
                  formatter={(value) => [`${value} ${unit}`, 'Value']}
                  labelFormatter={(label) => `Time: ${label}`}
                />
                
                {/* Add reference lines for normal/warning ranges */}
                <line 
                  x1="0%" y1={normal.min} x2="100%" y2={normal.min} 
                  stroke="#10b981" strokeWidth={1} strokeDasharray="5 5" 
                />
                <line 
                  x1="0%" y1={normal.max} x2="100%" y2={normal.max} 
                  stroke="#10b981" strokeWidth={1} strokeDasharray="5 5" 
                />
                
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke={
                    value.current <= normal.max && value.current >= normal.min ? "#10b981" : 
                    value.current <= warning.max && value.current >= warning.min ? "#f59e0b" : "#ef4444"
                  } 
                  strokeWidth={2}
                  dot={{ r: 3 }}
                  activeDot={{ r: 5, stroke: '#FFF', strokeWidth: 2 }}
                  isAnimationActive={true}
                  animationDuration={1000}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
};

// Blood Pressure Component
// Enhanced Blood Pressure Component with interactivity
const BloodPressure = ({ systolic, diastolic, trend }) => {
  const [showHistory, setShowHistory] = useState(false);
  const [historicalData, setHistoricalData] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);
  
  useEffect(() => {
    // Generate two sets of historical data for systolic and diastolic
    const systolicHistory = generateMockHistoricalData(systolic, 100, 160);
    const diastolicHistory = generateMockHistoricalData(diastolic, 60, 100);
    
    // Combine them into a single dataset
    const combined = systolicHistory.map((item, index) => ({
      time: item.time,
      systolic: item.value,
      diastolic: diastolicHistory[index].value
    }));
    
    setHistoricalData(combined);
    
    // Set up pulse animation that repeats
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 1000);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  const getSystolicColor = () => {
    if (systolic < 120) return "text-blue-500";
    if (systolic < 140) return "text-yellow-500";
    return "text-red-500";
  };
  
  const getDiastolicColor = () => {
    if (diastolic < 80) return "text-blue-500";
    if (diastolic < 90) return "text-yellow-500";
    return "text-red-500";
  };
  
  const getStatusBackground = () => {
    if (systolic < 120 && diastolic < 80) return "bg-green-100 border-green-500";
    if (systolic < 140 && diastolic < 90) return "bg-yellow-100 border-yellow-500";
    return "bg-red-100 border-red-500";
  };
  
  const getStatusText = () => {
    if (systolic < 120 && diastolic < 80) return "Normal";
    if (systolic < 140 && diastolic < 90) return "Elevated";
    return "Hypertension";
  };
  
  return (
    <div className="flex flex-col p-4 bg-white rounded-lg shadow-md">
      <h3 className="text-gray-700 font-semibold mb-3">Blood Pressure</h3>
      <div className="flex">
        <div className={`bg-blue-50 rounded-lg p-3 flex items-center justify-center flex-shrink-0 w-28 h-28 ${isAnimating ? 'animate-pulse' : ''}`}>
          <div className="flex items-center">
            <div className="flex flex-col items-center">
              <span className="text-sm text-gray-500">Systolic</span>
              <span className={`text-2xl font-bold ${getSystolicColor()} transition-all duration-500`}>{systolic}</span>
            </div>
            <div className="text-xl font-bold text-gray-400 mx-1">/</div>
            <div className="flex flex-col items-center">
              <span className="text-sm text-gray-500">Diastolic</span>
              <span className={`text-2xl font-bold ${getDiastolicColor()} transition-all duration-500`}>{diastolic}</span>
            </div>
          </div>
        </div>
        
        <div className="ml-4 flex-1">
          <div className="mb-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium text-gray-700">Current Status</span>
              <div className="flex items-center">
                <span className="text-sm text-gray-600 mr-1">Trend:</span>
                <TrendIndicator trend={trend} />
              </div>
            </div>
            <div className={`px-2 py-1 rounded-md text-sm border ${getStatusBackground()}`}>
              {getStatusText()}
            </div>
          </div>
          
          <div className="mb-3 text-sm">
            <div className="flex items-center mb-1.5">
              <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
              <span className="text-gray-600">Normal: &lt;120/&lt;80 mmHg</span>
            </div>
            <div className="flex items-center mb-1.5">
              <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
              <span className="text-gray-600">Elevated: 120-139/80-89 mmHg</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
              <span className="text-gray-600">Hypertension: ≥140/≥90 mmHg</span>
            </div>
          </div>
          
          <div className="flex justify-between text-xs mt-1">
            <span className="text-gray-500">Last reading: 35 min ago</span>
            <button 
              className="text-blue-600 hover:text-blue-800 text-xs flex items-center"
              onClick={() => setShowHistory(!showHistory)}
            >
              <LineChartIcon size={12} className="mr-1" /> 
              {showHistory ? 'Hide History' : 'Show History'}
            </button>
          </div>
        </div>
      </div>
      
      {/* Historical data chart (conditionally rendered) */}
      {showHistory && (
        <div className="mt-4 border-t pt-4">
          <div className="flex justify-between items-center mb-2">
            <h4 className="text-sm font-medium text-gray-700">24-Hour Blood Pressure History</h4>
            <button 
              className="text-gray-500 hover:text-gray-700" 
              onClick={() => setShowHistory(false)}
            >
              <X size={16} />
            </button>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={historicalData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="time" tick={{ fontSize: 10 }} />
                <YAxis 
                  domain={[
                    Math.min(60, Math.min(...historicalData.map(d => d.diastolic)) - 5), 
                    Math.max(160, Math.max(...historicalData.map(d => d.systolic)) + 5)
                  ]}
                  tick={{ fontSize: 10 }}
                />
                <Tooltip 
                  formatter={(value, name) => [`${value} mmHg`, name.charAt(0).toUpperCase() + name.slice(1)]}
                  labelFormatter={(label) => `Time: ${label}`}
                />
                
                {/* Reference lines for BP ranges */}
                <line x1="0%" y1={120} x2="100%" y2={120} stroke="#f59e0b" strokeWidth={1} strokeDasharray="5 5" />
                <line x1="0%" y1={140} x2="100%" y2={140} stroke="#ef4444" strokeWidth={1} strokeDasharray="5 5" />
                <line x1="0%" y1={80} x2="100%" y2={80} stroke="#f59e0b" strokeWidth={1} strokeDasharray="5 5" />
                <line x1="0%" y1={90} x2="100%" y2={90} stroke="#ef4444" strokeWidth={1} strokeDasharray="5 5" />
                
                <Line 
                  type="monotone" 
                  dataKey="systolic" 
                  stroke="#2563eb" 
                  strokeWidth={2}
                  dot={{ r: 3 }}
                  activeDot={{ r: 5, stroke: '#FFF', strokeWidth: 2 }}
                  isAnimationActive={true}
                  animationDuration={1000}
                  name="Systolic"
                />
                <Line 
                  type="monotone" 
                  dataKey="diastolic" 
                  stroke="#7c3aed" 
                  strokeWidth={2}
                  dot={{ r: 3 }}
                  activeDot={{ r: 5, stroke: '#FFF', strokeWidth: 2 }}
                  isAnimationActive={true}
                  animationDuration={1000}
                  name="Diastolic"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-between mt-2 text-xs">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-blue-600 mr-1"></div>
              <span>Systolic</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-purple-600 mr-1"></div>
              <span>Diastolic</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


// Patient Notes Component
const PatientNotes = ({ notes }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-gray-700 font-semibold">Recent Medical Notes</h3>
        <button className="text-blue-600 hover:text-blue-800 text-sm flex items-center">
          <FilePlus size={14} className="mr-1" />
          Add Note
        </button>
      </div>
      
      <div className="space-y-3">
        {notes.map((note, index) => (
          <div key={index} className="border-l-4 border-blue-500 pl-3 py-1">
            <div className="flex justify-between items-start mb-1">
              <span className="font-medium text-sm">{note.author}</span>
              <span className="text-xs text-gray-500">{note.date}</span>
            </div>
            <p className="text-gray-700 text-sm">{note.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// Medications Component
const Medications = ({ medications }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-gray-700 font-semibold">Current Medications</h3>
        <button className="text-blue-600 hover:text-blue-800 text-sm flex items-center">
          <Pill size={14} className="mr-1" />
          Manage
        </button>
      </div>
      
      <ul className="space-y-2">
        {medications.map((med, index) => (
          <li key={index} className="flex items-center">
            <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
            <span className="text-gray-700">{med}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Recent Tests Component
const RecentTests = ({ tests }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-gray-700 font-semibold">Recent Tests</h3>
        <button className="text-blue-600 hover:text-blue-800 text-sm flex items-center">
          <Clipboard size={14} className="mr-1" />
          All Results
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Test</th>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Result</th>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {tests.map((test, index) => (
              <tr key={index}>
                <td className="px-3 py-2 text-sm text-gray-900">{test.name}</td>
                <td className="px-3 py-2 text-sm text-gray-500">{test.date}</td>
                <td className="px-3 py-2 text-sm text-gray-900">{test.result}</td>
                <td className="px-3 py-2 text-sm">
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    test.status === "Normal" ? "bg-green-100 text-green-800" : 
                    test.status === "High" ? "bg-red-100 text-red-800" : 
                    "bg-yellow-100 text-yellow-800"
                  }`}>
                    {test.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Upcoming Appointments Component
const UpcomingAppointments = ({ appointments }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-gray-700 font-semibold">Upcoming Appointments</h3>
        <button className="text-blue-600 hover:text-blue-800 text-sm flex items-center">
          <Calendar size={14} className="mr-1" />
          Schedule
        </button>
      </div>
      
      <div className="space-y-3">
        {appointments.map((appointment, index) => (
          <div key={index} className="flex items-center bg-gray-50 p-2 rounded-md">
            <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-500 mr-3">
              <Calendar size={16} />
            </div>
            <div className="flex-1">
              <div className="font-medium text-sm">{appointment.type}</div>
              <div className="text-xs text-gray-500 flex items-center">
                <Clock size={12} className="mr-1" />
                {appointment.date} at {appointment.time}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Main Dashboard Component
export default function DoctorDashboard() {
  const [currentPatient, setCurrentPatient] = useState(patients[0]);
  const [patientDropdownOpen, setPatientDropdownOpen] = useState(false);
  
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Top Navigation Bar */}
      <div className="bg-white shadow-sm px-6 py-4">
        <div className="max-w-7xl pt-8 mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <div className="h-8 w-8  rounded-md bg-blue-500  pt-2 flex items-center justify-center text-white font-bold mr-3">MD
            </div>
            <h1 className="text-xl pt-8 font-semibold text-blue-800">MedDashboard</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="text-gray-500 hover:text-gray-700">
              <Calendar size={20} />
            </button>
            <button className="text-gray-500 hover:text-gray-700 relative">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full text-xs w-4 h-4 flex items-center justify-center">
                2
              </span>
            </button>
            <button className="text-gray-500 hover:text-gray-700">
              <Settings size={20} />
            </button>
            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">
              <User size={18} />
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Patient Info Header */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 mr-4">
                <User size={32} />
              </div>
              <div>
                <div className="flex items-center">
                  <h2 className="text-xl font-semibold text-gray-800">{currentPatient.name}</h2>
                  <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-full">
                    {currentPatient.id}
                  </span>
                </div>
                <div className="flex mt-1">
                  <div className="text-sm text-gray-500 mr-4">
                    {currentPatient.age} years • {currentPatient.gender}
                  </div>
                  <div className="text-sm text-gray-500 mr-4">
                    Room: {currentPatient.roomNumber}
                  </div>
                  <div className="text-sm text-gray-500">
                    Admitted: {currentPatient.admissionDate}
                  </div>
                </div>
                <div className="mt-1 text-sm">
                  <span className="font-medium">Diagnosis:</span> <span className="text-gray-700">{currentPatient.diagnosis}</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <button
                className="flex items-center space-x-2 bg-blue-50 hover:bg-blue-100 text-blue-700 px-4 py-2 rounded-md"
                onClick={() => setPatientDropdownOpen(!patientDropdownOpen)}
              >
                <span>Switch Patient</span>
                <ChevronDown size={18} />
              </button>
              
              {patientDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white shadow-lg rounded-md z-10">
                  <ul className="py-1">
                    {patients.map(patient => (
                      <li key={patient.id}>
                        <button
                          className="w-full text-left px-4 py-2 hover:bg-blue-50"
                          onClick={() => {
                            setCurrentPatient(patient);
                            setPatientDropdownOpen(false);
                          }}
                        >
                          {patient.name} ({patient.id})
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Critical Patient Information - Health Score and Anomaly Detection (Top) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <HealthScore score={currentPatient.healthScore} />
          <AnomalyDetection 
            status={currentPatient.status}
            lastAnomaly={currentPatient.lastAnomaly}
            confidence={currentPatient.confidence}
          />
        </div>
        
        {/* Vitals Monitoring Section */}
        <h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
          <Heart size={18} className="mr-2 text-blue-500" />
          Vitals Monitoring
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <VitalIndicator 
            title="Heart Rate"
            value={currentPatient.heartRate}
            unit="BPM"
            normal={{ min: 60, max: 100 }}
            warning={{ min: 50, max: 110 }}
            critical={{ min: 40, max: 130 }}
          />
          
          <VitalIndicator 
            title="Blood Oxygen"
            value={currentPatient.bloodOxygen}
            unit="%"
            normal={{ min: 95, max: 100 }}
            warning={{ min: 90, max: 94 }}
            critical={{ min: 80, max: 89 }}
          />
          
          <BloodPressure 
            systolic={currentPatient.bloodPressure.systolic}
            diastolic={currentPatient.bloodPressure.diastolic}
            trend={currentPatient.bloodPressure.trend}
          />
        </div>
        
        {/* Quick Actions Section */}
        <h2 className="text-lg font-semibold text-gray-700 my-4 flex items-center">
          <Activity size={18} className="mr-2 text-blue-500" />
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <button className="bg-white shadow-sm hover:shadow-md transition-shadow p-4 rounded-lg flex flex-col items-center">
            <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 mb-2">
              <Calendar size={24} />
            </div>
            <span className="text-sm font-medium text-gray-700">Schedule Visit</span>
          </button>
          
          <button className="bg-white shadow-sm hover:shadow-md transition-shadow p-4 rounded-lg flex flex-col items-center">
            <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-clipboard-list">
                <rect width="8" height="4" x="8" y="2" rx="1" ry="1"/>
                <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
                <path d="M12 11h4"/>
                <path d="M12 16h4"/>
                <path d="M8 11h.01"/>
                <path d="M8 16h.01"/>
              </svg>
            </div>
            <span className="text-sm font-medium text-gray-700">Medical Records</span>
          </button>
          
          <button className="bg-white shadow-sm hover:shadow-md transition-shadow p-4 rounded-lg flex flex-col items-center">
            <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 mb-2">
              <MessageSquare size={24} />
            </div>
            <span className="text-sm font-medium text-gray-700">Send Message</span>
          </button>
          
          <button className="bg-white shadow-sm hover:shadow-md transition-shadow p-4 rounded-lg flex flex-col items-center">
            <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-prescription">
                <path d="M6 4a2 2 0 0 1 4 0v6a2 2 0 0 1-4 0V4Z"/>
                <path d="M18 8a2 2 0 0 0-2-2h-6v6h6a2 2 0 0 0 2-2Z"/>
                <path d="m12 14 6 6"/>
                <path d="m18 14-6 6"/>
              </svg>
            </div>
            <span className="text-sm font-medium text-gray-700">Prescriptions</span>
          </button>
        </div>
        
        {/* Footer */}
        <div className="bg-white rounded-lg shadow-md p-4 flex justify-between items-center mt-4">
          <div className="text-sm text-gray-500">
            Dashboard last updated: {new Date().toLocaleTimeString()}
          </div>
          <div className="flex space-x-4">
            <button className="text-blue-600 hover:text-blue-800 text-sm">Full Patient History</button>
            <button className="text-blue-600 hover:text-blue-800 text-sm">Export Data</button>
            <button className="text-blue-600 hover:text-blue-800 text-sm">Print Report</button>
          </div>
        </div>
      </div>
    </div>
  );
};

