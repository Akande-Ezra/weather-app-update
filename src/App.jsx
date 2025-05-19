import React from 'react';
import WeatherPanel from './Components/weatherPanel';
import ConditionPanel from './Components/ConditionPanel';

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] to-[#1e293b] flex items-center justify-center p-4">
      <div className="w-full max-w-5xl flex flex-col md:flex-row gap-6">
        {/* Weather card */}
        <div className="bg-white rounded-2xl shadow-xl w-full md:w-1/2 overflow-hidden">
          <WeatherPanel />
        </div>

        {/* Calendar/Condition card */}
        <div className="bg-white rounded-2xl shadow-xl w-full md:w-1/2 overflow-hidden">
          <ConditionPanel />
        </div>
      </div>
    </div>
  );
}
