import React, { useState, useRef, useEffect } from 'react';
import { UserProfile, ChatMessage } from '../types';
import './ChatInterface.css';

interface ChatInterfaceProps {
  userProfile: UserProfile;
  chatHistory: ChatMessage[];
  onSendMessage: (message: ChatMessage) => void;
  onUpdateProfile: (updates: Partial<UserProfile>) => void;
}

const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000/api';

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  userProfile,
  chatHistory,
  onSendMessage,
  onUpdateProfile
}) => {
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(userProfile.language);
  const [selectedSubject, setSelectedSubject] = useState('climate_science');
  const [availableSubjects, setAvailableSubjects] = useState<any>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  // Fetch available subjects on component mount
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/chat/subjects`);
        const data = await response.json();
        setAvailableSubjects(data.subjects);
      } catch (error) {
        console.error('Error fetching subjects:', error);
      }
    };
    fetchSubjects();
  }, []);

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date().toISOString()
    };

    onSendMessage(userMessage);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/chat/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_message: inputMessage,
          age_group: userProfile.ageGroup,
          knowledge_level: userProfile.knowledgeLevel,
          language: selectedLanguage,
          subject: selectedSubject,
          location: userProfile.location
        })
      });

      const data = await response.json();
      
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: data.reply,
        timestamp: new Date().toISOString(),
        suggestedTopics: data.suggested_topics
      };

      onSendMessage(assistantMessage);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: 'Sorry, I\'m having trouble connecting right now. Please try again in a moment!',
        timestamp: new Date().toISOString()
      };
      onSendMessage(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const getAdaptivePrompt = () => {
    const prompts = {
      child: "Ask me anything about climate! I'll explain it like you're talking to a friendly teacher! 🌟",
      teen: "Ready to dive deeper into climate science? I can explain complex concepts and show you real data! 🔬",
      adult: "Let's explore climate science together. I can provide detailed explanations with scientific context! 📚",
      general: "Hi! I'm your climate science tutor. What would you like to learn about today? 🌍"
    };
    return prompts[userProfile.ageGroup];
  };

  const getExampleQuestions = () => {
    const examples = {
      child: [
        "Why is the Earth getting warmer?",
        "What are greenhouse gases?",
        "How can I help save the planet?"
      ],
      teen: [
        "How does carbon dioxide affect global temperatures?",
        "What's the difference between weather and climate?",
        "How do renewable energy sources work?"
      ],
      adult: [
        "Explain the mechanisms of climate change",
        "What are the latest IPCC findings?",
        "How do we measure carbon sequestration?"
      ],
      general: [
        "What is climate change?",
        "How can I reduce my carbon footprint?",
        "What are renewable energy sources?"
      ]
    };
    return examples[userProfile.ageGroup];
  };

  return (
    <div className="chat-interface">
      <div className="chat-header">
        <div className="adaptive-info">
          <h2>🤖 AI Climate Tutor</h2>
          <p className="adaptive-prompt">{getAdaptivePrompt()}</p>
        </div>
        
        <div className="chat-controls">
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="language-selector"
          >
            <option value="english">English</option>
            <option value="spanish">Español</option>
            <option value="french">Français</option>
            <option value="german">Deutsch</option>
            <option value="hindi">हिन्दी</option>
            <option value="chinese">中文</option>
          </select>
          
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="subject-selector"
          >
            {Object.entries(availableSubjects).map(([key, subject]: [string, any]) => (
              <option key={key} value={key}>{subject.name}</option>
            ))}
          </select>
          
          <div className="profile-badge">
            {userProfile.ageGroup} • {userProfile.knowledgeLevel} • {availableSubjects[selectedSubject]?.name || 'Climate Science'}
          </div>
        </div>
      </div>

      <div className="chat-messages">
        {chatHistory.length === 0 && (
          <div className="welcome-section">
            <div className="welcome-message">
              <h3>Welcome to ClimateBuddy! 🌍</h3>
              <p>I'm your personalized AI tutor for climate science. I adapt my explanations to your age and knowledge level.</p>
            </div>
            
            <div className="example-questions">
              <h4>Try asking me:</h4>
              {getExampleQuestions().map((question, index) => (
                <button
                  key={index}
                  className="example-question"
                  onClick={() => setInputMessage(question)}
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        )}

        {chatHistory.map((message) => (
          <div key={message.id} className={`message ${message.type}`}>
            <div className="message-content">
              {message.content}
            </div>
            <div className="message-time">
              {new Date(message.timestamp).toLocaleTimeString()}
            </div>
            {message.suggestedTopics && message.suggestedTopics.length > 0 && (
              <div className="suggested-topics">
                <span>Related topics:</span>
                {message.suggestedTopics.map((topic, index) => (
                  <button
                    key={index}
                    className="topic-tag"
                    onClick={() => setInputMessage(`Tell me more about ${topic}`)}
                  >
                    {topic}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
        
        {isLoading && (
          <div className="message assistant">
            <div className="message-content">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input">
        <div className="input-container">
          <textarea
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me anything about climate science..."
            className="message-input"
            rows={1}
          />
          <button
            onClick={sendMessage}
            disabled={!inputMessage.trim() || isLoading}
            className="send-button"
          >
            {isLoading ? '⏳' : '🚀'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
