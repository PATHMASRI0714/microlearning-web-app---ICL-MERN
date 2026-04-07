const mongoose = require("mongoose");

const LessonSchema = new mongoose.Schema({
  title: String,
  content: String, // 2-minute lesson text
  flashcards: [
    {
      question: String,
      answer: String,
    },
  ],
});

module.exports = mongoose.model("Lesson", LessonSchema);