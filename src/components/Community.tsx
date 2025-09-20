import React, { useState } from 'react';
import { UserProfile, ActionItem } from '../types';

interface CommunityProps {
  userProfile: UserProfile;
  actions: ActionItem[];
}

const Community: React.FC<CommunityProps> = ({ userProfile, actions }) => {
  const [posts] = useState([
    {
      id: '1',
      userName: 'EcoWarrior23',
      content: 'Just completed my first week of biking to work! Saved 2.5kg of CO₂! 🚴‍♀️💚',
      type: 'achievement',
      likes: 12
    },
    {
      id: '2',
      userName: 'GreenThumb',
      content: 'Pro tip: Start a small herb garden on your windowsill! 🌿',
      type: 'tip',
      likes: 8
    }
  ]);

  const completedActions = actions.filter(action => action.completed);
  const totalPoints = userProfile.points;

  return (
    <div className="community">
      <div className="community-header">
        <h2>👥 Climate Community</h2>
        <p>Connect with fellow climate champions!</p>
      </div>

      <div className="user-stats">
        <div className="stat-card">
          <div className="stat-value">{completedActions.length}</div>
          <div className="stat-label">Actions Completed</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{totalPoints}</div>
          <div className="stat-label">Points Earned</div>
        </div>
      </div>

      <div className="community-posts">
        <h3>Community Feed</h3>
        {posts.map((post) => (
          <div key={post.id} className="community-post">
            <div className="post-header">
              <span className="post-author">{post.userName}</span>
            </div>
            <div className="post-content">{post.content}</div>
            <div className="post-actions">
              <button className="like-button">🤍 {post.likes}</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Community;
