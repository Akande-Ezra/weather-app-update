import React from 'react';
import WeatherPanel from './Components/weatherPanel';
import ConditionPanel from './Components/ConditionPanel'; 

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] to-[#1e293b] flex items-center justify-center p-4">
      <div className="w-[100%] sm:w-[100%] max-w-5xl bg-white rounded-3xl shadow-2xl flex md-flex-col overflow-hidden">
        <WeatherPanel />
        <ConditionPanel /> 
      </div>
    </div>
  );
}
