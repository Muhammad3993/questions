import { Link } from "react-router-dom";
import { Quizz } from "../interfaces";
import { useAppSelector } from "../redux";

const Home = () => {
  const quizzes: Quizz[] = useAppSelector((state) => state.quiz.quizzes);
  return (
    <div className='container'>
      <div className='title_row'>
        <h1>List</h1>
        <div style={{display: "flex", gap: 20}}>
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
    </div>
  );
};

export default Home;
