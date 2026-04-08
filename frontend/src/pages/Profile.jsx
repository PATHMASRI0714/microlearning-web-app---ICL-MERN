import React, { useContext, useState } from 'react';
import { Settings, Award, Flame, Zap, CheckCircle, Lock, Globe, Star, Target, Crown } from 'lucide-react';
import { AppContext } from '../context/AppContext';
import './Profile.css';

export default function Profile() {
  const { userStats, isLoading, logout } = useContext(AppContext);
  const [showSettings, setShowSettings] = useState(false);
  
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
  const [notifications, setNotifications] = useState(localStorage.getItem('notifications') === 'true');

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    if (newTheme === 'light') {
      document.body.classList.add('light-theme');
    } else {
      document.body.classList.remove('light-theme');
    }
  };

  const toggleNotifications = () => {
    const newNotif = !notifications;
    setNotifications(newNotif);
    localStorage.setItem('notifications', newNotif);
  };

  if (isLoading || !userStats) {
    return <div className="profile animate-fade-in"><p>Loading profile...</p></div>;
  }

  const renderHeatmap = () => {
    if (!userStats.recentActivity) return null;
    
    const today = new Date();
    const startOffset = new Date(today);
    startOffset.setDate(today.getDate() - 27);
    const firstDayIndex = startOffset.getDay(); // 0 (Sun) to 6 (Sat)
    
    const cells = Array(firstDayIndex).fill(null).concat(userStats.recentActivity);
    
    return (
      <div className="heatmap-container">
        <p className="heatmap-title">Recent Activity</p>
        <div className="heatmap-calendar-view">
          <div className="heatmap-day-labels">
            <span>Sun</span>
            <span></span>
            <span>Tue</span>
            <span></span>
            <span>Thu</span>
            <span></span>
            <span>Sat</span>
          </div>
          <div className="heatmap-grid">
            {cells.map((intensity, i) => {
              if (intensity === null) {
                return <div key={`empty-${i}`} className="heatmap-cell empty"></div>;
              }
              const dateOffset = 27 - (i - firstDayIndex);
              const cellDate = new Date(today);
              cellDate.setDate(today.getDate() - dateOffset);
              const dateStr = cellDate.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
              
              let tooltipText = `${dateStr}: No lessons`;
              if (intensity === 1) tooltipText = `${dateStr}: 1 lesson`;
              if (intensity > 1) tooltipText = `${dateStr}: ${intensity} lessons`;

              return (
                <div 
                  key={i} 
                  className={`heatmap-cell intensity-${intensity}`}
                  data-tooltip={tooltipText}
                ></div>
              );
            })}
          </div>
        </div>
        <div className="heatmap-legend">
          <span>Less</span>
          <div className="legend-cells">
            <div className="legend-cell heatmap-cell intensity-0"></div>
            <div className="legend-cell heatmap-cell intensity-1"></div>
            <div className="legend-cell heatmap-cell intensity-2"></div>
            <div className="legend-cell heatmap-cell intensity-3"></div>
            <div className="legend-cell heatmap-cell intensity-4"></div>
          </div>
          <span>More</span>
        </div>
      </div>
    );
  };

  const ACHIEVEMENT_CATALOG = [
    { id: 'b1', name: 'Fast Learner', desc: 'Complete rapid lessons', icon: 'zap', color: '#f59e0b', IconComponent: Zap },
    { id: 'b2', name: '7-Day Streak', desc: 'Maintain 7-day streak', icon: 'fire', color: '#ef4444', IconComponent: Flame },
    { id: 'b3', name: 'Polyglot', desc: 'Learn 3 different topics', icon: 'globe', color: '#3b82f6', IconComponent: Globe },
    { id: 'b4', name: 'Dedicated', desc: 'Reach Level 10', icon: 'star', color: '#eab308', IconComponent: Star },
    { id: 'b5', name: 'Mastermind', desc: 'Earn 5000 XP', icon: 'target', color: '#8b5cf6', IconComponent: Target },
    { id: 'b6', name: 'Champion', desc: 'Top of leaderboard', icon: 'crown', color: '#ec4899', IconComponent: Crown },
  ];

  const renderAchievements = () => {
    return (
      <section className="achievements-section">
        <h2>Achievements</h2>
        <div className="badges-list">
          {ACHIEVEMENT_CATALOG.map(achievement => {
            const isUnlocked = userStats.badges.some(b => b.id === achievement.id);
            const Icon = achievement.IconComponent;
            return (
              <div key={achievement.id} className={`badge-item glass-panel ${!isUnlocked ? 'locked' : ''}`}>
                <div className="badge-icon-wrapper" style={{ boxShadow: isUnlocked ? `0 0 15px ${achievement.color}40` : 'none' }}>
                  <Icon size={28} color={isUnlocked ? achievement.color : 'currentColor'} />
                  {!isUnlocked && (
                    <div className="lock-overlay glass-panel">
                      <Lock size={12} />
                    </div>
                  )}
                </div>
                <div className="badge-details">
                  <span className="badge-name">{achievement.name}</span>
                  <span className="badge-desc">{isUnlocked ? 'Unlocked!' : achievement.desc}</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    );
  };

  return (
    <div className="profile animate-fade-in">
      <div className="profile-header">
        <div className="profile-avatar">
          {userStats.name.charAt(0)}
        </div>
        <div className="profile-info">
          <h1>{userStats.name}</h1>
          <span className="profile-level">Level {userStats.level} Learner</span>
        </div>
        
        <div style={{ marginLeft: 'auto', position: 'relative' }}>
          <button 
            className="settings-btn glass-panel" 
            onClick={() => setShowSettings(!showSettings)}
            style={{ marginLeft: 0 }}
          >
            <Settings size={20} />
          </button>

          {showSettings && (
            <div className="settings-dropdown glass-panel animate-fade-in">
              <div className="dropdown-item" onClick={toggleTheme}>
                Appearance: {theme === 'dark' ? 'Dark' : 'Light'} Mode
              </div>
              <div className="dropdown-item" onClick={toggleNotifications}>
                Notifications: {notifications ? 'On' : 'Off'}
              </div>
              <div className="dropdown-separator"></div>
              <div className="dropdown-item text-danger" onClick={logout}>
                Log Out
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="stats-calendar glass-panel">
        <div className="stats-grid">
          <div className="stat-box">
            <Flame className="stat-icon flame" size={24} />
            <span className="box-val">{userStats.currentStreak}</span>
            <span className="box-lbl">Day Streak</span>
          </div>
          <div className="stat-box">
            <Zap className="stat-icon zap" size={24} />
            <span className="box-val">{userStats.xp}</span>
            <span className="box-lbl">Total XP</span>
          </div>
          <div className="stat-box">
            <CheckCircle className="stat-icon complete" size={24} />
            <span className="box-val">{userStats.completedLessons}</span>
            <span className="box-lbl">Lessons</span>
          </div>
        </div>
        {/* Complete Activity Heatmap */}
        {renderHeatmap()}
      </div>

      {renderAchievements()}
    </div>
  );
}
