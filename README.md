# 🌍 ClimateBuddy - AI-Powered Climate Education Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18.0-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.9-blue.svg)](https://www.typescriptlang.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.100-green.svg)](https://fastapi.tiangolo.com/)

ClimateBuddy is a comprehensive SaaS platform that combines AI-powered climate education with real-time environmental data to help users understand, track, and reduce their environmental impact.

## 🚀 Features

### 🤖 AI-Powered Learning
- **Personalized Education**: AI tutor adapts to user's age group and knowledge level
- **Interactive Chat**: Real-time climate science discussions
- **Smart Recommendations**: Personalized learning paths and action suggestions

### 📊 Real-Time Analytics
- **Weather Dashboard**: Live weather data and forecasts
- **Air Quality Monitoring**: Real-time air quality metrics
- **Climate Trends**: Historical data visualization with interactive charts
- **Environmental Impact**: Track CO₂ reduction, water saved, and waste reduced

### 🎯 Action Tracking
- **Gamified System**: Points, levels, and achievements
- **Predefined Actions**: Quick-start climate actions
- **Custom Actions**: Create personalized sustainability goals
- **Progress Tracking**: Visual progress indicators and impact metrics

### 👥 Community Features
- **Social Learning**: Share achievements and tips
- **Community Challenges**: Collaborative environmental goals
- **Knowledge Sharing**: User-generated content and discussions

### 🔐 Enterprise-Ready Authentication
- **Secure Login/Signup**: JWT-based authentication
- **Social Login**: Google and GitHub integration ready
- **Profile Management**: Flexible user settings and preferences
- **Subscription Tiers**: Free, Premium, and Enterprise plans

## 🏗️ Architecture

### Frontend (React + TypeScript)
```
ClimateBuddy/
├── src/
│   ├── components/
│   │   ├── Auth/           # Authentication components
│   │   │   ├── Login.tsx
│   │   │   ├── Signup.tsx
│   │   │   └── AuthWrapper.tsx
│   │   ├── Dashboard.tsx   # Weather & analytics dashboard
│   │   ├── ChatInterface.tsx # AI tutor interface
│   │   ├── ActionTracker.tsx # Climate action tracking
│   │   ├── Community.tsx   # Community features
│   │   └── Navigation.tsx  # Main navigation
│   ├── types.ts           # TypeScript definitions
│   └── App.tsx           # Main application
```

### Backend (FastAPI + Python)
```
backend/
├── routes/
│   ├── dashboard.py      # Weather & analytics API
│   ├── chatbot.py        # AI chat API
│   └── auth.py          # Authentication API
├── ai_models/
│   └── chatbot.py       # AI model integration
├── data_processing/
│   └── weather.py       # Weather data processing
└── visualization/
    ├── barchart.py      # Chart generation
    └── piechart.py      # Pie chart generation
```

## 🛠️ Technology Stack

### Frontend
- **React 18** - Modern UI library
- **TypeScript** - Type-safe development
- **Recharts** - Data visualization
- **CSS3** - Modern styling with animations
- **LocalStorage** - Client-side data persistence

### Backend
- **FastAPI** - High-performance Python web framework
- **OpenWeatherMap API** - Real-time weather data
- **Plotly** - Interactive chart generation
- **Pydantic** - Data validation and serialization
- **Uvicorn** - ASGI server

### External APIs
- **OpenWeatherMap** - Weather and air quality data
- **Geocoding API** - City search and location data

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ and npm
- Python 3.8+
- OpenWeatherMap API key

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/your-username/climatebuddy.git
cd climatebuddy
```

2. **Install frontend dependencies**
```bash
cd ClimateBuddy
npm install
```

3. **Install backend dependencies**
```bash
cd ../backend
pip install -r requirements.txt
```

4. **Configure environment variables**
```bash
# Create .env file in backend directory
WEATHER_API_KEY=your_openweathermap_api_key
JWT_SECRET_KEY=your_jwt_secret
DATABASE_URL=your_database_url
```

5. **Start the development servers**
```bash
# Terminal 1: Start backend
cd backend
uvicorn main:app --reload --host 0.0.0.0 --port 8000

