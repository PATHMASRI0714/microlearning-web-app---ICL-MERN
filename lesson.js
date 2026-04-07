const router = require("express").Router();
const Lesson = require("../models/Lesson");

// ➕ Create lesson
router.post("/", async (req, res) => {
  try {
    const newLesson = new Lesson(req.body);
    const saved = await newLesson.save();
    res.status(200).json(saved);
  } catch (err) {
    res.status(500).json(err);
  }
});

// 📥 Get all lessons
router.get("/", async (req, res) => {
  try {
    const lessons = await Lesson.find();
    res.status(200).json(lessons);
  } catch (err) {
    res.status(500).json(err);
  }
});

// 📥 Get one lesson
router.get("/:id", async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id);
    res.status(200).json(lesson);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;