import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import ChatInterface from './components/ChatInterface';
import Dashboard from './components/Dashboard';
import ActionTracker from './components/ActionTracker';
import Community from './components/Community';
import Navigation from './components/Navigation';
import AuthWrapper from './components/AuthWrapper';
import { UserProfile, ChatMessage, DashboardData, ActionItem, AuthUser } from './types';

const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000/api';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [authUser, setAuthUser] = useState<AuthUser | null>(null);
  const [currentView, setCurrentView] = useState<'chat' | 'dashboard' | 'actions' | 'community'>('chat');
  const [userProfile, setUserProfile] = useState<UserProfile>({
    id: '1',
    name: 'Climate Learner',
    ageGroup: 'general',
    knowledgeLevel: 'beginner',
    language: 'english',
    location: 'London',
    points: 0,
    level: 1,
    achievements: []
  });
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [actions, setActions] = useState<ActionItem[]>([]);

  const fetchDashboardData = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/dashboard/data?city=${userProfile.location}&days=30&data_type=all`);
      const data = await response.json();
      setDashboardData(data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      // Set mock data if API fails
      setDashboardData({
        city: userProfile.location,
        current_weather: {
          city: userProfile.location,
          country: 'US',
          weather: 'Clear Sky',
          temperature: '22°C',
          feels_like: '24°C',
          humidity: '65%',
          wind_speed: '3.2 m/s',
          wind_direction: '180°',
          pressure: '1013 hPa',
          visibility: '10.0 km',
          weather_icon: '01d',
          uv_index: 5
        },
        summary_stats: {
          avg_temperature: '22°C',
          humidity: '65%',
          air_quality: 'Good',
          wind_speed: '3.2 m/s',
          pressure: '1013 hPa',
          visibility: '10.0 km'
        },
        charts: [
          {
            chart_type: 'temperature_trend',
            data: {},
            layout: {}
          },
          {
            chart_type: 'air_quality_pie',
            data: {},
            layout: {}
          },
          {
            chart_type: 'weather_distribution',
            data: {},
            layout: {}
          }
        ],
        air_quality: {
          aqi: 45,
          category: 'Good',
          health_impact: 'Air quality is satisfactory, and air pollution poses little or no risk.',
          components: {
            pm2_5: 12.5,
            pm10: 18.3,
            no2: 25.1,
            o3: 45.2,
            so2: 8.7,
            co: 0.8
          }
        },
        forecast: []
      });
    }
  }, [userProfile.location]);

  useEffect(() => {
    // Check if user is already authenticated
    const savedUser = localStorage.getItem('climatebuddy-user');
    const authToken = localStorage.getItem('climatebuddy-auth-token');
    
    if (savedUser && authToken) {
      const user = JSON.parse(savedUser);
      setAuthUser(user);
      setIsAuthenticated(true);
      
      // Update user profile with auth user data
      setUserProfile(prev => ({
        ...prev,
        name: user.name,
        id: user.id
      }));
    }

    // Load user profile from localStorage
    const savedProfile = localStorage.getItem('climatebuddy-profile');
    if (savedProfile) {
      setUserProfile(JSON.parse(savedProfile));
    }

    // Load chat history
    const savedChat = localStorage.getItem('climatebuddy-chat');
    if (savedChat) {
      setChatHistory(JSON.parse(savedChat));
    }

    // Load actions
    const savedActions = localStorage.getItem('climatebuddy-actions');
    if (savedActions) {
      setActions(JSON.parse(savedActions));
    }

    // Fetch initial dashboard data only if authenticated
    if (isAuthenticated) {
      fetchDashboardData();
    }
  }, [fetchDashboardData, isAuthenticated]);

  const updateUserProfile = (updates: Partial<UserProfile>) => {
    const newProfile = { ...userProfile, ...updates };
    setUserProfile(newProfile);
    localStorage.setItem('climatebuddy-profile', JSON.stringify(newProfile));
  };

  const addChatMessage = (message: ChatMessage) => {
    const newHistory = [...chatHistory, message];
    setChatHistory(newHistory);
    localStorage.setItem('climatebuddy-chat', JSON.stringify(newHistory));
  };

  const addAction = (action: ActionItem) => {
    const newActions = [...actions, action];
    setActions(newActions);
    localStorage.setItem('climatebuddy-actions', JSON.stringify(newActions));
  };

  const completeAction = (actionId: string) => {
    const updatedActions = actions.map(action => 
      action.id === actionId ? { ...action, completed: true, completedAt: new Date().toISOString() } : action
    );
    setActions(updatedActions);
    localStorage.setItem('climatebuddy-actions', JSON.stringify(updatedActions));
    
    // Award points
    const action = actions.find(a => a.id === actionId);
    if (action) {
      updateUserProfile({ 
        points: userProfile.points + action.points,
        level: Math.floor((userProfile.points + action.points) / 100) + 1
      });
    }
  };

  const handleAuthSuccess = (user: AuthUser) => {
    setAuthUser(user);
    setIsAuthenticated(true);
    
    // Update user profile with auth user data
    setUserProfile(prev => ({
      ...prev,
      name: user.name,
      id: user.id
    }));
  };

  const handleLogout = () => {
    localStorage.removeItem('climatebuddy-user');
    localStorage.removeItem('climatebuddy-auth-token');
    setAuthUser(null);
    setIsAuthenticated(false);
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'chat':
        return (
          <ChatInterface
            userProfile={userProfile}
            chatHistory={chatHistory}
            onSendMessage={addChatMessage}
            onUpdateProfile={updateUserProfile}
          />
        );
      case 'dashboard':
        return (
          <Dashboard
            userProfile={userProfile}
            data={dashboardData}
            onRefresh={fetchDashboardData}
          />
        );
      case 'actions':
        return (
          <ActionTracker
            userProfile={userProfile}
            actions={actions}
            onAddAction={addAction}
            onCompleteAction={completeAction}
          />
        );
      case 'community':
        return (
          <Community
            userProfile={userProfile}
            actions={actions}
          />
        );
      default:
        return null;
    }
  };

  // Show authentication if not logged in
  if (!isAuthenticated) {
    return <AuthWrapper onAuthSuccess={handleAuthSuccess} />;
  }

  return (
    <div className="App">
      <Navigation
        currentView={currentView}
        onViewChange={setCurrentView}
        userProfile={userProfile}
        onUpdateProfile={updateUserProfile}
        authUser={authUser}
        onLogout={handleLogout}
      />
      <main className="main-content">
        {renderCurrentView()}
      </main>
    </div>
  );
}

export default App;