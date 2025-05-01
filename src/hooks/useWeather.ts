import { useState, useEffect } from 'react';
import axios from 'axios';
import { WeatherData, WeatherCondition } from '../types';

interface WeatherResponse {
  main: {
    temp: number;
  };
  name: string;
  rain?: {
    '1h': number;
  };
  wind: {
    speed: number;
  };
  weather: Array<{
    id: number;
    main: string;
    description: string;
  }>;
}

const useWeather = (location: string) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Replace with your actual API key or use environment variables
  const apiKey = process.env.REACT_APP_WEATHER_API_KEY || 'YOUR_API_KEY';

  // Helper to convert weather code to condition
  const getWeatherCondition = (code: number): WeatherCondition => {
    if (code >= 200 && code < 300) return 'thunderstorm';
    if (code >= 300 && code < 600) return 'rain';
    if (code >= 600 && code < 700) return 'snow';
    if (code >= 700 && code < 800) return 'mist';
    if (code === 800) return 'sunny';
    if (code > 800) return 'clouds';
    return 'sunny';
  };

  // Placeholder data (fallback when API fails)
  const getPlaceholderWeather = (): WeatherData => ({
    temp: 28,
    location,
    rain: 0,
    wind: 8.5,
    conditions: 'sunny',
  });

  useEffect(() => {
    const fetchWeather = async () => {
      if (!location) {
        setWeather(getPlaceholderWeather());
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`;
        const response = await axios.get<WeatherResponse>(url);
        
        setWeather({
          temp: Math.round(response.data.main.temp - 273.15), // Convert to Celsius
          location: response.data.name,
          rain: response.data.rain ? response.data.rain['1h'] : 0,
          wind: response.data.wind.speed,
          conditions: getWeatherCondition(response.data.weather[0].id),
        });
      } catch (err) {
        console.error('Error fetching weather data:', err);
        setError('Failed to fetch weather data. Using placeholder data.');
        // Use placeholder data as fallback
        setWeather(getPlaceholderWeather());
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [location, apiKey]);

  return { weather, loading, error };
};

export default useWeather; 