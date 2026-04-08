import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Compass, User, BookOpen } from 'lucide-react';
import './BottomNav.css';

export default function BottomNav() {
  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/explore', icon: Compass, label: 'Explore' },
    { path: '/lesson', icon: BookOpen, label: 'Learn' },
    { path: '/profile', icon: User, label: 'Profile' },
  ];

  return (
    <nav className="bottom-nav glass-panel">
      {navItems.map((item) => (
        <NavLink 
          key={item.path} 
          to={item.path} 
          className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
        >
          <item.icon size={24} className="nav-icon" />
          <span className="nav-label">{item.label}</span>
          <div className="active-indicator"></div>
        </NavLink>
      ))}
    </nav>
  );
}
