import React, { useState } from 'react';
import { UserProfile, AuthUser } from '../types';
import './Navigation.css';

interface NavigationProps {
  currentView: 'chat' | 'dashboard' | 'actions' | 'community';
  onViewChange: (view: 'chat' | 'dashboard' | 'actions' | 'community') => void;
  userProfile: UserProfile;
  onUpdateProfile: (updates: Partial<UserProfile>) => void;
  authUser: AuthUser | null;
  onLogout: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentView, onViewChange, userProfile, onUpdateProfile, authUser, onLogout }) => {
  const [showProfileSettings, setShowProfileSettings] = useState(false);
  
  const navItems = [
    { id: 'chat', label: 'AI Tutor', icon: '🤖' },
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'actions', label: 'Actions', icon: '🎯' },
    { id: 'community', label: 'Community', icon: '👥' }
  ] as const;

  const ageGroups = [
    { value: 'child', label: 'Child (5-12)', icon: '🧒' },
    { value: 'teen', label: 'Teen (13-17)', icon: '👦' },
    { value: 'adult', label: 'Adult (18+)', icon: '👨' },
    { value: 'general', label: 'General', icon: '👤' }
  ];

  const knowledgeLevels = [
    { value: 'beginner', label: 'Beginner', icon: '🌱', description: 'New to climate science' },
    { value: 'intermediate', label: 'Intermediate', icon: '🌿', description: 'Some climate knowledge' },
    { value: 'advanced', label: 'Advanced', icon: '🌳', description: 'Deep climate expertise' }
  ];

  const handleAgeGroupChange = (ageGroup: string) => {
    onUpdateProfile({ ageGroup: ageGroup as any });
  };

  const handleKnowledgeLevelChange = (knowledgeLevel: string) => {
    onUpdateProfile({ knowledgeLevel: knowledgeLevel as any });
  };

  return (
    <nav className="navigation">
      <div className="nav-header">
        <h1 className="nav-title">🌍 ClimateBuddy</h1>
        <div className="user-info">
          <div className="user-level">
            Level {userProfile.level}
          </div>
          <div className="user-points">
            {userProfile.points} pts
          </div>
        </div>
      </div>
      
      <div className="nav-items">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`nav-item ${currentView === item.id ? 'active' : ''}`}
            onClick={() => onViewChange(item.id)}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </button>
        ))}
      </div>
      
      <div className="nav-footer">
        <div className="profile-info">
          <div className="profile-details">
            <span className="user-name">{userProfile.name}</span>
            <span className="user-subscription">{authUser?.subscription || 'free'}</span>
            <span className="user-level">{userProfile.ageGroup} • {userProfile.knowledgeLevel}</span>
          </div>
          <div className="profile-actions">
            <button 
              className="settings-button"
              onClick={() => setShowProfileSettings(!showProfileSettings)}
              title="Profile Settings"
            >
              ⚙️
            </button>
            <button 
              className="logout-button"
              onClick={onLogout}
              title="Logout"
            >
              🚪
            </button>
          </div>
        </div>
      </div>

      {/* Profile Settings Modal */}
      {showProfileSettings && (
        <div className="profile-settings-modal">
          <div className="modal-content">
            <div className="modal-header">
              <h3>👤 Profile Settings</h3>
              <button 
                className="close-button"
                onClick={() => setShowProfileSettings(false)}
              >
                ✕
              </button>
            </div>
            
            <div className="settings-section">
              <h4>🎂 Age Group</h4>
              <div className="settings-options">
                {ageGroups.map((group) => (
                  <button
                    key={group.value}
                    className={`option-button ${userProfile.ageGroup === group.value ? 'selected' : ''}`}
                    onClick={() => handleAgeGroupChange(group.value)}
                  >
                    <span className="option-icon">{group.icon}</span>
                    <span className="option-label">{group.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="settings-section">
              <h4>🧠 Knowledge Level</h4>
              <div className="settings-options">
                {knowledgeLevels.map((level) => (
                  <button
                    key={level.value}
                    className={`option-button ${userProfile.knowledgeLevel === level.value ? 'selected' : ''}`}
                    onClick={() => handleKnowledgeLevelChange(level.value)}
                  >
                    <span className="option-icon">{level.icon}</span>
                    <div className="option-content">
                      <span className="option-label">{level.label}</span>
                      <span className="option-description">{level.description}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="modal-footer">
              <button 
                className="save-button"
                onClick={() => setShowProfileSettings(false)}
              >
                ✅ Done
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
