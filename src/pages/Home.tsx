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

    const handleMouseDown = () => {
      setDrawing(true);
    };

    const handleMouseUp = () => {
      setDrawing(false);
      context.beginPath();
    };

    const handleMouseMove = (event: any) => {
      if (!drawing) return;

      context.lineWidth = 10;
      context.lineCap = "round";
      context.strokeStyle = "black";

      context.lineTo(
        event.clientX - canvas.offsetLeft,
        event.clientY - canvas.offsetTop,
      );
      context.stroke();
      context.beginPath();
      context.moveTo(
        event.clientX - canvas.offsetLeft,
        event.clientY - canvas.offsetTop,
      );
    };

    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mouseup", handleMouseUp);
    canvas.addEventListener("mousemove", handleMouseMove);

    return () => {
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mouseup", handleMouseUp);
      canvas.removeEventListener("mousemove", handleMouseMove);
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
