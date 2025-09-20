import React, { useState } from 'react';
import { SignupData } from '../types';
import './Auth.css';

interface SignupProps {
  onSignup: (data: SignupData) => void;
  onSwitchToLogin: () => void;
  onBackToLanding?: () => void;
  isLoading?: boolean;
  error?: string;
}

const Signup: React.FC<SignupProps> = ({
  onSignup,
  onSwitchToLogin,
  onBackToLanding,
  isLoading = false,
  error
}) => {
  const [formData, setFormData] = useState<SignupData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
    newsletter: false
  });

  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      errors.password = 'Password must contain uppercase, lowercase, and number';
    }

    if (!formData.confirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.agreeToTerms) {
      errors.agreeToTerms = 'You must agree to the terms and conditions';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSignup(formData);
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

  const getPasswordStrength = (password: string): { strength: string; color: string } => {
    if (password.length === 0) return { strength: '', color: '' };
    if (password.length < 6) return { strength: 'Weak', color: '#f44336' };
    if (password.length < 8 || !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
      return { strength: 'Medium', color: '#ff9800' };
    }
    return { strength: 'Strong', color: '#4caf50' };
  };

  const passwordStrength = getPasswordStrength(formData.password);

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
          <h2>Join the Climate Revolution</h2>
          <p>Start your journey towards a sustainable future</p>
        </div>

        {error && (
          <div className="error-message">
            <span className="error-icon">⚠️</span>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={validationErrors.name ? 'error' : ''}
              placeholder="Enter your full name"
              disabled={isLoading}
            />
            {validationErrors.name && (
              <span className="field-error">{validationErrors.name}</span>
            )}
          </div>

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
              placeholder="Create a strong password"
              disabled={isLoading}
            />
            {formData.password && (
              <div className="password-strength">
                <div className="strength-bar">
                  <div 
                    className="strength-fill" 
                    style={{ 
                      width: passwordStrength.strength === 'Weak' ? '33%' : 
                             passwordStrength.strength === 'Medium' ? '66%' : '100%',
                      backgroundColor: passwordStrength.color 
                    }}
                  />
                </div>
                <span className="strength-text" style={{ color: passwordStrength.color }}>
                  {passwordStrength.strength}
                </span>
              </div>
            )}
            {validationErrors.password && (
              <span className="field-error">{validationErrors.password}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className={validationErrors.confirmPassword ? 'error' : ''}
              placeholder="Confirm your password"
              disabled={isLoading}
            />
            {validationErrors.confirmPassword && (
              <span className="field-error">{validationErrors.confirmPassword}</span>
            )}
          </div>

          <div className="form-options">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleInputChange}
                disabled={isLoading}
              />
              <span className="checkmark"></span>
              I agree to the{' '}
              <a href="/terms" target="_blank" rel="noopener noreferrer">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="/privacy" target="_blank" rel="noopener noreferrer">
                Privacy Policy
              </a>
            </label>
            {validationErrors.agreeToTerms && (
              <span className="field-error">{validationErrors.agreeToTerms}</span>
            )}
          </div>

          <div className="form-options">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="newsletter"
                checked={formData.newsletter}
                onChange={handleInputChange}
                disabled={isLoading}
              />
              <span className="checkmark"></span>
              Subscribe to our climate newsletter for tips and updates
            </label>
          </div>

          <button
            type="submit"
            className="auth-button primary"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="spinner"></span>
                Creating account...
              </>
            ) : (
              'Create Free Account'
            )}
          </button>
        </form>

        <div className="auth-divider">
          <span>or</span>
        </div>

        <div className="social-login">
          <button className="social-button google" disabled={isLoading}>
            <span className="social-icon">🔍</span>
            Sign up with Google
          </button>
          <button className="social-button github" disabled={isLoading}>
            <span className="social-icon">🐙</span>
            Sign up with GitHub
          </button>
        </div>

        <div className="auth-footer">
          <p>
            Already have an account?{' '}
            <button
              type="button"
              onClick={onSwitchToLogin}
              className="auth-link"
              disabled={isLoading}
            >
              Sign in
            </button>
          </p>
        </div>
      </div>

      <div className="auth-features">
        <h3>Start Your Climate Journey</h3>
        <div className="features-list">
          <div className="feature-item">
            <span className="feature-icon">🎓</span>
            <div>
              <h4>Learn & Grow</h4>
              <p>Access personalized climate education content</p>
            </div>
          </div>
          <div className="feature-item">
            <span className="feature-icon">📈</span>
            <div>
              <h4>Track Progress</h4>
              <p>Monitor your environmental impact over time</p>
            </div>
          </div>
          <div className="feature-item">
            <span className="feature-icon">🏆</span>
            <div>
              <h4>Earn Rewards</h4>
              <p>Get points and badges for sustainable actions</p>
            </div>
          </div>
          <div className="feature-item">
            <span className="feature-icon">🌱</span>
            <div>
              <h4>Make Impact</h4>
              <p>Join thousands making a real difference</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
