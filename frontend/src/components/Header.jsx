import React, { useContext } from 'react';
import { Flame, Zap, LogOut } from 'lucide-react';
import { AppContext } from '../context/AppContext';
import './Header.css';

export default function Header() {
  const { userStats, logout } = useContext(AppContext);

  if (!userStats) return <header className="app-header glass-panel"></header>;

  const xpPercentage = (userStats.xp / userStats.nextLevelXp) * 100;

  return (
    <header className="app-header glass-panel">
      <div className="header-left">
        <div className="level-badge">Lvl {userStats.level}</div>
        <div className="xp-container">
          <div className="xp-text">
            <span><Zap size={14} className="xp-icon"/> {userStats.xp}</span>
            <span className="xp-max">/ {userStats.nextLevelXp} XP</span>
          </div>
          <div className="xp-bar-bg">
            <div className="xp-bar-fill" style={{ width: `${xpPercentage}%` }}></div>
          </div>
        </div>
      </div>
      
      <div className="header-right">
        <div className="streak-badge">
          <Flame size={20} className="flame-icon animated-flame" />
          <span>{userStats.currentStreak}</span>
        </div>
        <div className="avatar">
          {userStats.name.charAt(0)}
        </div>
        <button onClick={logout} className="logout-btn" style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', marginLeft: '8px' }}>
          <LogOut size={20} />
        </button>
      </div>
    </header>
  );
}
