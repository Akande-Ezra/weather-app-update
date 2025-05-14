import React, { useEffect, useRef, useState } from 'react';
// import './Weather.css';
import search_icon from "../assets/search.jpg";
import clear_icon from '../assets/sun-solid-240.png';
import humidity_icon from '../assets/humidity-removebg-preview.png';
import wind_icon from '../assets/wind-removebg-preview.png';
import cloud_icon from '../assets/cloud-removebg-preview.png';
import snow_icon from '../assets/snow-removebg-preview.png';
import rain_icon from '../assets/rain-bg.png';
import drizzle_icon from '../assets/drizzle-removebg-preview.png';
import { WEATHER_API } from '../config';

const WeatherPanel = () => {
  const allIcons = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03n": cloud_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "13d": snow_icon,
    "13n": snow_icon,
  };

  const [weatherData, setWeatherData] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const inputRef = useRef();

  const search = async (city, date = new Date()) => {
    if (!city.trim()) {
      alert("Please enter a city name");
      return;
    }

    setLoading(true);
    try {
      const geoResponse = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(city)}&limit=1&appid=${WEATHER_API.KEY}`
      );
      const [location] = await geoResponse.json();

      if (!location) {
        alert("City not found");
        return;
      }

      const isToday = date.toDateString() === new Date().toDateString();

      if (isToday) {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&appid=${WEATHER_API.KEY}&units=metric`
        );

        if (!response.ok) throw new Error("Failed to fetch weather data");

        const data = await response.json();

        const icon = allIcons[data.weather[0].icon] || clear_icon;
        setWeatherData({
          humidity: data.main.humidity,
          temperature: Math.floor(data.main.temp),
          windSpeed: Math.round(data.wind.speed * 3.6),
          location: data.name,
          icon: icon,
          description: data.weather[0].description,
          date: date.toLocaleDateString(),
        });
      }
    } catch (error) {
      console.error("API Error:", error);
      alert("Error fetching weather data.");
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-1/2 bg-gradient-to-b from-[#0B1D3A] to-[#183660] p-10 text-white relative">
      <div className="">
        <div className="flex items-center justify-between bg-white rounded-full px-4 py-2 w-full max-w-md mx-auto mt-4">
  <input
    ref={inputRef}
    type="text"
    placeholder="Search city..."
    className="flex-grow text-black bg-transparent outline-none"
    onKeyDown={(e) =>
      e.key === 'Enter' && search(inputRef.current.value, selectedDate)
    }
  />
  <button
    onClick={() => search(inputRef.current.value, selectedDate)}
    className="ml-2"
  >
    <img src={search_icon} alt="search" className="w-5 h-5" />
  </button>
</div>
      </div>

      {loading && <p>Loading...</p>}

      {weatherData && (
        <>
          <div className="text-center">
            <img src={weatherData.icon} alt="Weather Icon" className="mx-auto w-24 h-24" />
            <p className="text-4xl font-bold">{weatherData.temperature}°C</p>
            <p className="text-lg capitalize">{weatherData.description}</p>
            <p className="text-sm mt-2">{weatherData.location}</p>
          </div>

          <div className="flex justify-around items-center mt-3  text-sm">
            <div className="flex flex-col items-center">
              <img src={humidity_icon} alt="Humidity" className="w-8 h-8" />
              <p>{weatherData.humidity}%</p>
              <span>Humidity</span>
            </div>
            <div className="flex p-5 flex-col items-center">
              <img src={wind_icon} alt="Wind" className="w-8 h-8" />
              <p>{weatherData.windSpeed} km/h</p>
              <span>Wind Speed</span>
            </div>
          </div>

          <div className="absolute bottom-5 left-10 text-xs text-gray-300">📍 {weatherData.location}</div>
        </>
      )}
    </div>
  );
};

export default WeatherPanel;
