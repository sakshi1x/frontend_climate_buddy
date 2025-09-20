import React, { useState, useEffect, useCallback } from 'react';
import { UserProfile, DashboardData, WeatherData } from '../types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';
import './Dashboard.css';

interface DashboardProps {
  userProfile: UserProfile;
  data: DashboardData | null;
  onRefresh: () => void;
}

const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000/api';

const Dashboard: React.FC<DashboardProps> = ({ userProfile, data, onRefresh }) => {
  const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(null);
  const [selectedCity, setSelectedCity] = useState(userProfile.location || 'London');
  const [timeRange, setTimeRange] = useState('30');
  const [isLoading, setIsLoading] = useState(false);
  const [citySuggestions, setCitySuggestions] = useState<any[]>([]);
  const [showCitySuggestions, setShowCitySuggestions] = useState(false);
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(null);

  const fetchCurrentWeather = useCallback(async () => {
    if (!selectedCity || selectedCity.trim() === '') {
      console.warn('No city selected for weather fetch');
      return;
    }
    
    try {
      const response = await fetch(`${API_BASE_URL}/weather/current/${encodeURIComponent(selectedCity)}`);
      if (!response.ok) {
        throw new Error(`Weather API error: ${response.status}`);
      }
      const weatherData = await response.json();
      setCurrentWeather(weatherData);
    } catch (error) {
      console.error('Error fetching weather:', error);
      // Set a fallback weather data
      setCurrentWeather({
        city: selectedCity,
        country: 'Unknown',
        weather: 'Data unavailable',
        temperature: 'N/A',
        feels_like: 'N/A',
        humidity: 'N/A',
        wind_speed: 'N/A',
        wind_direction: 'N/A',
        pressure: 'N/A',
        visibility: 'N/A',
        weather_icon: '01d',
        uv_index: 0
      });
    }
  }, [selectedCity]);

  const fetchDashboardData = useCallback(async () => {
    if (!selectedCity || selectedCity.trim() === '') {
      console.warn('No city selected for dashboard data fetch');
      return;
    }
    
    try {
      const response = await fetch(`${API_BASE_URL}/dashboard/data?city=${encodeURIComponent(selectedCity)}&days=${timeRange}&data_type=all`);
      if (!response.ok) {
        throw new Error(`Dashboard API error: ${response.status}`);
      }
      const data = await response.json();
      setDashboardData(data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      // Set fallback data
      setDashboardData({
        city: selectedCity,
        current_weather: {
          city: selectedCity,
          temperature: 'N/A',
          weather: 'Data unavailable',
          humidity: 'N/A',
          wind_speed: 'N/A',
          pressure: 'N/A',
          visibility: 'N/A'
        },
        summary_stats: {
          avg_temperature: 'N/A',
          humidity: 'N/A',
          air_quality: 'Unknown',
          wind_speed: 'N/A'
        },
        chart_data: {
          temperature: {
            dates: [],
            temperatures: [],
            humidity: [],
            city: selectedCity,
            mock: true
          },
          air_quality: {
            pollutants: ['PM2.5', 'PM10', 'NO2', 'O3', 'SO2', 'CO'],
            values: [0, 0, 0, 0, 0, 0],
            city: selectedCity,
            mock: true
          },
          weather_distribution: {
            conditions: ['Clear', 'Clouds', 'Rain'],
            counts: [0, 0, 0],
            city: selectedCity,
            mock: true
          }
        },
        air_quality: {
          aqi: 0,
          category: 'Unknown',
          health_impact: 'Data unavailable',
          components: {
            co: 0,
            no: 0,
            no2: 0,
            o3: 0,
            so2: 0,
            pm2_5: 0,
            pm10: 0,
            nh3: 0
          }
        }
      });
    }
  }, [selectedCity, timeRange]);

  useEffect(() => {
    fetchCurrentWeather();
    fetchDashboardData();
    
    // Set up real-time updates every 5 minutes
    const interval = setInterval(() => {
      fetchCurrentWeather();
      fetchDashboardData();
    }, 5 * 60 * 1000); // 5 minutes
    
    return () => {
      clearInterval(interval);
      if (searchTimeout) {
        clearTimeout(searchTimeout);
      }
    };
  }, [fetchCurrentWeather, fetchDashboardData, searchTimeout]);

  // Auto-fetch data when city changes (with debounce)
  useEffect(() => {
    if (selectedCity && selectedCity.trim() !== '') {
      const timeout = setTimeout(() => {
        fetchCurrentWeather();
        fetchDashboardData();
      }, 500); // 500ms debounce
      
      return () => clearTimeout(timeout);
    }
  }, [selectedCity, fetchCurrentWeather, fetchDashboardData]);

  const searchCities = useCallback(async (query: string) => {
    if (query.length < 1) {
      setCitySuggestions([]);
      setShowCitySuggestions(false);
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/dashboard/cities/search?query=${encodeURIComponent(query)}&limit=10`);
      if (!response.ok) {
        throw new Error(`City search API error: ${response.status}`);
      }
      const data = await response.json();
      setCitySuggestions(data.cities || []);
      setShowCitySuggestions(true);
    } catch (error) {
      console.error('Error searching cities:', error);
      setCitySuggestions([]);
      setShowCitySuggestions(false);
    }
  }, []);

  const handleCityInput = (query: string) => {
    setSelectedCity(query);
    
    // Clear existing timeout
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }
    
    // Set new timeout for debounced search
    const timeout = setTimeout(() => {
      if (query.length > 2) {
        searchCities(query);
      } else {
        setCitySuggestions([]);
        setShowCitySuggestions(false);
      }
    }, 300); // 300ms delay
    
    setSearchTimeout(timeout);
  };

  const selectCity = (city: any) => {
    setSelectedCity(city.name);
    setShowCitySuggestions(false);
    setCitySuggestions([]);
  };

  const handleRefresh = async () => {
    setIsLoading(true);
    await fetchDashboardData();
    await fetchCurrentWeather();
    setIsLoading(false);
  };

  const getWeatherIcon = (weather: string) => {
    const weatherLower = weather.toLowerCase();
    if (weatherLower.includes('sun') || weatherLower.includes('clear')) return '☀️';
    if (weatherLower.includes('cloud')) return '☁️';
    if (weatherLower.includes('rain')) return '🌧️';
    if (weatherLower.includes('snow')) return '❄️';
    if (weatherLower.includes('storm')) return '⛈️';
    return '🌤️';
  };

  const getAQIColor = (aqi: number) => {
    if (aqi <= 50) return '#00E400';
    if (aqi <= 100) return '#FFFF00';
    if (aqi <= 150) return '#FF7E00';
    return '#FF0000';
  };


  // Popular cities functionality removed - using single input field with autocomplete

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>📊 Climate Dashboard</h2>
        <div className="dashboard-controls">
          <div className="city-search-container">
            <input
              type="text"
              value={selectedCity}
              onChange={(e) => handleCityInput(e.target.value)}
              placeholder="Enter city name (e.g., London, New York, Tokyo)..."
              className="city-search-input"
            />
            {showCitySuggestions && citySuggestions.length > 0 && (
              <div className="city-suggestions">
                {citySuggestions.map((city, index) => (
                  <div
                    key={index}
                    className="city-suggestion"
                    onClick={() => selectCity(city)}
                  >
                    <span className="city-name">{city.name}</span>
                    <span className="city-country">{city.country}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="time-selector"
          >
            <option value="7">Last 7 days</option>
            <option value="30">Last 30 days</option>
            <option value="90">Last 3 months</option>
            <option value="365">Last year</option>
          </select>
          
          <button
            onClick={handleRefresh}
            disabled={isLoading}
            className="refresh-button"
          >
            {isLoading ? '⏳' : '🔄'} Refresh
          </button>
        </div>
      </div>

      {/* Current Weather Card */}
      {dashboardData?.current_weather && (
        <div className="weather-card">
          <div className="weather-header">
            <h3>🌤️ Current Weather - {dashboardData.current_weather.city}</h3>
            <div className="weather-icon">
              {getWeatherIcon(dashboardData.current_weather.weather)}
            </div>
          </div>
          
          <div className="weather-grid">
            <div className="weather-item">
              <span className="weather-label">Temperature</span>
              <span className="weather-value">{dashboardData.current_weather.temperature}</span>
            </div>
            <div className="weather-item">
              <span className="weather-label">Feels Like</span>
              <span className="weather-value">{dashboardData.current_weather.feels_like}</span>
            </div>
            <div className="weather-item">
              <span className="weather-label">Condition</span>
              <span className="weather-value">{dashboardData.current_weather.weather}</span>
            </div>
            <div className="weather-item">
              <span className="weather-label">Humidity</span>
              <span className="weather-value">{dashboardData.current_weather.humidity}</span>
            </div>
            <div className="weather-item">
              <span className="weather-label">Wind Speed</span>
              <span className="weather-value">{dashboardData.current_weather.wind_speed}</span>
            </div>
            <div className="weather-item">
              <span className="weather-label">Pressure</span>
              <span className="weather-value">{dashboardData.current_weather.pressure}</span>
            </div>
            <div className="weather-item">
              <span className="weather-label">Visibility</span>
              <span className="weather-value">{dashboardData.current_weather.visibility}</span>
            </div>
            <div className="weather-item">
              <span className="weather-label">UV Index</span>
              <span className="weather-value">{dashboardData.current_weather.uv_index}</span>
            </div>
          </div>
        </div>
      )}

      {/* Air Quality Card */}
      {dashboardData?.air_quality && (
        <div className="air-quality-card">
          <div className="air-quality-header">
            <h3>🌬️ Air Quality - {dashboardData.city}</h3>
            <div className="aqi-badge" style={{ backgroundColor: getAQIColor(dashboardData.air_quality.aqi) }}>
              {dashboardData.air_quality.aqi} - {dashboardData.air_quality.category}
            </div>
          </div>
          <p className="air-quality-description">{dashboardData.air_quality.health_impact}</p>
          <div className="air-quality-components">
            {dashboardData.air_quality.components && Object.entries(dashboardData.air_quality.components).map(([key, value]: [string, any]) => (
              <div key={key} className="air-quality-component">
                <span className="component-name">{key.toUpperCase()}</span>
                <span className="component-value">{value}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Summary Statistics */}
      {dashboardData?.summary_stats && (
        <div className="stats-grid">
          {dashboardData.summary_stats && Object.entries(dashboardData.summary_stats).map(([key, value]: [string, any]) => (
            <div key={key} className="stat-card">
              <div className="stat-value">{value}</div>
              <div className="stat-label">{key.replace('_', ' ').toUpperCase()}</div>
            </div>
          ))}
        </div>
      )}

      {/* Charts Section */}
      <div className="charts-section">
        <h3>📈 Climate Trends & Analysis</h3>
        
        {dashboardData?.chart_data ? (
          <div className="charts-grid">
            {/* Temperature Chart */}
            {dashboardData.chart_data.temperature && (
              <div className="chart-container">
                <div className="chart-header">
                  <h4>Temperature & Humidity Trends</h4>
                </div>
                <div className="chart-content">
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={dashboardData.chart_data.temperature.dates.map((date: string, index: number) => ({
                      date: new Date(date).toLocaleDateString(),
                      temperature: dashboardData.chart_data.temperature.temperatures[index],
                      humidity: dashboardData.chart_data.temperature.humidity[index]
                    }))}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis yAxisId="temp" orientation="left" />
                      <YAxis yAxisId="humidity" orientation="right" />
                      <Tooltip />
                      <Legend />
                      <Line yAxisId="temp" type="monotone" dataKey="temperature" stroke="#FF6B6B" strokeWidth={2} name="Temperature (°C)" />
                      <Line yAxisId="humidity" type="monotone" dataKey="humidity" stroke="#4ECDC4" strokeWidth={2} name="Humidity (%)" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {/* Air Quality Pie Chart */}
            {dashboardData.chart_data.air_quality && (
              <div className="chart-container">
                <div className="chart-header">
                  <h4>Air Quality Composition</h4>
                </div>
                <div className="chart-content">
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={dashboardData.chart_data.air_quality.pollutants.map((pollutant: string, index: number) => ({
                          name: pollutant,
                          value: dashboardData.chart_data.air_quality.values[index]
                        }))}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }: any) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {dashboardData.chart_data.air_quality.pollutants.map((_: any, index: number) => (
                          <Cell key={`cell-${index}`} fill={['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD'][index % 6]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {/* Weather Distribution Bar Chart */}
            {dashboardData.chart_data.weather_distribution && (
              <div className="chart-container">
                <div className="chart-header">
                  <h4>Weather Conditions Distribution</h4>
                </div>
                <div className="chart-content">
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={dashboardData.chart_data.weather_distribution.conditions.map((condition: string, index: number) => ({
                      condition,
                      count: dashboardData.chart_data.weather_distribution.counts[index]
                    }))}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="condition" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="count" fill="#4ECDC4" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="loading-charts">
            <div className="loading-spinner">⏳</div>
            <p>Loading climate data...</p>
          </div>
        )}
      </div>

      {/* Climate Impact Simulation */}
      <div className="simulation-section">
        <h3>🎮 Climate Impact Simulator</h3>
        <div className="simulation-cards">
          <div className="simulation-card">
            <h4>🌳 Tree Planting Impact</h4>
            <p>If everyone in {selectedCity} planted 10 trees:</p>
            <div className="impact-metrics">
              <div className="impact-item">
                <span className="impact-value">-2.5 tons</span>
                <span className="impact-label">CO₂ per year</span>
              </div>
              <div className="impact-item">
                <span className="impact-value">+15%</span>
                <span className="impact-label">Air Quality</span>
              </div>
            </div>
          </div>
          
          <div className="simulation-card">
            <h4>🚗 Electric Vehicle Adoption</h4>
            <p>If 50% of cars in {selectedCity} were electric:</p>
            <div className="impact-metrics">
              <div className="impact-item">
                <span className="impact-value">-40%</span>
                <span className="impact-label">Transport Emissions</span>
              </div>
              <div className="impact-item">
                <span className="impact-value">-25%</span>
                <span className="impact-label">Air Pollution</span>
              </div>
            </div>
          </div>
          
          <div className="simulation-card">
            <h4>☀️ Solar Panel Installation</h4>
            <p>If 30% of homes in {selectedCity} had solar panels:</p>
            <div className="impact-metrics">
              <div className="impact-item">
                <span className="impact-value">-60%</span>
                <span className="impact-label">Home Energy Use</span>
              </div>
              <div className="impact-item">
                <span className="impact-value">+35%</span>
                <span className="impact-label">Renewable Energy</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Personal Impact Tracker */}
      <div className="personal-impact">
        <h3>👤 Your Personal Impact</h3>
        <div className="impact-summary">
          <div className="impact-circle">
            <div className="impact-number">2.3</div>
            <div className="impact-unit">tons CO₂/year</div>
          </div>
          <div className="impact-details">
            <div className="impact-item">
              <span>🏠 Home Energy:</span>
              <span>1.2 tons</span>
            </div>
            <div className="impact-item">
              <span>🚗 Transportation:</span>
              <span>0.8 tons</span>
            </div>
            <div className="impact-item">
              <span>🍽️ Food & Waste:</span>
              <span>0.3 tons</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
