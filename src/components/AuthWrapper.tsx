import React, { useState } from 'react';
import Login from './Login';
import Signup from './Signup';
import LandingPage from './LandingPage';
import { LoginCredentials, SignupData, AuthUser } from '../types';
import authService from '../services/authService';

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
      const response = await authService.login(credentials);

      if (response.success && response.user && response.token) {
        // Save to localStorage
        localStorage.setItem('climatebuddy-user', JSON.stringify(response.user));
        localStorage.setItem('climatebuddy-auth-token', response.token);

        onAuthSuccess(response.user);
      } else {
        setError(response.error || 'Login failed. Please try again.');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (data: SignupData) => {
    setIsLoading(true);
    setError('');

    try {
      const response = await authService.signup(data);

      if (response.success && response.user && response.token) {
        // Save to localStorage
        localStorage.setItem('climatebuddy-user', JSON.stringify(response.user));
        localStorage.setItem('climatebuddy-auth-token', response.token);

        onAuthSuccess(response.user);
      } else {
        setError(response.error || 'Signup failed. Please try again.');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    const email = prompt('Please enter your email address:');
    if (email) {
      setIsLoading(true);
      try {
        const response = await authService.forgotPassword(email);
        if (response.success) {
          alert(response.message || 'Password reset link sent to your email.');
        } else {
          alert(response.error || 'Failed to send reset link.');
        }
      } catch (err) {
        alert('An unexpected error occurred. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }
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
