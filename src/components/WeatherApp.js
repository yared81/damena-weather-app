import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ETHIOPIAN_CITIES = [
  'Addis Ababa',
  'Bahir Dar',
  'Gondar',
  'Mekelle',
  'Hawassa',
  'Dire Dawa',
  'Jimma',
  'Adama',
  'Harar',
  'Dessie'
];

const ETHIOPIAN_NEWS = [
  {
    title: "Ethiopian Coffee Ceremony",
    description: "Traditional coffee ceremony brings communities together",
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=500"
  },
  {
    title: "Lalibela Rock Churches",
    description: "Ancient churches carved from rock continue to amaze visitors",
    image: "https://images.unsplash.com/photo-1566438480900-0609be27a4be?w=500"
  },
  {
    title: "Ethiopian Cuisine",
    description: "Discover the rich flavors of traditional Ethiopian dishes",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500"
  }
];

const ETHIOPIAN_FACTS = [
  "Ethiopia is home to the source of the Blue Nile",
  "The Ethiopian calendar has 13 months",
  "Coffee was first discovered in Ethiopia",
  "Ethiopia has its own alphabet and writing system",
  "The country has never been colonized"
];

function WeatherApp() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [city, setCity] = useState('Addis Ababa');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [time, setTime] = useState(new Date());
  const [isCelsius, setIsCelsius] = useState(true);
  const [currentFact, setCurrentFact] = useState(0);

  useEffect(function() {
    const timer = setInterval(function() {
      setTime(new Date());
    }, 1000);
    return function() {
      clearInterval(timer);
    };
  }, []);

  useEffect(function() {
    const factTimer = setInterval(function() {
      setCurrentFact((prev) => (prev + 1) % ETHIOPIAN_FACTS.length);
    }, 5000);
    return function() {
      clearInterval(factTimer);
    };
  }, []);

  function fetchWeatherData() {
    setLoading(true);
    setError(null);

    const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    Promise.all([
      axios.get(weatherUrl),
      axios.get(forecastUrl)
    ])
      .then(function([weatherRes, forecastRes]) {
        setWeather(weatherRes.data);
        setForecast(forecastRes.data);
      })
      .catch(function(error) {
        setError('Failed to fetch weather data. Please try again.');
        console.error('Weather fetch error:', error);
      })
      .finally(function() {
        setLoading(false);
      });
  }

  useEffect(function() {
    fetchWeatherData();
  }, [city]);

  function handleCityChange(event) {
    setCity(event.target.value);
  }

  function toggleTemperatureUnit() {
    setIsCelsius(!isCelsius);
  }

  function convertTemperature(temp) {
    if (!isCelsius) {
      return Math.round((temp * 9/5) + 32);
    }
    return Math.round(temp);
  }

  function getWeatherIcon(condition) {
    const icons = {
      'Clear': '☀️',
      'Clouds': '☁️',
      'Rain': '🌧️',
      'Drizzle': '🌦️',
      'Thunderstorm': '⛈️',
      'Snow': '🌨️',
      'Mist': '🌫️',
      'Fog': '🌫️',
      'Haze': '🌫️',
      'Smoke': '🌫️',
      'Dust': '🌫️',
      'Sand': '🌫️',
      'Ash': '🌫️',
      'Squall': '💨',
      'Tornado': '🌪️'
    };
    return icons[condition] || '🌡️';
  }

  function getBackgroundClass(condition) {
    const backgrounds = {
      'Clear': 'bg-gradient-to-b from-yellow-400 to-orange-500',
      'Clouds': 'bg-gradient-to-b from-gray-400 to-gray-600',
      'Rain': 'bg-gradient-to-b from-blue-400 to-blue-600',
      'Drizzle': 'bg-gradient-to-b from-blue-300 to-blue-500',
      'Thunderstorm': 'bg-gradient-to-b from-purple-400 to-purple-600',
      'Snow': 'bg-gradient-to-b from-blue-100 to-blue-300',
      'Mist': 'bg-gradient-to-b from-gray-300 to-gray-500',
      'Fog': 'bg-gradient-to-b from-gray-300 to-gray-500',
      'Haze': 'bg-gradient-to-b from-gray-300 to-gray-500',
      'Smoke': 'bg-gradient-to-b from-gray-400 to-gray-600',
      'Dust': 'bg-gradient-to-b from-yellow-300 to-yellow-500',
      'Sand': 'bg-gradient-to-b from-yellow-300 to-yellow-500',
      'Ash': 'bg-gradient-to-b from-gray-400 to-gray-600',
      'Squall': 'bg-gradient-to-b from-blue-300 to-blue-500',
      'Tornado': 'bg-gradient-to-b from-gray-400 to-gray-600'
    };
    return backgrounds[condition] || 'bg-gradient-to-b from-ethiopian-green to-ethiopian-red';
  }

  return (
    <>
      <div className={`min-h-screen ${weather ? getBackgroundClass(weather.weather[0].main) : 'bg-gradient-to-b from-ethiopian-green to-ethiopian-red'} transition-all duration-500`}>
        <header className="bg-ethiopian-yellow p-4 shadow-lg">
          <div className="container mx-auto">
            <h1 className="text-3xl font-bold text-center text-ethiopian-red mb-2">
              Ethiopian Weather
            </h1>
            <p className="text-center text-ethiopian-red">
              {time.toLocaleTimeString('en-US', { 
                hour: '2-digit', 
                minute: '2-digit',
                second: '2-digit',
                hour12: true 
              })}
            </p>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Weather Section */}
            <div className="lg:col-span-2">
              <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-xl overflow-hidden">
                <div className="p-6">
                  <select
                    value={city}
                    onChange={handleCityChange}
                    className="w-full p-3 border-2 border-ethiopian-yellow rounded-lg focus:outline-none focus:border-ethiopian-red bg-white/80 backdrop-blur-sm"
                  >
                    {ETHIOPIAN_CITIES.map(function(cityName) {
                      return (
                        <option key={cityName} value={cityName}>
                          {cityName}
                        </option>
                      );
                    })}
                  </select>
                </div>

                {loading && (
                  <div className="p-4 text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ethiopian-red mx-auto"></div>
                    <p className="text-gray-600 mt-2">Loading weather data...</p>
                  </div>
                )}

                {error && (
                  <div className="p-4 text-center">
                    <p className="text-red-600">{error}</p>
                  </div>
                )}

                {weather && !loading && !error && (
                  <div className="p-6 text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">
                      {weather.name}
                    </h2>
                    <div className="text-6xl mb-4 transform hover:scale-110 transition-transform duration-300">
                      {getWeatherIcon(weather.weather[0].main)}
                    </div>
                    <div className="flex items-center justify-center space-x-2 mb-4">
                      <p className="text-4xl font-bold text-ethiopian-red">
                        {convertTemperature(weather.main.temp)}°{isCelsius ? 'C' : 'F'}
                      </p>
                      <button
                        onClick={toggleTemperatureUnit}
                        className="text-sm bg-ethiopian-yellow text-ethiopian-red px-2 py-1 rounded hover:bg-ethiopian-red hover:text-white transition-colors duration-300"
                      >
                        Switch to {isCelsius ? '°F' : '°C'}
                      </button>
                    </div>
                    <p className="text-gray-600 mb-4 capitalize">
                      {weather.weather[0].description}
                    </p>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="bg-white/50 p-3 rounded-lg">
                        <p className="text-gray-600">Humidity</p>
                        <p className="font-semibold">{weather.main.humidity}%</p>
                      </div>
                      <div className="bg-white/50 p-3 rounded-lg">
                        <p className="text-gray-600">Wind Speed</p>
                        <p className="font-semibold">{weather.wind.speed} m/s</p>
                      </div>
                      <div className="bg-white/50 p-3 rounded-lg">
                        <p className="text-gray-600">Feels Like</p>
                        <p className="font-semibold">{convertTemperature(weather.main.feels_like)}°{isCelsius ? 'C' : 'F'}</p>
                      </div>
                      <div className="bg-white/50 p-3 rounded-lg">
                        <p className="text-gray-600">Pressure</p>
                        <p className="font-semibold">{weather.main.pressure} hPa</p>
                      </div>
                    </div>
                  </div>
                )}

                {forecast && !loading && !error && (
                  <div className="p-6 border-t border-gray-200">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">
                      5-Day Forecast
                    </h3>
                    <div className="grid grid-cols-5 gap-2">
                      {forecast.list.filter(function(item, index) {
                        return index % 8 === 0;
                      }).slice(0, 5).map(function(item) {
                        const date = new Date(item.dt * 1000);
                        return (
                          <div key={item.dt} className="text-center bg-white/50 p-2 rounded-lg hover:bg-white/80 transition-colors duration-300">
                            <p className="text-sm text-gray-600">
                              {date.toLocaleDateString('en-US', { weekday: 'short' })}
                            </p>
                            <p className="text-2xl mb-1 transform hover:scale-110 transition-transform duration-300">
                              {getWeatherIcon(item.weather[0].main)}
                            </p>
                            <p className="text-sm font-semibold">
                              {convertTemperature(item.main.temp)}°{isCelsius ? 'C' : 'F'}
                            </p>
                            <p className="text-xs text-gray-500">
                              {item.weather[0].description}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* News and Stories Section */}
            <div className="space-y-8">
              {/* Ethiopian Facts */}
              <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-xl p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  Did You Know?
                </h3>
                <div className="bg-ethiopian-yellow/20 p-4 rounded-lg">
                  <p className="text-gray-700">
                    {ETHIOPIAN_FACTS[currentFact]}
                  </p>
                </div>
              </div>

              {/* News Section */}
              <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-xl p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  Ethiopian Stories
                </h3>
                <div className="space-y-4">
                  {ETHIOPIAN_NEWS.map(function(news, index) {
                    return (
                      <div key={index} className="bg-white/50 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
                        <img 
                          src={news.image} 
                          alt={news.title}
                          className="w-full h-40 object-cover"
                        />
                        <div className="p-4">
                          <h4 className="font-bold text-gray-800 mb-2">
                            {news.title}
                          </h4>
                          <p className="text-gray-600 text-sm">
                            {news.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Quick Links */}
              <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-xl p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  Quick Links
                </h3>
                <div className="space-y-2">
                  <a href="#" className="block p-3 bg-ethiopian-yellow/20 rounded-lg hover:bg-ethiopian-yellow/40 transition-colors duration-300">
                    Ethiopian Tourism
                  </a>
                  <a href="#" className="block p-3 bg-ethiopian-yellow/20 rounded-lg hover:bg-ethiopian-yellow/40 transition-colors duration-300">
                    Cultural Events
                  </a>
                  <a href="#" className="block p-3 bg-ethiopian-yellow/20 rounded-lg hover:bg-ethiopian-yellow/40 transition-colors duration-300">
                    Local Markets
                  </a>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default WeatherApp; 