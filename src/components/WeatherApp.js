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

const WEATHER_NEWS = {
  ethiopia: [
    {
      title: {
        en: "Heavy Rainfall in Addis Ababa",
        am: "በአዲስ አበባ ከባድ ዝናብ"
      },
      description: {
        en: "Recent heavy rainfall causes temporary flooding in parts of the capital",
        am: "በቅርቡ የተከሰተው ከባድ ዝናብ በከተማዋ አካታች ጊዜያዊ ውሃ መስፋፋት አስከትሏል"
      },
      date: "2024-02-20",
      source: {
        en: "Ethiopian Meteorological Institute",
        am: "የኢትዮጵያ የአየር ሁኔታ ተቋም"
      }
    },
    {
      title: {
        en: "Drought Conditions in Somali Region",
        am: "በሶማሌ ክልል ውስንነት"
      },
      description: {
        en: "Ongoing drought affecting agricultural activities in eastern Ethiopia",
        am: "በምስራቅ ኢትዮጵያ የሚታየው ውስንነት የአገሪቱን የሰብል ምርት እንቅስቃሴዎች ተጎድቷል"
      },
      date: "2024-02-19",
      source: {
        en: "National Disaster Risk Management Commission",
        am: "ብሔራዊ አደጋ አደጋ አስተዳደር ኮሚሽን"
      }
    }
  ],
  africa: [
    {
      title: {
        en: "Cyclone Season in East Africa",
        am: "በምስራቅ አፍሪካ የንፋስ አውሎ ወቅት"
      },
      description: {
        en: "Meteorologists predict active cyclone season in the Indian Ocean",
        am: "የአየር ሁኔታ ባለሙያዎች በህንድ ውቅያኖስ ውስጥ ንቁ የንፋስ አውሎ ወቅት እንደሚከሰት ተንብዘዋል"
      },
      date: "2024-02-18",
      source: {
        en: "African Climate Center",
        am: "የአፍሪካ አየር ሁኔታ ማዕከል"
      }
    },
    {
      title: {
        en: "Record Temperatures in North Africa",
        am: "በሰሜን አፍሪካ የተመዘገቡ የሙቀት መጠኖች"
      },
      description: {
        en: "Unusually high temperatures recorded across North African countries",
        am: "በሰሜን አፍሪካ አገሮች ላይ ያልተለመዱ ከፍተኛ የሙቀት መጠኖች ተመዝግበዋል"
      },
      date: "2024-02-17",
      source: {
        en: "African Union Climate Division",
        am: "የአፍሪካ ህብረት የአየር ሁኔታ ክፍል"
      }
    }
  ],
  world: [
    {
      title: {
        en: "Global Climate Change Impact",
        am: "የአለም አቀፍ የአየር ሁኔታ ለውጥ ተጽእኖ"
      },
      description: {
        en: "New report highlights increasing weather extremes worldwide",
        am: "አዲስ ሪፖርት በዓለም ላይ እየጨመረ የሚሄደውን የአየር ሁኔታ ከፍተኛ ለውጦች አፅንኦት ሰጥቷል"
      },
      date: "2024-02-16",
      source: {
        en: "World Meteorological Organization",
        am: "የዓለም የአየር ሁኔታ ድርጅት"
      }
    },
    {
      title: {
        en: "Arctic Weather Patterns",
        am: "የአርክቲክ የአየር ሁኔታ ባህሪያት"
      },
      description: {
        en: "Changing Arctic conditions affecting global weather systems",
        am: "የሚቀየሩ የአርክቲክ ሁኔታዎች የዓለም አቀፍ የአየር ሁኔታ ስርዓቶችን ተጎድተዋል"
      },
      date: "2024-02-15",
      source: {
        en: "International Climate Research Center",
        am: "ዓለም አቀፍ የአየር ሁኔታ ምርምር ማዕከል"
      }
    }
  ]
};

