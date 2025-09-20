import React, { useState } from 'react';
import './LandingPage.css';

interface LandingPageProps {
  onShowLogin: () => void;
  onShowSignup: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onShowLogin, onShowSignup }) => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const features = [
    {
      icon: '🤖',
      title: 'AI-Powered Learning',
      description: 'Personalized climate education tailored to your age and knowledge level',
      highlight: 'Smart'
    },
    {
      icon: '📊',
      title: 'Real-Time Analytics',
      description: 'Track your environmental impact with live weather and air quality data',
      highlight: 'Live'
    },
    {
      icon: '🎯',
      title: 'Action Tracking',
      description: 'Gamified system to motivate and track your sustainable actions',
      highlight: 'Fun'
    },
    {
      icon: '👥',
      title: 'Community',
      description: 'Connect with like-minded climate advocates and share achievements',
      highlight: 'Social'
    },
    {
      icon: '📱',
      title: 'Mobile Ready',
      description: 'Access your climate journey anywhere with our responsive design',
      highlight: 'Portable'
    },
    {
      icon: '🔒',
      title: 'Secure & Private',
      description: 'Your data is protected with enterprise-grade security',
      highlight: 'Safe'
    }
  ];

  const pricingPlans = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      description: 'Perfect for getting started',
      features: [
        'AI Climate Tutor',
        'Basic Weather Dashboard',
        '5 Action Items',
        'Community Access',
        'Email Support'
      ],
      cta: 'Get Started Free',
      popular: false
    },
    {
      name: 'Premium',
      price: '$9',
      period: 'month',
      description: 'For serious climate learners',
      features: [
        'Everything in Free',
        'Advanced Analytics',
        'Unlimited Actions',
        'Priority Support',
        'Custom Goals',
        'Export Reports',
        'Team Collaboration'
      ],
      cta: 'Start Premium Trial',
      popular: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: 'contact us',
      description: 'For organizations and schools',
      features: [
        'Everything in Premium',
        'Custom Branding',
        'API Access',
        'Dedicated Support',
        'Advanced Analytics',
        'User Management',
        'Custom Integrations'
      ],
      cta: 'Contact Sales',
      popular: false
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Environmental Science Teacher',
      company: 'Green Valley High School',
      content: 'ClimateBuddy has revolutionized how my students learn about climate science. The AI tutor adapts to each student\'s level perfectly.',
      avatar: '👩‍🏫',
      rating: 5
    },
    {
      name: 'Michael Chen',
      role: 'Sustainability Manager',
      company: 'EcoCorp',
      content: 'Our team has reduced our carbon footprint by 40% using ClimateBuddy\'s action tracking. The analytics are incredibly detailed.',
      avatar: '👨‍💼',
      rating: 5
    },
    {
      name: 'Emma Rodriguez',
      role: 'Climate Activist',
      company: 'Youth Climate Movement',
      content: 'The community features help me connect with other activists and share our progress. It\'s inspiring to see collective impact.',
      avatar: '👩‍🌾',
      rating: 5
    }
  ];

  const stats = [
    { number: '50K+', label: 'Active Users' },
    { number: '1M+', label: 'Actions Completed' },
    { number: '500K+', label: 'Tons CO₂ Reduced' },
    { number: '4.9/5', label: 'User Rating' }
  ];

  return (
    <div className="landing-page">
      {/* Navigation */}
      <nav className="landing-nav">
        <div className="nav-container">
          <div className="nav-brand">
            <span className="brand-icon">🌍</span>
            <span className="brand-name">ClimateBuddy</span>
          </div>
          <div className="nav-actions">
            <button className="nav-link" onClick={onShowLogin}>
              Sign In
            </button>
            <button className="nav-button primary" onClick={onShowSignup}>
              Get Started Free
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-badge">
              <span className="badge-icon">🚀</span>
              <span>Join 50,000+ climate advocates</span>
            </div>
            <h1 className="hero-title">
              Master Climate Science with
              <span className="gradient-text"> AI-Powered Learning</span>
            </h1>
            <p className="hero-description">
              Learn, track, and reduce your environmental impact with personalized AI tutoring, 
              real-time analytics, and gamified action tracking. Start your climate journey today.
            </p>
            <div className="hero-actions">
              <button className="hero-button primary" onClick={onShowSignup}>
                <span>Start Learning Free</span>
                <span className="button-icon">→</span>
              </button>
              <button className="hero-button secondary" onClick={onShowLogin}>
                <span>Sign In</span>
              </button>
            </div>
            <div className="hero-stats">
              {stats.map((stat, index) => (
                <div key={index} className="stat-item">
                  <div className="stat-number">{stat.number}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-dashboard-mock">
              <div className="mock-header">
                <div className="mock-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <div className="mock-title">ClimateBuddy Dashboard</div>
              </div>
              <div className="mock-content">
                <div className="mock-chart">
                  <div className="chart-bars">
                    {Array.from({ length: 7 }, (_, i) => (
                      <div key={i} className="chart-bar" style={{ height: `${Math.random() * 100}%` }} />
                    ))}
                  </div>
                </div>
                <div className="mock-weather">
                  <div className="weather-icon">☀️</div>
                  <div className="weather-temp">22°C</div>
                  <div className="weather-location">London</div>
                </div>
                <div className="mock-actions">
                  <div className="action-item">🌱 Plant a tree</div>
                  <div className="action-item">🚗 Use public transport</div>
                  <div className="action-item">💡 Switch to LED bulbs</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="features-container">
          <div className="section-header">
            <h2 className="section-title">Everything you need for your climate journey</h2>
            <p className="section-description">
              Powerful tools and AI-driven insights to help you understand, track, and reduce your environmental impact
            </p>
          </div>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-header">
                  <div className="feature-icon">{feature.icon}</div>
                  <div className="feature-badge">{feature.highlight}</div>
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <div className="testimonials-container">
          <div className="section-header">
            <h2 className="section-title">Loved by climate advocates worldwide</h2>
            <p className="section-description">
              See how ClimateBuddy is helping individuals and organizations make a real impact
            </p>
          </div>
          <div className="testimonials-content">
            <div className="testimonial-card">
              <div className="testimonial-rating">
                {Array.from({ length: testimonials[activeTestimonial].rating }, (_, i) => (
                  <span key={i} className="star">⭐</span>
                ))}
              </div>
              <blockquote className="testimonial-text">
                "{testimonials[activeTestimonial].content}"
              </blockquote>
              <div className="testimonial-author">
                <div className="author-avatar">{testimonials[activeTestimonial].avatar}</div>
                <div className="author-info">
                  <div className="author-name">{testimonials[activeTestimonial].name}</div>
                  <div className="author-role">
                    {testimonials[activeTestimonial].role} at {testimonials[activeTestimonial].company}
                  </div>
                </div>
              </div>
            </div>
            <div className="testimonial-navigation">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`testimonial-dot ${index === activeTestimonial ? 'active' : ''}`}
                  onClick={() => setActiveTestimonial(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="pricing">
        <div className="pricing-container">
          <div className="section-header">
            <h2 className="section-title">Choose your climate journey</h2>
            <p className="section-description">
              Start free and upgrade as you grow. All plans include our core features.
            </p>
          </div>
          <div className="pricing-grid">
            {pricingPlans.map((plan, index) => (
              <div key={index} className={`pricing-card ${plan.popular ? 'popular' : ''}`}>
                {plan.popular && <div className="popular-badge">Most Popular</div>}
                <div className="pricing-header">
                  <h3 className="plan-name">{plan.name}</h3>
                  <div className="plan-price">
                    <span className="price-amount">{plan.price}</span>
                    <span className="price-period">/{plan.period}</span>
                  </div>
                  <p className="plan-description">{plan.description}</p>
                </div>
                <ul className="plan-features">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="feature-item">
                      <span className="feature-check">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button 
                  className={`plan-button ${plan.popular ? 'primary' : 'secondary'}`}
                  onClick={plan.name === 'Enterprise' ? () => alert('Contact sales') : onShowSignup}
                >
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="cta-container">
          <div className="cta-content">
            <h2 className="cta-title">Ready to start your climate journey?</h2>
            <p className="cta-description">
              Join thousands of climate advocates making a real difference. Start learning and tracking your impact today.
            </p>
            <div className="cta-actions">
              <button className="cta-button primary" onClick={onShowSignup}>
                Get Started Free
              </button>
              <button className="cta-button secondary" onClick={onShowLogin}>
                Sign In
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-content">
            <div className="footer-brand">
              <div className="footer-logo">
                <span className="brand-icon">🌍</span>
                <span className="brand-name">ClimateBuddy</span>
              </div>
              <p className="footer-description">
                Empowering individuals and organizations to understand and reduce their environmental impact through AI-powered education and tracking.
              </p>
            </div>
            <div className="footer-links">
              <div className="footer-column">
                <h4 className="footer-title">Product</h4>
                <ul className="footer-list">
                  <li><a href="#features">Features</a></li>
                  <li><a href="#pricing">Pricing</a></li>
                  <li><a href="#api">API</a></li>
                  <li><a href="#integrations">Integrations</a></li>
                </ul>
              </div>
              <div className="footer-column">
                <h4 className="footer-title">Resources</h4>
                <ul className="footer-list">
                  <li><a href="#docs">Documentation</a></li>
                  <li><a href="#blog">Blog</a></li>
                  <li><a href="#help">Help Center</a></li>
                  <li><a href="#community">Community</a></li>
                </ul>
              </div>
              <div className="footer-column">
                <h4 className="footer-title">Company</h4>
                <ul className="footer-list">
                  <li><a href="#about">About</a></li>
                  <li><a href="#careers">Careers</a></li>
                  <li><a href="#contact">Contact</a></li>
                  <li><a href="#privacy">Privacy</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <div className="footer-copyright">
              © 2024 ClimateBuddy. All rights reserved.
            </div>
            <div className="footer-social">
              <a href="#" className="social-link">🐦</a>
              <a href="#" className="social-link">📘</a>
              <a href="#" className="social-link">💼</a>
              <a href="#" className="social-link">📧</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
