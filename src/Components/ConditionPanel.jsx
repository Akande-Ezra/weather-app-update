import React from 'react';

// Helper function to generate the correct days for any month
function getDaysInMonth(month, year) {
  const days = [];

  const firstDayIndex = new Date(year, month, 1).getDay(); // Sunday = 0
  const totalDays = new Date(year, month + 1, 0).getDate();

  // Convert Sunday from 0 to 7 to match Monday-based week
  const adjustedStart = firstDayIndex === 0 ? 6 : firstDayIndex - 1;

  // Empty slots before 1st day
  for (let i = 0; i < adjustedStart; i++) {
    days.push('');
  }

  // Actual dates
  for (let i = 1; i <= totalDays; i++) {
    days.push(i);
  }

  return days;
}

export default function CalendarPanel() {
  const today = new Date();
  const month = today.getMonth(); // 0-based (0 = Jan)
  const year = today.getFullYear();
  const days = getDaysInMonth(month, year);

  const monthName = today.toLocaleString('default', { month: 'long' });

  return (
    <div className="w-full md:w-1/2 bg-white text-black p-6 sm:p-10 rounded-none md:rounded-l-3xl">
      <h2 className="text-xl sm:text-2xl font-bold mb-4">{monthName}, {year}</h2>

      <div className="grid grid-cols-7 gap-2 md:p-7 text-center text-gray-500 text-sm sm:text-base mb-4">
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2 text-center text-sm sm:text-base">
        {days.map((date, index) => (
          <div
            key={index}
            className={`p-2 sm:p-3 rounded-full ${
              date === today.getDate() ? 'bg-blue-800 text-white font-bold' : ''
            }`}
          >
            {date}
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <button className="px-4 py-2 text-sm sm:text-base border border-gray-500 rounded-full hover:bg-gray-100 transition">
          Create an Event
        </button>
      </div>
    </div>
  );
}
