import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, TrendingUp, Clock, Target } from 'lucide-react';
import { AppContext } from '../context/AppContext';
import './Dashboard.css';

export default function Dashboard() {
  const navigate = useNavigate();
  const { userStats, todaysLesson, topicsGrid, isLoading } = useContext(AppContext);

  if (isLoading || !userStats) {
    return <div className="dashboard animate-fade-in"><p>Loading...</p></div>;
  }


  return (
    <div className="dashboard animate-fade-in">
      <section className="welcome-section">
        <h1>Welcome back, <span className="gradient-text">{userStats.name}</span></h1>
        <p className="subtitle">Ready to continue your learning journey?</p>
      </section>

      <section className="todays-mission glass-panel">
        <div className="mission-header">
          <div className="mission-title">
            <Target className="icon-target" /> 
            <h2>Today's Mission</h2>
          </div>
          <span className="time-badge"><Clock size={14}/> {todaysLesson.estimatedTime}</span>
        </div>
        
        <div className="mission-content">
          <h3>{todaysLesson.topic}</h3>
          <p>{todaysLesson.title}</p>
        </div>

        <button className="primary-btn pulse-button" onClick={() => navigate('/lesson')}>
          <Play size={18} fill="currentColor" /> Start Lesson
          <span className="xp-reward">+{todaysLesson.xpReward} XP</span>
        </button>
      </section>

      <section className="stats-row">
        <div className="stat-card glass-panel">
          <div className="stat-icon-wrapper blue">
            <TrendingUp size={20} />
          </div>
          <div className="stat-info">
            <span className="stat-value">{userStats.completedLessons}</span>
            <span className="stat-label">Lessons</span>
          </div>
        </div>
        
        <div className="stat-card glass-panel">
          <div className="stat-icon-wrapper purple">
            <Target size={20} />
          </div>
          <div className="stat-info">
            <span className="stat-value">{(userStats.completedLessons * 2)}m</span>
            <span className="stat-label">Time Spent</span>
          </div>
        </div>
      </section>

      <section className="recent-topics">
        <h2>Continue Learning</h2>
        <div className="topics-list">
          {topicsGrid.slice(0, 2).map(topic => (
            <div key={topic.id} className="topic-card glass-panel" onClick={() => navigate('/explore')}>
              <div className="topic-card-header">
                <span className="topic-title">{topic.title}</span>
                <span className="topic-progress">{topic.progress}%</span>
              </div>
              <div className="progress-bar-bg">
                <div 
                  className="progress-bar-fill" 
                  style={{ width: `${topic.progress}%`, backgroundColor: topic.color }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
