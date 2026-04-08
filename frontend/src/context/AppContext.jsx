import React, { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [userStats, setUserStats] = useState(null);
  const [todaysLesson, setTodaysLesson] = useState(null);
  const [topicsGrid, setTopicsGrid] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsLoading(false);
    }
  }, []);

  const getHeaders = () => {
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    };
  };

  useEffect(() => {
    const fetchAllData = async () => {
      if (!isAuthenticated) return;
      setIsLoading(true);
      try {
        const [profileRes, lessonRes, topicsRes] = await Promise.all([
          fetch('/api/users/profile', { headers: getHeaders() }),
          fetch('/api/lessons/daily', { headers: getHeaders() }),
          fetch('/api/topics', { headers: getHeaders() })
        ]);
        
        if (profileRes.status === 401) {
          logout();
          return;
        }

        const profileData = await profileRes.json();
        const lessonData = await lessonRes.json();
        const topicsData = await topicsRes.json();
        
        setUserStats(profileData.userStats);
        setTodaysLesson(lessonData.todaysLesson);
        setTopicsGrid(topicsData.topicsGrid);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchAllData();
  }, [isAuthenticated]);

  const login = async (username, password) => {
    setIsLoading(true);
    setAuthError(null);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      
      if (data.success) {
        localStorage.setItem('token', data.token);
        setUserStats(data.userStats);
        setIsAuthenticated(true);
        return true;
      } else {
        setAuthError(data.message);
        return false;
      }
    } catch (error) {
      setAuthError("Failed to connect to server");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (username, password) => {
    setIsLoading(true);
    setAuthError(null);
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      
      if (data.success) {
        localStorage.setItem('token', data.token);
        setUserStats(data.userStats);
        setIsAuthenticated(true);
        return true;
      } else {
        setAuthError(data.message);
        return false;
      }
    } catch (error) {
      setAuthError("Failed to connect to server");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUserStats(null);
  };

  const completeLesson = async (xpReward) => {
    try {
      const res = await fetch('/api/users/complete-lesson', {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ xpReward })
      });
      const data = await res.json();
      if (data.success) {
        setUserStats(data.userStats);
      }
    } catch (error) {
      console.error("Failed to complete lesson", error);
    }
  };

  const progressTopic = async (topicId) => {
    try {
      const res = await fetch('/api/topics/progress', {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ topicId })
      });
      const data = await res.json();
      if (data.success) {
        setTopicsGrid(data.topicsGrid);
      }
    } catch (error) {
      console.error("Failed to progress topic", error);
    }
  };

  return (
    <AppContext.Provider value={{ 
      userStats, todaysLesson, topicsGrid, isLoading, 
      completeLesson, progressTopic, 
      isAuthenticated, login, register, logout, authError 
    }}>
      {children}
    </AppContext.Provider>
  );
};
