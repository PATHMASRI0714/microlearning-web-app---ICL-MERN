import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Code, Database, Layers, Cloud, Cpu, Server, Play } from 'lucide-react';
import { AppContext } from '../context/AppContext';
import './Explore.css';

const IconMap = {
  code: Code,
  database: Database,
  layers: Layers,
  cloud: Cloud,
  cpu: Cpu,
  server: Server
};

export default function Explore() {
  const [searchTerm, setSearchTerm] = useState('');
  const { topicsGrid, isLoading } = useContext(AppContext);
  const navigate = useNavigate();

  if (isLoading || !topicsGrid) {
    return <div className="explore animate-fade-in"><p>Loading topics...</p></div>;
  }

  const filteredTopics = topicsGrid.filter(t => 
    t.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="explore animate-fade-in">
      <div className="explore-header">
        <h1>Explore <span className="gradient-text">Topics</span></h1>
        
        <div className="search-bar glass-panel">
          <Search size={20} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search for subjects..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="topics-grid">
        {filteredTopics.map((topic) => {
          const IconComponent = IconMap[topic.icon] || Code;
          return (
            <div key={topic.id} className="topic-grid-item glass-panel" style={{ '--topic-color': topic.color }}>
              <div className="topic-icon-lg" style={{ backgroundColor: `${topic.color}20`, color: topic.color }}>
                <IconComponent size={28} />
              </div>
              <h3>{topic.title}</h3>
              <div className="topic-stats">
                <span className="progress-text">{topic.progress}% Mastered</span>
              </div>
              <button 
                className="start-btn" 
                style={{ borderColor: topic.color, color: topic.color }}
                onClick={() => navigate(`/lesson?topic=${topic.id}`)}
              >
                <Play size={14} fill="currentColor" /> {topic.progress > 0 ? 'Continue' : 'Start'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