const TRANSLATIONS = {
  en: {
    appName: "Damena",
    home: "Home",
    forecast: "Forecast",
    news: "News",
    about: "About",
    humidity: "Humidity",
    windSpeed: "Wind Speed",
    feelsLike: "Feels Like",
    pressure: "Pressure",
    fiveDayForecast: "5-Day Forecast",
    weatherTips: "Weather Tips",
    aboutUs: "About Us",
    quickLinks: "Quick Links",
    contactUs: "Contact Us",
    followUs: "Follow Us",
    aboutUsText: "Damena provides accurate weather forecasts and updates for cities across Ethiopia.",
    copyright: "All rights reserved.",
    stayHydrated: "Stay hydrated during hot weather",
    carryUmbrella: "Carry an umbrella during rainy season",
    checkUV: "Check UV index before outdoor activities",
    switchTo: "Switch to",
    weatherDescriptions: {
      'Clear': 'Clear sky',
      'Clouds': 'Cloudy',
      'Rain': 'Rainy',
      'Drizzle': 'Light rain',
      'Thunderstorm': 'Thunderstorm',
      'Snow': 'Snowy',
      'Mist': 'Misty',
      'Fog': 'Foggy',
      'Haze': 'Hazy',
      'Smoke': 'Smoky',
      'Dust': 'Dusty',
      'Sand': 'Sandy',
      'Ash': 'Ashy',
      'Squall': 'Squally',
      'Tornado': 'Tornado',
      'scattered clouds': 'Scattered clouds',
      'overcast clouds': 'Overcast clouds',
      'broken clouds': 'Broken clouds',
      'few clouds': 'Few clouds',
      'light rain': 'Light rain',
      'moderate rain': 'Moderate rain',
      'heavy rain': 'Heavy rain',
      'light snow': 'Light snow',
      'moderate snow': 'Moderate snow',
      'heavy snow': 'Heavy snow'
    },
    newsCategories: {
      ethiopia: 'Ethiopia',
      africa: 'Africa',
      world: 'World'
    }
  },
  am: {
    appName: "ዳመና",
    home: "መነሻ",
    forecast: "አየር ሁኔታ",
    news: "ዜና",
    about: "ስለ እኛ",
    humidity: "እርጥበት",
    windSpeed: "ንፋስ ፍጥነት",
    feelsLike: "ስሜት",
    pressure: "ግፊት",
    fiveDayForecast: "5 ቀን አየር ሁኔታ",
    weatherTips: "አየር ሁኔታ ምክሮች",
    aboutUs: "ስለ እኛ",
    quickLinks: "ፈጣን አገናኞች",
    contactUs: "ያግኙን",
    followUs: "ተከተሉን",
    aboutUsText: "ዳመና በኢትዮጵያ ውስጥ በተለያዩ ከተሞች ላይ ትክክለኛ የአየር ሁኔታ ትንበያዎችን እና ዜናዎችን ያቀርባል።",
    copyright: "መብቱ በህግ የተጠበቀ ነው።",
    stayHydrated: "በሙቀት ወቅት በቂ ውሃ ይጠጡ",
    carryUmbrella: "በዝናብ ወቅት ጃንጥላ ይዘው ይሂዱ",
    checkUV: "የውጪ እንቅስቃሴዎችን ከመጀመርዎ በፊት UV መረጃውን ያረጋግጡ",
    switchTo: "ወደ",
    weatherDescriptions: {
      'Clear': 'ንጹህ ሰማይ',
      'Clouds': 'ደመናማ',
      'Rain': 'ዝናባማ',
      'Drizzle': 'ቀላል ዝናብ',
      'Thunderstorm': 'ንዝረት',
      'Snow': 'በረዶ',
      'Mist': 'አጋዝም',
      'Fog': 'አጋዝም',
      'Haze': 'አጋዝም',
      'Smoke': 'ትኳሽ',
      'Dust': 'ዱብ',
      'Sand': 'አሸዋማ',
      'Ash': 'አመድ',
      'Squall': 'ንፋስ',
      'Tornado': 'ንፋስ አውሎ',
      'scattered clouds': 'በተለያዩ ቦታዎች ደመና',
      'overcast clouds': 'የተሞሉ ደመናዎች',
      'broken clouds': 'ተሰባባሪ ደመናዎች',
      'few clouds': 'ጥቂት ደመናዎች',
      'light rain': 'ቀላል ዝናብ',
      'moderate rain': 'መካከለኛ ዝናብ',
      'heavy rain': 'ከባድ ዝናብ',
      'light snow': 'ቀላል በረዶ',
      'moderate snow': 'መካከለኛ በረዶ',
      'heavy snow': 'ከባድ በረዶ'
    },
    newsCategories: {
      ethiopia: 'ኢትዮጵያ',
      africa: 'አፍሪካ',
      world: 'ዓለም'
    }
  }
};

