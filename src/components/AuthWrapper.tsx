import React, { useState } from 'react';
import Login from './Login';
import Signup from './Signup';
import LandingPage from './LandingPage';
import { LoginCredentials, SignupData, AuthUser } from '../types';

interface AuthWrapperProps {
  onAuthSuccess: (user: AuthUser) => void;
}

type AuthMode = 'landing' | 'login' | 'signup' | 'forgot-password';

const AuthWrapper: React.FC<AuthWrapperProps> = ({ onAuthSuccess }) => {
  const [authMode, setAuthMode] = useState<AuthMode>('landing');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const handleLogin = async (credentials: LoginCredentials) => {
    setIsLoading(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Mock successful login
      const mockUser: AuthUser = {
        id: '1',
        email: credentials.email,
        name: 'Climate Learner',
        subscription: 'free',
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString()
      };

      // Save to localStorage
      localStorage.setItem('climatebuddy-user', JSON.stringify(mockUser));
      localStorage.setItem('climatebuddy-auth-token', 'mock-jwt-token');

      onAuthSuccess(mockUser);
    } catch (err) {
      setError('Invalid email or password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (data: SignupData) => {
    setIsLoading(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Mock successful signup
      const mockUser: AuthUser = {
        id: Date.now().toString(),
        email: data.email,
        name: data.name,
        subscription: 'free',
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString()
      };

      // Save to localStorage
      localStorage.setItem('climatebuddy-user', JSON.stringify(mockUser));
      localStorage.setItem('climatebuddy-auth-token', 'mock-jwt-token');

      onAuthSuccess(mockUser);
    } catch (err) {
      setError('Failed to create account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    // For now, just show an alert
    alert('Password reset functionality would be implemented here. In a real app, this would send a reset email.');
  };

  const switchToLogin = () => {
    setAuthMode('login');
    setError('');
  };

  const switchToSignup = () => {
    setAuthMode('signup');
    setError('');
  };

  const showLanding = () => {
    setAuthMode('landing');
    setError('');
  };

  return (
    <div className="auth-wrapper">
      {authMode === 'landing' && (
        <LandingPage
          onShowLogin={switchToLogin}
          onShowSignup={switchToSignup}
        />
      )}
      
      {authMode === 'login' && (
        <Login
          onLogin={handleLogin}
          onSwitchToSignup={switchToSignup}
          onForgotPassword={handleForgotPassword}
          onBackToLanding={showLanding}
          isLoading={isLoading}
          error={error}
        />
      )}
      
      {authMode === 'signup' && (
        <Signup
          onSignup={handleSignup}
          onSwitchToLogin={switchToLogin}
          onBackToLanding={showLanding}
          isLoading={isLoading}
          error={error}
        />
      )}
    </div>
  );
};

export default AuthWrapper;
