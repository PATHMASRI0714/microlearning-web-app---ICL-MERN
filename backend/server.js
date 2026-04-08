require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/User');
let { todaysLesson, topicLessons, topicsGrid } = require('./data');

mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/micro-learning')
  .then(() => console.log("Connected to MongoDB established"))
  .catch((err) => console.error("MongoDB connection fail:", err));

const app = express();

app.use(cors());
app.use(express.json());

// Delay middleware to simulate network latency
app.use((req, res, next) => {
  setTimeout(next, 300);
});

// Helper to get user from token (Async now)
const getUserFromReq = async (req) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return null;
  const token = authHeader.split(' ')[1];
  if (!token || !token.startsWith('mock-token-')) return null;
  
  const username = token.replace('mock-token-', '');
  // Case-insensitive mongoose search
  return await User.findOne({ username: { $regex: new RegExp(`^${username}$`, 'i') } });
};

// Auth endpoints
const evaluateAchievements = (stats) => {
  const evaluateBadge = (id, icon, name, condition) => {
    if (condition && !stats.badges.find(b => b.id === id)) {
      stats.badges.push({ id, name, icon });
    }
  };

  evaluateBadge('b1', 'zap', 'Fast Learner', stats.completedLessons >= 10);
  evaluateBadge('b2', 'fire', '7-Day Streak', stats.currentStreak >= 7 || stats.longestStreak >= 7);
  evaluateBadge('b3', 'globe', 'Polyglot', stats.level >= 5);
  evaluateBadge('b4', 'star', 'Dedicated', stats.level >= 10);
  evaluateBadge('b5', 'target', 'Mastermind', (stats.totalXp || 0) >= 5000);
  evaluateBadge('b6', 'crown', 'Champion', stats.completedLessons >= 50);
};
app.post('/api/auth/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username: { $regex: new RegExp(`^${username}$`, 'i') } });
    if (user && user.password === password) {
      return res.json({ success: true, token: `mock-token-${user.username}`, userStats: user.stats });
    } else {
      return res.status(401).json({ success: false, message: 'Invalid username or password' });
    }
  } catch(err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.post('/api/auth/register', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ success: false, message: 'Username and password required' });
  }
  
  try {
    const existing = await User.findOne({ username: { $regex: new RegExp(`^${username}$`, 'i') } });
    if (existing) {
      return res.status(400).json({ success: false, message: 'Username already taken' });
    }
    
    const newUser = await User.create({ 
      username, 
      password,
      stats: { name: username } 
    });
    return res.json({ success: true, token: `mock-token-${newUser.username}`, userStats: newUser.stats });
  } catch(err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Protected Users endpoints
app.get('/api/users/profile', async (req, res) => {
  const user = await getUserFromReq(req);
  if (!user) return res.status(401).json({ success: false, message: 'Unauthorized' });
  res.json({ userStats: user.stats });
});

app.post('/api/users/complete-lesson', async (req, res) => {
  const user = await getUserFromReq(req);
  if (!user) return res.status(401).json({ success: false, message: 'Unauthorized' });

  const { xpReward } = req.body;
  const stats = user.stats;
  
  if (xpReward) {
    stats.xp += xpReward;
    stats.totalXp = (stats.totalXp || 0) + xpReward;
    if (stats.xp >= stats.nextLevelXp) {
      stats.level += 1;
      stats.xp = stats.xp - stats.nextLevelXp;
      stats.nextLevelXp = Math.floor(stats.nextLevelXp * 1.5);
    }
  }
  
  stats.completedLessons += 1;
  stats.currentStreak += 1;
  if(stats.currentStreak > stats.longestStreak) {
    stats.longestStreak = stats.currentStreak;
  }

  // Increment today's activity setting
  let todayActivity = stats.recentActivity[27];
  if (todayActivity < 4) {
    stats.recentActivity.set(27, todayActivity + 1);
  }
  
  evaluateAchievements(stats);

  await user.save();
  res.json({ success: true, userStats: stats });
});

// Lessons endpoints
app.get('/api/lessons/daily', (req, res) => {
  res.json({ todaysLesson });
});

app.get('/api/lessons/topic/:topicId', (req, res) => {
  const { topicId } = req.params;
  const lesson = topicLessons && topicLessons[topicId];
  if (lesson) {
    res.json({ lesson });
  } else {
    // Generate a fallback generic lesson if not explicitly mapped
    const topicData = topicsGrid.find(t => t.id === topicId);
    if (!topicData) return res.status(404).json({ success: false, message: 'Topic not found' });
    
    res.json({ 
      lesson: {
        id: `tl_${topicId}`,
        topic: topicData.title,
        title: `Basics of ${topicData.title}`,
        estimatedTime: '2 min',
        xpReward: 20,
        flashcards: [
          { id: 'f1', question: `What is the primary goal of ${topicData.title}?`, answer: `To solve complex problems in the domain of ${topicData.title}.` },
          { id: 'f2', question: `Why is ${topicData.title} important?`, answer: 'Because it is a foundational skill in tech.' }
        ]
      }
    });
  }
});

// Topics endpoints
app.get('/api/topics', async (req, res) => {
  const user = await getUserFromReq(req);
  if (!user) return res.status(401).json({ success: false, message: 'Unauthorized' });

  const userTopicsGrid = topicsGrid.map(topic => {
    let progress = 0;
    if (user.stats.topicProgress && user.stats.topicProgress.get(topic.id)) {
      progress = user.stats.topicProgress.get(topic.id);
    }
    return { ...topic, progress };
  });

  res.json({ topicsGrid: userTopicsGrid });
});

// Increment topic progress
app.post('/api/topics/progress', async (req, res) => {
  const user = await getUserFromReq(req);
  if (!user) return res.status(401).json({ success: false, message: 'Unauthorized' });

  const { topicId } = req.body;
  const topic = topicsGrid.find(t => t.id === topicId);
  if (topic) {
    let currentProgress = 0;
    if (user.stats.topicProgress && user.stats.topicProgress.get(topicId)) {
      currentProgress = user.stats.topicProgress.get(topicId);
    }
    const newProgress = Math.min(100, currentProgress + 10);
    user.stats.topicProgress.set(topicId, newProgress);
    await user.save();
  }

  const userTopicsGrid = topicsGrid.map(t => {
    let progress = 0;
    if (user.stats.topicProgress && user.stats.topicProgress.get(t.id)) {
      progress = user.stats.topicProgress.get(t.id);
    }
    return { ...t, progress };
  });

  res.json({ success: true, topicsGrid: userTopicsGrid });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
