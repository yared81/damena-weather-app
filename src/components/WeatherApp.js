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
  'Adama'
];

function WeatherApp() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [city, setCity] = useState('Addis Ababa');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

  function getWeatherIcon(condition) {
    const icons = {
      'Clear': '☀️',
      'Clouds': '☁️',
      'Rain': '🌧️',
      'Drizzle': '🌦️',
      'Thunderstorm': '⛈️',
      'Snow': '🌨️',
      'Mist': '🌫️'
    };
    return icons[condition] || '🌡️';
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-ethiopian-green to-ethiopian-red">
        <header className="bg-ethiopian-yellow p-4 shadow-lg">
          <h1 className="text-3xl font-bold text-center text-ethiopian-red">
            Ethiopian Weather
          </h1>
        </header>

        <main className="container mx-auto px-4 py-8">
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
            <div className="p-6">
              <select
                value={city}
                onChange={handleCityChange}
                className="w-full p-3 border-2 border-ethiopian-yellow rounded-lg focus:outline-none focus:border-ethiopian-red"
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
                <p className="text-gray-600">Loading weather data...</p>
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
                <div className="text-4xl mb-4">
                  {getWeatherIcon(weather.weather[0].main)}
                </div>
                <p className="text-3xl font-bold text-ethiopian-red mb-2">
                  {Math.round(weather.main.temp)}°C
                </p>
                <p className="text-gray-600 mb-4">
                  {weather.weather[0].description}
                </p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Humidity</p>
                    <p className="font-semibold">{weather.main.humidity}%</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Wind Speed</p>
                    <p className="font-semibold">{weather.wind.speed} m/s</p>
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
                      <div key={item.dt} className="text-center">
                        <p className="text-sm text-gray-600">
                          {date.toLocaleDateString('en-US', { weekday: 'short' })}
                        </p>
                        <p className="text-2xl mb-1">
                          {getWeatherIcon(item.weather[0].main)}
                        </p>
                        <p className="text-sm font-semibold">
                          {Math.round(item.main.temp)}°C
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
}

export default WeatherApp; 