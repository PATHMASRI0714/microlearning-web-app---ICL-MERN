const mongoose = require('mongoose');

const BadgeSchema = new mongoose.Schema({
  id: String,
  name: String,
  icon: String
}, { _id: false });

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  stats: {
    name: { type: String },
    level: { type: Number, default: 1 },
    xp: { type: Number, default: 0 },
    totalXp: { type: Number, default: 0 },
    nextLevelXp: { type: Number, default: 100 },
    currentStreak: { type: Number, default: 0 },
    longestStreak: { type: Number, default: 0 },
    completedLessons: { type: Number, default: 0 },
    badges: [BadgeSchema],
    recentActivity: { 
      type: [Number], 
      default: () => Array(28).fill(0) 
    },
    topicProgress: {
      type: Map,
      of: Number,
      default: () => ({})
    }
  }
});

module.exports = mongoose.model('User', UserSchema);
