import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { X, Check } from 'lucide-react';
import { AppContext } from '../context/AppContext';
import './Lesson.css';

export default function Lesson() {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const topicId = searchParams.get('topic');

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeLesson, setActiveLesson] = useState(null);
  const [lessonLoading, setLessonLoading] = useState(true);
  
  const { todaysLesson, completeLesson, progressTopic, isLoading, isAuthenticated } = useContext(AppContext);

  useEffect(() => {
    const fetchLesson = async () => {
      if (!isAuthenticated) return;
      
      if (topicId) {
        try {
          const res = await fetch(`/api/lessons/topic/${topicId}`, {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
          });
          const data = await res.json();
          if (data.lesson) {
            setActiveLesson(data.lesson);
          } else {
            setActiveLesson(todaysLesson);
          }
        } catch (e) {
          console.error(e);
          setActiveLesson(todaysLesson);
        }
      } else {
        setActiveLesson(todaysLesson);
      }
      setLessonLoading(false);
    };
    
    if (todaysLesson) {
      fetchLesson();
    }
  }, [topicId, todaysLesson, isAuthenticated]);

  useEffect(() => {
    if (activeLesson) {
      setProgress((currentIndex / activeLesson.flashcards.length) * 100);
    }
  }, [currentIndex, activeLesson]);

  if (isLoading || lessonLoading || !activeLesson) {
    return <div className="lesson-view"><p>Loading lesson...</p></div>;
  }

  const totalCards = activeLesson.flashcards.length;
  const currentCard = activeLesson.flashcards[currentIndex];

  const handleNext = () => {
    if (currentIndex < totalCards - 1) {
      setIsFlipped(false);
      setTimeout(() => {
        setCurrentIndex(prev => prev + 1);
      }, 300); // Wait for unflip animation
    } else {
      // Finish lesson
      setProgress(100);
      completeLesson(activeLesson.xpReward);
      
      if (topicId) {
        progressTopic(topicId); // Complete the specific topic!
      }
      
      setTimeout(() => {
        navigate('/'); // Go back to dashboard on completion
      }, 1000);
    }
  };

  return (
    <div className="lesson-view animate-fade-in">
      <div className="lesson-header">
        <button className="close-btn" onClick={() => navigate(-1)}><X size={24} /></button>
        <div className="lesson-progress-bar">
          <div className="lesson-progress-fill" style={{ width: `${progress}%` }}></div>
        </div>
      </div>

      <div className="lesson-content">
        <div className="lesson-meta">
          <span className="lesson-topic">{activeLesson.topic}</span>
          <h2>{activeLesson.title}</h2>
        </div>

        <div className={`flashcard-container ${isFlipped ? 'flipped' : ''}`} onClick={() => setIsFlipped(!isFlipped)}>
          <div className="flashcard-inner">
            <div className="flashcard-front glass-panel">
              <p className="card-lbl">Question {currentIndex + 1} of {totalCards}</p>
              <h3>{currentCard.question}</h3>
              <p className="tap-hint">Tap to flip</p>
            </div>
            <div className="flashcard-back glass-panel">
              <p className="card-lbl">Answer</p>
              <h3>{currentCard.answer}</h3>
              <div className="action-buttons">
                <button className="next-btn pulse-button" onClick={(e) => { e.stopPropagation(); handleNext(); }}>
                  {currentIndex === totalCards - 1 ? <><Check size={20} /> Finish</> : 'Next'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
