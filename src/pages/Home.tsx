import { Link } from "react-router-dom";
import { Quizz } from "../interfaces";
import { useAppSelector } from "../redux";
import { useEffect, useRef, useState } from "react";

const Home = () => {
  const canvasRef = useRef(null);
  const [drawing, setDrawing] = useState(false);

  useEffect(() => {
    const canvas: any = canvasRef.current;
    const context = canvas.getContext("2d");

    const handleStart = () => {
      setDrawing(true);
    };

    const handleEnd = () => {
      setDrawing(false);
      context.beginPath();
    };

    const handleMove = (event: any) => {
      if (!drawing) return;

      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      context.lineWidth = 5;
      context.lineCap = "round";
      context.strokeStyle = "black";

      context.lineTo(x, y);
      context.stroke();
      context.beginPath();
      context.moveTo(x, y);
    };

    // Mouse events
    canvas.addEventListener("mousedown", handleStart);
    canvas.addEventListener("mouseup", handleEnd);
    canvas.addEventListener("mousemove", handleMove);

    // Touch events
    canvas.addEventListener("touchstart", (e: any) => {
      e.preventDefault();
      handleStart(e);
    });
    canvas.addEventListener("touchend", handleEnd);
    canvas.addEventListener("touchmove", (e: any) => {
      e.preventDefault();
      handleMove(e.touches[0]);
    });

    return () => {
      canvas.removeEventListener("mousedown", handleStart);
      canvas.removeEventListener("mouseup", handleEnd);
      canvas.removeEventListener("mousemove", handleMove);
      canvas.removeEventListener("touchstart", handleStart);
      canvas.removeEventListener("touchend", handleEnd);
      canvas.removeEventListener("touchmove", (e: any) => {
        e.preventDefault();
        handleMove(e.touches[0]);
      });
    };
  }, [drawing]);

  const quizzes: Quizz[] = useAppSelector((state) => state.quiz.quizzes);
  return (
    <div className='container'>
      <div className='title_row'>
        <h1>List</h1>
        <div style={{ display: "flex", gap: 20 }}>
          <Link to={"/language"} className='link_title'>
            Language
          </Link>
          <Link to={"/create-quiz"} className='link_title'>
            Create Flashcard
          </Link>
        </div>
      </div>
      <div className='quizes'>
        {quizzes.map((quiz) => (
          <Link to={`/details/${quiz.id}`} key={quiz.id} className='quiz'>
            <h2>{quiz.title}</h2>
            <p>{quiz.questions.length} questions</p>
          </Link>
        ))}
      </div>

      <div>
        <canvas
          ref={canvasRef}
          width={500}
          height={500}
          style={{ border: "1px solid black" }}
        />
      </div>
    </div>
  );
};

export default Home;
