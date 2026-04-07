import { useEffect, useState } from "react";
import axios from "axios";

export default function LessonList() {
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    const fetchLessons = async () => {
      const res = await axios.get("http://localhost:5000/api/lessons");
      setLessons(res.data);
    };
    fetchLessons();
  }, []);

  return (
    <div>
      <h2>Lessons</h2>
      {lessons.map((lesson) => (
        <div key={lesson._id}>
          <h3>{lesson.title}</h3>
          <p>{lesson.content}</p>
        </div>
      ))}
    </div>
  );
}