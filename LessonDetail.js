import { useEffect, useState } from "react";
import axios from "axios";
import Flashcard from "./Flashcard";

export default function LessonDetail({ id }) {
  const [lesson, setLesson] = useState(null);

  useEffect(() => {
    const fetchLesson = async () => {
      const res = await axios.get(
        `http://localhost:5000/api/lessons/${id}`
      );
      setLesson(res.data);
    };
    fetchLesson();
  }, [id]);

  if (!lesson) return <p>Loading...</p>;

  return (
    <div>
      <h2>{lesson.title}</h2>
      <p>{lesson.content}</p>

      <h3>Flashcards</h3>
      {lesson.flashcards.map((card, index) => (
        <Flashcard
          key={index}
          question={card.question}
          answer={card.answer}
        />
      ))}
    </div>
  );
}