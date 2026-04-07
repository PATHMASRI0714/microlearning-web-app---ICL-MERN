import { useState } from "react";

export default function Flashcard({ question, answer }) {
  const [flip, setFlip] = useState(false);

  return (
    <div
      onClick={() => setFlip(!flip)}
      style={{
        border: "1px solid black",
        padding: "20px",
        margin: "10px",
        cursor: "pointer",
      }}
    >
      {flip ? answer : question}
    </div>
  );
}