# Terminal 2: Start frontend
cd ClimateBuddy
npm start
```

6. **Access the application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- API Documentation: http://localhost:8000/docs

## 📱 User Guide

### Getting Started
1. **Sign Up**: Create a free account with email or social login
2. **Set Profile**: Choose your age group and knowledge level
3. **Explore Dashboard**: View real-time weather and environmental data
4. **Start Learning**: Chat with the AI tutor about climate science
5. **Take Action**: Add climate actions and track your progress

### Features Overview

#### 🤖 AI Tutor
- Ask questions about climate science
- Get personalized explanations based on your level
- Receive learning recommendations
- Track your learning progress

#### 📊 Dashboard
- Real-time weather data for any city
- Interactive charts showing climate trends
- Air quality monitoring
- Environmental impact metrics

#### 🎯 Action Tracker
- Browse predefined climate actions
- Create custom sustainability goals
- Earn points and level up
- Track your environmental impact

#### 👥 Community
- Share your achievements
- Learn from other users
- Participate in challenges
- Get inspired by success stories

## 🔧 API Documentation

### Authentication Endpoints
```
POST /api/auth/login
POST /api/auth/signup
POST /api/auth/logout
GET  /api/auth/me
```

### Dashboard Endpoints
```
GET /api/dashboard/data?city={city}&days={days}
GET /api/dashboard/cities/search?query={query}
GET /api/weather/current/{city}
```

### Chat Endpoints
```
POST /api/chat/message
GET  /api/chat/subjects
GET  /api/chat/history
```

## 🎨 Design System

### Color Palette
- **Primary**: #667eea (Blue gradient)
- **Secondary**: #764ba2 (Purple gradient)
- **Success**: #4CAF50 (Green)
- **Warning**: #FF9800 (Orange)
- **Error**: #F44336 (Red)
- **Neutral**: #718096 (Gray)

### Typography
- **Headings**: 600-700 weight, 1.5-2rem size
- **Body**: 400-500 weight, 1rem size
- **Captions**: 500 weight, 0.85rem size

### Components
- **Cards**: Rounded corners (8-20px), subtle shadows
- **Buttons**: Gradient backgrounds, hover animations
- **Forms**: Clean inputs with validation states
- **Charts**: Interactive with tooltips and legends

## 🔒 Security Features

- **JWT Authentication**: Secure token-based auth
- **Input Validation**: Server-side data validation
- **CORS Protection**: Cross-origin request security
- **Rate Limiting**: API request throttling
- **Data Encryption**: Sensitive data protection

## 📊 Performance Optimizations

- **Code Splitting**: Lazy loading of components
- **Memoization**: React.memo for expensive renders
- **Debounced Search**: Optimized API calls
- **Caching**: LocalStorage for user data
- **Image Optimization**: Compressed assets

## 🚀 Deployment

### Frontend (Vercel/Netlify)
```bash
npm run build
# Deploy dist/ folder to your hosting platform
```

### Backend (Railway/Heroku)
```bash
# Configure environment variables
# Deploy with Procfile for uvicorn
```

### Docker Deployment
```bash
# Build and run with docker-compose
docker-compose up -d
```

## 📈 Analytics & Monitoring

- **User Engagement**: Track feature usage
- **Performance Metrics**: Monitor API response times
- **Error Tracking**: Log and monitor errors
- **User Feedback**: Collect and analyze feedback

## 🔮 Roadmap

### Phase 1 (Current)
- ✅ Basic authentication
- ✅ Weather dashboard
- ✅ AI chat interface
- ✅ Action tracking

### Phase 2 (Next)
- 🔄 Mobile app (React Native)
- 🔄 Advanced analytics
- 🔄 Team/organization features
- 🔄 API integrations

### Phase 3 (Future)
- 📅 Machine learning recommendations
- 📅 Carbon footprint calculator
- 📅 Sustainability reporting
- 📅 Enterprise features

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- OpenWeatherMap for weather data
- React and FastAPI communities
- Climate science educators and researchers
- Open source contributors

## 📞 Support

- **Documentation**: [docs.climatebuddy.com](https://docs.climatebuddy.com)
- **Email**: support@climatebuddy.com
- **Discord**: [Join our community](https://discord.gg/climatebuddy)
- **GitHub Issues**: [Report bugs](https://github.com/your-username/climatebuddy/issues)

---

**Made with ❤️ for a sustainable future**