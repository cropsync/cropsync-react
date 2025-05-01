import React, { useState, useEffect } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { WiDaySunny, WiRain, WiStrongWind, WiHumidity, WiThermometer } from 'react-icons/wi';
import { motion } from 'framer-motion';
import './Weather.scss';

interface WeatherProps {
  location: string;
}

interface WeatherData {
  temp: number;
  location: string;
  rain: number;
  wind: number;
  humidity: number;
  conditions: string;
}

const Weather = ({ location }: WeatherProps) => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Simulating API fetch with placeholder data
    // In a real app, you would call a weather API
    const fetchWeather = () => {
      setLoading(true);
      
      // Placeholder weather data (since we don't have a real API key)
      const placeholderWeather: WeatherData = {
        temp: 28,
        location: location,
        rain: 0,
        wind: 8.5,
        humidity: 65,
        conditions: 'sunny'
      };
      
      // Simulate API call delay
      setTimeout(() => {
        setWeatherData(placeholderWeather);
        setLoading(false);
      }, 1000);
    };
    
    fetchWeather();
  }, [location]);

  // Get weather icon based on conditions
  const getWeatherIcon = () => {
    if (!weatherData) return <WiDaySunny size={48} />;
    
    switch (weatherData.conditions.toLowerCase()) {
      case 'rain':
        return <WiRain size={48} />;
      case 'cloudy':
        return <WiDaySunny size={48} />;
      default:
        return <WiDaySunny size={48} />;
    }
  };

  return (
    <div className="floating-weather-widget">
      <motion.div 
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="weather-card">
          <Card.Body className="p-3">
            {loading ? (
              <div className="text-center py-3">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : (
              <Row className="align-items-center">
                <Col xs={4} className="text-center">
                  <div className="weather-icon text-primary">
                    {getWeatherIcon()}
                  </div>
                </Col>
                <Col xs={8}>
                  <h5 className="location mb-1">{weatherData?.location}</h5>
                  <div className="weather-temp d-flex align-items-center mb-2">
                    <WiThermometer size={22} className="me-1" />
                    <span className="temp">{weatherData?.temp}°C</span>
                  </div>
                  <div className="weather-details">
                    <div className="d-flex align-items-center mb-1 small">
                      <WiHumidity size={18} className="me-1" />
                      <span>{weatherData?.humidity}% humidity</span>
                    </div>
                    <div className="d-flex align-items-center small">
                      <WiStrongWind size={18} className="me-1" />
                      <span>{weatherData?.wind} km/h wind</span>
                    </div>
                  </div>
                </Col>
              </Row>
            )}
          </Card.Body>
        </Card>
      </motion.div>
    </div>
  );
};

export default Weather; 