function WeatherApp() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [cityIndex, setCityIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [time, setTime] = useState(new Date());
  const [isCelsius, setIsCelsius] = useState(true);
  const [activeNewsTab, setActiveNewsTab] = useState('ethiopia');
  const [language, setLanguage] = useState('en');

  useEffect(function() {
    const timer = setInterval(function() {
      setTime(new Date());
    }, 1000);
    return function() {
      clearInterval(timer);
    };
  }, []);

  function fetchWeatherData() {
    setLoading(true);
    setError(null);

    const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${ETHIOPIAN_CITIES[cityIndex]}&appid=${apiKey}&units=metric`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${ETHIOPIAN_CITIES[cityIndex]}&appid=${apiKey}&units=metric`;

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
  }, [cityIndex]);

  function handlePrevCity() {
    setCityIndex((prev) => (prev - 1 + ETHIOPIAN_CITIES.length) % ETHIOPIAN_CITIES.length);
  }

  function handleNextCity() {
    setCityIndex((prev) => (prev + 1) % ETHIOPIAN_CITIES.length);
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
      'Clear': 'bg-gradient-to-br from-sky-400 via-sky-500 to-sky-600',
      'Clouds': 'bg-gradient-to-br from-slate-500 via-slate-600 to-slate-700',
      'Rain': 'bg-gradient-to-br from-indigo-500 via-indigo-600 to-indigo-700',
      'Drizzle': 'bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600',
      'Thunderstorm': 'bg-gradient-to-br from-violet-500 via-violet-600 to-violet-700',
      'Snow': 'bg-gradient-to-br from-cyan-100 via-cyan-200 to-cyan-300',
      'Mist': 'bg-gradient-to-br from-slate-400 via-slate-500 to-slate-600',
      'Fog': 'bg-gradient-to-br from-slate-400 via-slate-500 to-slate-600',
      'Haze': 'bg-gradient-to-br from-slate-400 via-slate-500 to-slate-600',
      'Smoke': 'bg-gradient-to-br from-slate-500 via-slate-600 to-slate-700',
      'Dust': 'bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600',
      'Sand': 'bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600',
      'Ash': 'bg-gradient-to-br from-slate-500 via-slate-600 to-slate-700',
      'Squall': 'bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600',
      'Tornado': 'bg-gradient-to-br from-slate-500 via-slate-600 to-slate-700'
    };
    return backgrounds[condition] || 'bg-gradient-to-br from-sky-500 via-sky-600 to-sky-700';
  }

  return (
    <>
      <div className={`min-h-screen ${weather ? getBackgroundClass(weather.weather[0].main) : 'bg-gradient-to-br from-sky-500 via-sky-600 to-sky-700'} transition-all duration-500`}>
        {/* Navigation Bar */}
        <nav className="bg-slate-800/90 backdrop-blur-md shadow-lg">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-8">
                <h1 className="text-3xl font-bold text-white">
                  🌤️ {TRANSLATIONS[language].appName}
                </h1>
                <div className="hidden md:flex space-x-4">
                  <a href="#" className="text-slate-200 hover:text-white px-3 py-2 rounded-md text-lg font-medium">{TRANSLATIONS[language].home}</a>
                  <a href="#" className="text-slate-200 hover:text-white px-3 py-2 rounded-md text-lg font-medium">{TRANSLATIONS[language].forecast}</a>
                  <a href="#" className="text-slate-200 hover:text-white px-3 py-2 rounded-md text-lg font-medium">{TRANSLATIONS[language].news}</a>
                  <a href="#" className="text-slate-200 hover:text-white px-3 py-2 rounded-md text-lg font-medium">{TRANSLATIONS[language].about}</a>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setLanguage(language === 'en' ? 'am' : 'en')}
                  className="text-slate-200 hover:text-white px-3 py-1 rounded-md text-sm font-medium border border-slate-600 hover:border-slate-400"
                >
                  {language === 'en' ? 'አማርኛ' : 'English'}
                </button>
                <p className="text-slate-200 text-sm">
                  {time.toLocaleTimeString('en-US', { 
                    hour: '2-digit', 
                    minute: '2-digit',
                    second: '2-digit',
                    hour12: true 
                  })}
                </p>
              </div>
            </div>
          </div>
        </nav>

        <main className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Weather Section */}
            <div className="lg:col-span-2">
              <div className="bg-slate-800/90 backdrop-blur-md rounded-lg shadow-xl overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <button
                      onClick={handlePrevCity}
                      className="p-3 rounded-full bg-slate-700 hover:bg-slate-600 text-white text-xl font-bold transition-colors duration-300 shadow-lg"
                    >
                      ←
                    </button>
                    <h2 className="text-2xl font-bold text-white">
                      {ETHIOPIAN_CITIES[cityIndex]}
                    </h2>
                    <button
                      onClick={handleNextCity}
                      className="p-3 rounded-full bg-slate-700 hover:bg-slate-600 text-white text-xl font-bold transition-colors duration-300 shadow-lg"
                    >
                      →
                    </button>
                  </div>
                </div>

                {loading && (
                  <div className="p-4 text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
                    <p className="text-slate-200 mt-2">Loading weather data...</p>
                  </div>
                )}

                {error && (
                  <div className="p-4 text-center">
                    <p className="text-red-300">{error}</p>
                  </div>
                )}

                {weather && !loading && !error && (
                  <div className="p-6 text-center">
                    <div className="text-6xl mb-4 transform hover:scale-110 transition-transform duration-300">
                      {getWeatherIcon(weather.weather[0].main)}
                    </div>
                    <div className="flex items-center justify-center space-x-2 mb-4">
                      <p className="text-4xl font-bold text-white">
                        {convertTemperature(weather.main.temp)}°{isCelsius ? 'C' : 'F'}
                      </p>
                      <button
                        onClick={toggleTemperatureUnit}
                        className="text-sm bg-slate-700 text-white px-3 py-1 rounded-lg hover:bg-slate-600 transition-colors duration-300 shadow-md"
                      >
                        {TRANSLATIONS[language].switchTo} {isCelsius ? '°F' : '°C'}
                      </button>
                    </div>
                    <p className="text-slate-200 mb-4 capitalize">
                      {TRANSLATIONS[language].weatherDescriptions[weather.weather[0].main]}
                    </p>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="bg-slate-700/50 p-3 rounded-lg">
                        <p className="text-slate-300">{TRANSLATIONS[language].humidity}</p>
                        <p className="font-semibold text-white">{weather.main.humidity}%</p>
                      </div>
                      <div className="bg-slate-700/50 p-3 rounded-lg">
                        <p className="text-slate-300">{TRANSLATIONS[language].windSpeed}</p>
                        <p className="font-semibold text-white">{weather.wind.speed} m/s</p>
                      </div>
                      <div className="bg-slate-700/50 p-3 rounded-lg">
                        <p className="text-slate-300">{TRANSLATIONS[language].feelsLike}</p>
                        <p className="font-semibold text-white">{convertTemperature(weather.main.feels_like)}°{isCelsius ? 'C' : 'F'}</p>
                      </div>
                      <div className="bg-slate-700/50 p-3 rounded-lg">
                        <p className="text-slate-300">{TRANSLATIONS[language].pressure}</p>
                        <p className="font-semibold text-white">{weather.main.pressure} hPa</p>
                      </div>
                    </div>
                  </div>
                )}

                {forecast && !loading && !error && (
                  <div className="p-6 border-t border-slate-700">
                    <h3 className="text-xl font-bold text-white mb-4">
                      {TRANSLATIONS[language].fiveDayForecast}
                    </h3>
                    <div className="grid grid-cols-5 gap-2">
                      {forecast.list.filter(function(item, index) {
                        return index % 8 === 0;
                      }).slice(0, 5).map(function(item) {
                        const date = new Date(item.dt * 1000);
                        return (
                          <div key={item.dt} className="text-center bg-slate-700/50 p-2 rounded-lg hover:bg-slate-700 transition-colors duration-300">
                            <p className="text-sm text-slate-300">
                              {date.toLocaleDateString(language === 'en' ? 'en-US' : 'am-ET', { weekday: 'short' })}
                            </p>
                            <p className="text-2xl mb-1">
                              {getWeatherIcon(item.weather[0].main)}
                            </p>
                            <p className="text-sm font-semibold text-white">
                              {convertTemperature(item.main.temp)}°{isCelsius ? 'C' : 'F'}
                            </p>
                            <p className="text-xs text-slate-300">
                              {TRANSLATIONS[language].weatherDescriptions[item.weather[0].description.toLowerCase()] || item.weather[0].description}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* News Section */}
            <div className="space-y-8">
              <div className="bg-slate-800/90 backdrop-blur-md rounded-lg shadow-xl p-6">
                <div className="flex space-x-2 mb-4">
                  <button
                    onClick={() => setActiveNewsTab('ethiopia')}
                    className={`px-4 py-2 rounded-lg transition-colors duration-300 ${
                      activeNewsTab === 'ethiopia' 
                        ? 'bg-slate-700 text-white shadow-md' 
                        : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {TRANSLATIONS[language].newsCategories.ethiopia}
                  </button>
                  <button
                    onClick={() => setActiveNewsTab('africa')}
                    className={`px-4 py-2 rounded-lg transition-colors duration-300 ${
                      activeNewsTab === 'africa' 
                        ? 'bg-slate-700 text-white shadow-md' 
                        : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {TRANSLATIONS[language].newsCategories.africa}
                  </button>
                  <button
                    onClick={() => setActiveNewsTab('world')}
                    className={`px-4 py-2 rounded-lg transition-colors duration-300 ${
                      activeNewsTab === 'world' 
                        ? 'bg-slate-700 text-white shadow-md' 
                        : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {TRANSLATIONS[language].newsCategories.world}
                  </button>
                </div>
                <div className="space-y-4">
                  {WEATHER_NEWS[activeNewsTab].map(function(news, index) {
                    return (
                      <div key={index} className="bg-slate-700/50 rounded-lg p-4 hover:bg-slate-700 transition-colors duration-300">
                        <h4 className="font-bold text-white mb-2">
                          {news.title[language]}
                        </h4>
                        <p className="text-slate-200 text-sm mb-2">
                          {news.description[language]}
                        </p>
                        <div className="flex justify-between text-xs text-slate-400">
                          <span>{news.date}</span>
                          <span>{news.source[language]}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Weather Tips */}
              <div className="bg-slate-800/90 backdrop-blur-md rounded-lg shadow-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">
                  {TRANSLATIONS[language].weatherTips}
                </h3>
                <div className="space-y-2">
                  <div className="bg-slate-700/50 p-3 rounded-lg">
                    <p className="text-slate-200">
                      {TRANSLATIONS[language].stayHydrated}
                    </p>
                  </div>
                  <div className="bg-slate-700/50 p-3 rounded-lg">
                    <p className="text-slate-200">
                      {TRANSLATIONS[language].carryUmbrella}
                    </p>
                  </div>
                  <div className="bg-slate-700/50 p-3 rounded-lg">
                    <p className="text-slate-200">
                      {TRANSLATIONS[language].checkUV}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-slate-800/90 backdrop-blur-md shadow-lg mt-8">
          <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">{TRANSLATIONS[language].aboutUs}</h3>
                <p className="text-slate-300 text-base">
                  {TRANSLATIONS[language].aboutUsText}
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">{TRANSLATIONS[language].quickLinks}</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-slate-300 hover:text-white text-base">{TRANSLATIONS[language].home}</a></li>
                  <li><a href="#" className="text-slate-300 hover:text-white text-base">{TRANSLATIONS[language].forecast}</a></li>
                  <li><a href="#" className="text-slate-300 hover:text-white text-base">{TRANSLATIONS[language].news}</a></li>
                  <li><a href="#" className="text-slate-300 hover:text-white text-base">{TRANSLATIONS[language].about}</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">{TRANSLATIONS[language].contactUs}</h3>
                <ul className="space-y-2">
                  <li className="text-slate-300 text-base">Email: info@damena.com</li>
                  <li className="text-slate-300 text-base">Phone: +251 11 123 4567</li>
                  <li className="text-slate-300 text-base">Address: Addis Ababa, Ethiopia</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">{TRANSLATIONS[language].followUs}</h3>
                <div className="flex space-x-4">
                  <a href="#" className="text-slate-300 hover:text-white">
                    <span className="sr-only">Facebook</span>
                    <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
                    </svg>
                  </a>
                  <a href="#" className="text-slate-300 hover:text-white">
                    <span className="sr-only">Twitter</span>
                    <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/>
                    </svg>
                  </a>
                  <a href="#" className="text-slate-300 hover:text-white">
                    <span className="sr-only">Instagram</span>
                    <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            <div className="border-t border-slate-700 mt-8 pt-8">
              <p className="text-center text-slate-400 text-base">
                © {new Date().getFullYear()} {TRANSLATIONS[language].appName}. {TRANSLATIONS[language].copyright}
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

export default WeatherApp; 