import React, { useState } from 'react';
import { LoginCredentials } from '../types';
import './Auth.css';

interface LoginProps {
  onLogin: (credentials: LoginCredentials) => void;
  onSwitchToSignup: () => void;
  onForgotPassword: () => void;
  onBackToLanding?: () => void;
  isLoading?: boolean;
  error?: string;
}

const Login: React.FC<LoginProps> = ({
  onLogin,
  onSwitchToSignup,
  onForgotPassword,
  onBackToLanding,
  isLoading = false,
  error
}) => {
  const [formData, setFormData] = useState<LoginCredentials>({
    email: '',
    password: '',
    rememberMe: false
  });

  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onLogin(formData);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear validation error when user starts typing
    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          {onBackToLanding && (
            <button 
              className="back-button"
              onClick={onBackToLanding}
              disabled={isLoading}
            >
              ← Back to Home
            </button>
          )}
          <div className="auth-logo">
            <span className="logo-icon">🌍</span>
            <h1>ClimateBuddy</h1>
          </div>
          <h2>Welcome Back</h2>
          <p>Sign in to continue your climate journey</p>
        </div>

        {error && (
          <div className="error-message">
            <span className="error-icon">⚠️</span>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={validationErrors.email ? 'error' : ''}
              placeholder="Enter your email"
              disabled={isLoading}
            />
            {validationErrors.email && (
              <span className="field-error">{validationErrors.email}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className={validationErrors.password ? 'error' : ''}
              placeholder="Enter your password"
              disabled={isLoading}
            />
            {validationErrors.password && (
              <span className="field-error">{validationErrors.password}</span>
            )}
          </div>

          <div className="form-options">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleInputChange}
                disabled={isLoading}
              />
              <span className="checkmark"></span>
              Remember me
            </label>
            <button
              type="button"
              onClick={onForgotPassword}
              className="forgot-password"
              disabled={isLoading}
            >
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            className="auth-button primary"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="spinner"></span>
                Signing in...
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <div className="auth-divider">
          <span>or</span>
        </div>

        <div className="social-login">
          <button className="social-button google" disabled={isLoading}>
            <span className="social-icon">🔍</span>
            Continue with Google
          </button>
          <button className="social-button github" disabled={isLoading}>
            <span className="social-icon">🐙</span>
            Continue with GitHub
          </button>
        </div>

        <div className="auth-footer">
          <p>
            Don't have an account?{' '}
            <button
              type="button"
              onClick={onSwitchToSignup}
              className="auth-link"
              disabled={isLoading}
            >
              Sign up for free
            </button>
          </p>
        </div>
      </div>

      <div className="auth-features">
        <h3>Why Choose ClimateBuddy?</h3>
        <div className="features-list">
          <div className="feature-item">
            <span className="feature-icon">🤖</span>
            <div>
              <h4>AI-Powered Learning</h4>
              <p>Personalized climate education tailored to your level</p>
            </div>
          </div>
          <div className="feature-item">
            <span className="feature-icon">📊</span>
            <div>
              <h4>Real-time Analytics</h4>
              <p>Track your environmental impact with detailed insights</p>
            </div>
          </div>
          <div className="feature-item">
            <span className="feature-icon">🎯</span>
            <div>
              <h4>Action Tracking</h4>
              <p>Gamified system to motivate sustainable actions</p>
            </div>
          </div>
          <div className="feature-item">
            <span className="feature-icon">👥</span>
            <div>
              <h4>Community</h4>
              <p>Connect with like-minded climate advocates</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
