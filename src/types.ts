export interface UserProfile {
  id: string;
  name: string;
  ageGroup: 'child' | 'teen' | 'adult' | 'general';
  knowledgeLevel: 'beginner' | 'intermediate' | 'advanced';
  language: string;
  location: string;
  points: number;
  level: number;
  achievements: string[];
}

export interface ChatMessage {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: string;
  suggestedTopics?: string[];
}

export interface DashboardData {
  city: string;
  current_weather: WeatherData;
  summary_stats: Record<string, string>;
  charts: ChartData[];
  air_quality: AirQualityData;
  forecast: ForecastData[];
}

export interface AirQualityData {
  aqi: number;
  category: string;
  health_impact: string;
  components: {
    pm2_5: number;
    pm10: number;
    no2: number;
    o3: number;
    so2: number;
    co: number;
  };
}

export interface ForecastData {
  datetime: string;
  temperature: string;
  feels_like: string;
  humidity: string;
  weather: string;
  weather_icon: string;
  wind_speed: string;
  pressure: string;
}

export interface ChartData {
  chart_type: string;
  data: any;
  layout: any;
}

export interface ActionItem {
  id: string;
  title: string;
  description: string;
  category: 'energy' | 'water' | 'waste' | 'transport' | 'food';
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
  completed: boolean;
  createdAt: string;
  completedAt?: string;
  impact: {
    co2Reduction: number;
    waterSaved: number;
    wasteReduced: number;
  };
}

export interface WeatherData {
  city: string;
  country: string;
  weather: string;
  temperature: string;
  feels_like: string;
  humidity: string;
  wind_speed: string;
  wind_direction: string;
  pressure: string;
  visibility: string;
  weather_icon: string;
  uv_index: number;
}

export interface CommunityPost {
  id: string;
  userId: string;
  userName: string;
  content: string;
  type: 'achievement' | 'tip' | 'question' | 'project';
  timestamp: string;
  likes: number;
  comments: number;
}

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  subscription: 'free' | 'premium' | 'enterprise';
  createdAt: string;
  lastLogin: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface SignupData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
  newsletter?: boolean;
}
