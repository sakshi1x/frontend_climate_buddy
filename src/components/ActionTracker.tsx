import React, { useState } from 'react';
import { UserProfile, ActionItem } from '../types';
import './ActionTracker.css';

interface ActionTrackerProps {
  userProfile: UserProfile;
  actions: ActionItem[];
  onAddAction: (action: ActionItem) => void;
  onCompleteAction: (actionId: string) => void;
}

const ActionTracker: React.FC<ActionTrackerProps> = ({
  userProfile,
  actions,
  onAddAction,
  onCompleteAction
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newAction, setNewAction] = useState({
    title: '',
    description: '',
    category: 'energy' as ActionItem['category'],
    difficulty: 'easy' as ActionItem['difficulty']
  });

  const predefinedActions: Omit<ActionItem, 'id' | 'completed' | 'createdAt' | 'completedAt'>[] = [
    {
      title: 'Turn off lights when leaving room',
      description: 'Make it a habit to turn off lights when you leave a room to save energy.',
      category: 'energy',
      difficulty: 'easy',
      points: 10,
      impact: { co2Reduction: 0.1, waterSaved: 0, wasteReduced: 0 }
    },
    {
      title: 'Use reusable water bottle',
      description: 'Replace single-use plastic bottles with a reusable water bottle.',
      category: 'waste',
      difficulty: 'easy',
      points: 15,
      impact: { co2Reduction: 0.2, waterSaved: 0, wasteReduced: 50 }
    },
    {
      title: 'Walk or bike to nearby places',
      description: 'Choose walking or biking for trips under 2km instead of driving.',
      category: 'transport',
      difficulty: 'medium',
      points: 25,
      impact: { co2Reduction: 0.5, waterSaved: 0, wasteReduced: 0 }
    },
    {
      title: 'Reduce shower time by 2 minutes',
      description: 'Cut your shower time to save water and energy used for heating.',
      category: 'water',
      difficulty: 'easy',
      points: 20,
      impact: { co2Reduction: 0.3, waterSaved: 20, wasteReduced: 0 }
    },
    {
      title: 'Plant a tree or garden',
      description: 'Plant a tree in your yard or start a small vegetable garden.',
      category: 'energy',
      difficulty: 'medium',
      points: 50,
      impact: { co2Reduction: 1.0, waterSaved: 0, wasteReduced: 0 }
    },
    {
      title: 'Switch to LED light bulbs',
      description: 'Replace incandescent bulbs with energy-efficient LED bulbs.',
      category: 'energy',
      difficulty: 'medium',
      points: 30,
      impact: { co2Reduction: 0.4, waterSaved: 0, wasteReduced: 0 }
    },
    {
      title: 'Eat one vegetarian meal per week',
      description: 'Replace one meat-based meal with a vegetarian option.',
      category: 'food',
      difficulty: 'easy',
      points: 15,
      impact: { co2Reduction: 0.3, waterSaved: 10, wasteReduced: 0 }
    },
    {
      title: 'Use public transportation',
      description: 'Take public transport instead of driving for your daily commute.',
      category: 'transport',
      difficulty: 'medium',
      points: 40,
      impact: { co2Reduction: 0.8, waterSaved: 0, wasteReduced: 0 }
    }
  ];

  const addPredefinedAction = (action: typeof predefinedActions[0]) => {
    const newAction: ActionItem = {
      ...action,
      id: Date.now().toString(),
      completed: false,
      createdAt: new Date().toISOString()
    };
    onAddAction(newAction);
  };

  const addCustomAction = () => {
    if (!newAction.title.trim()) return;

    const points = {
      easy: 10,
      medium: 25,
      hard: 50
    }[newAction.difficulty];

    const impact = {
      easy: { co2Reduction: 0.1, waterSaved: 5, wasteReduced: 10 },
      medium: { co2Reduction: 0.5, waterSaved: 15, wasteReduced: 25 },
      hard: { co2Reduction: 1.0, waterSaved: 30, wasteReduced: 50 }
    }[newAction.difficulty];

    const customAction: ActionItem = {
      ...newAction,
      id: Date.now().toString(),
      points,
      impact,
      completed: false,
      createdAt: new Date().toISOString()
    };

    onAddAction(customAction);
    setNewAction({ title: '', description: '', category: 'energy', difficulty: 'easy' });
    setShowAddForm(false);
  };

  const getCategoryIcon = (category: ActionItem['category']) => {
    const icons = {
      energy: '⚡',
      water: '💧',
      waste: '♻️',
      transport: '🚗',
      food: '🍽️'
    };
    return icons[category];
  };

  const getDifficultyColor = (difficulty: ActionItem['difficulty']) => {
    const colors = {
      easy: '#4CAF50',
      medium: '#FF9800',
      hard: '#F44336'
    };
    return colors[difficulty];
  };

  const completedActions = actions.filter(action => action.completed);
  const pendingActions = actions.filter(action => !action.completed);

  const totalCO2Reduction = completedActions.reduce((sum, action) => sum + action.impact.co2Reduction, 0);
  const totalWaterSaved = completedActions.reduce((sum, action) => sum + action.impact.waterSaved, 0);
  const totalWasteReduced = completedActions.reduce((sum, action) => sum + action.impact.wasteReduced, 0);

  return (
    <div className="action-tracker">
      <div className="action-header">
        <h2>🎯 Climate Action Tracker</h2>
        <div className="progress-summary">
          <div className="level-info">
            <span className="level">Level {userProfile.level}</span>
            <span className="points">{userProfile.points} points</span>
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ width: `${(userProfile.points % 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Impact Summary */}
      <div className="impact-summary">
        <h3>🌍 Your Environmental Impact</h3>
        <div className="impact-cards">
          <div className="impact-card">
            <div className="impact-icon">🌱</div>
            <div className="impact-value">{totalCO2Reduction.toFixed(1)}</div>
            <div className="impact-label">Tons CO₂ Reduced</div>
          </div>
          <div className="impact-card">
            <div className="impact-icon">💧</div>
            <div className="impact-value">{totalWaterSaved}</div>
            <div className="impact-label">Liters Water Saved</div>
          </div>
          <div className="impact-card">
            <div className="impact-icon">♻️</div>
            <div className="impact-value">{totalWasteReduced}</div>
            <div className="impact-label">Items Waste Reduced</div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <h3>⚡ Quick Actions</h3>
        <div className="action-grid">
          {predefinedActions.map((action, index) => (
            <div key={index} className="quick-action-card">
              <div className="action-header">
                <span className="action-icon">{getCategoryIcon(action.category)}</span>
                <span className="action-difficulty" style={{ color: getDifficultyColor(action.difficulty) }}>
                  {action.difficulty}
                </span>
              </div>
              <h4>{action.title}</h4>
              <p>{action.description}</p>
              <div className="action-rewards">
                <span className="points">+{action.points} pts</span>
                <span className="impact">-{action.impact.co2Reduction} CO₂</span>
              </div>
              <button
                onClick={() => addPredefinedAction(action)}
                className="add-action-btn"
              >
                Add to My Actions
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* My Actions */}
      <div className="my-actions">
        <div className="my-actions-header">
          <h3>📋 My Actions</h3>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="add-custom-btn"
          >
            + Add Custom Action
          </button>
        </div>

        {showAddForm && (
          <div className="add-action-form">
            <h4>Create Custom Action</h4>
            <input
              type="text"
              placeholder="Action title"
              value={newAction.title}
              onChange={(e) => setNewAction({ ...newAction, title: e.target.value })}
              className="form-input"
            />
            <textarea
              placeholder="Description"
              value={newAction.description}
              onChange={(e) => setNewAction({ ...newAction, description: e.target.value })}
              className="form-textarea"
            />
            <div className="form-row">
              <select
                value={newAction.category}
                onChange={(e) => setNewAction({ ...newAction, category: e.target.value as ActionItem['category'] })}
                className="form-select"
              >
                <option value="energy">⚡ Energy</option>
                <option value="water">💧 Water</option>
                <option value="waste">♻️ Waste</option>
                <option value="transport">🚗 Transport</option>
                <option value="food">🍽️ Food</option>
              </select>
              <select
                value={newAction.difficulty}
                onChange={(e) => setNewAction({ ...newAction, difficulty: e.target.value as ActionItem['difficulty'] })}
                className="form-select"
              >
                <option value="easy">Easy (10 pts)</option>
                <option value="medium">Medium (25 pts)</option>
                <option value="hard">Hard (50 pts)</option>
              </select>
            </div>
            <div className="form-actions">
              <button onClick={addCustomAction} className="save-btn">Save Action</button>
              <button onClick={() => setShowAddForm(false)} className="cancel-btn">Cancel</button>
            </div>
          </div>
        )}

        {/* Pending Actions */}
        {pendingActions.length > 0 && (
          <div className="actions-section">
            <h4>🔄 In Progress ({pendingActions.length})</h4>
            {pendingActions.map((action) => (
              <div key={action.id} className="action-item pending">
                <div className="action-content">
                  <div className="action-header">
                    <span className="action-icon">{getCategoryIcon(action.category)}</span>
                    <h5>{action.title}</h5>
                    <span className="action-difficulty" style={{ color: getDifficultyColor(action.difficulty) }}>
                      {action.difficulty}
                    </span>
                  </div>
                  <p>{action.description}</p>
                  <div className="action-rewards">
                    <span className="points">+{action.points} pts</span>
                    <span className="impact">-{action.impact.co2Reduction} CO₂</span>
                  </div>
                </div>
                <button
                  onClick={() => onCompleteAction(action.id)}
                  className="complete-btn"
                >
                  ✅ Complete
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Completed Actions */}
        {completedActions.length > 0 && (
          <div className="actions-section">
            <h4>✅ Completed ({completedActions.length})</h4>
            {completedActions.map((action) => (
              <div key={action.id} className="action-item completed">
                <div className="action-content">
                  <div className="action-header">
                    <span className="action-icon">{getCategoryIcon(action.category)}</span>
                    <h5>{action.title}</h5>
                    <span className="completed-badge">✅ Completed</span>
                  </div>
                  <p>{action.description}</p>
                  <div className="action-rewards">
                    <span className="points earned">+{action.points} pts earned</span>
                    <span className="impact">-{action.impact.co2Reduction} CO₂</span>
                  </div>
                  <div className="completion-date">
                    Completed on {new Date(action.completedAt!).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {actions.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">🎯</div>
            <h4>No actions yet!</h4>
            <p>Start by adding some quick actions or create your own custom action.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActionTracker;
