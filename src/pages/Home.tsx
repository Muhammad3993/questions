import { Link } from "react-router-dom";
import { Quizz } from "../interfaces";
import { useAppSelector } from "../redux";
import { useEffect, useState } from "react";

interface TelegramUser {
  id: number;
  first_name: string;
  username?: string; // Optional if the user doesn't have a username
}

const Home = () => {
  const quizzes: Quizz[] = useAppSelector((state) => state.quiz.quizzes);

  const [user, setUser] = useState<TelegramUser | null>(null);

  useEffect(() => {
    if (window.Telegram && window.Telegram.WebApp) {
      const tg = window.Telegram.WebApp;
      tg.ready();

      const userData = tg.initDataUnsafe.user;

      if (userData) {
        setUser({
          id: userData.id,
          first_name: userData.first_name,
          username: userData.username,
        });
      }
    }
  }, []);

  return (
    <>
      <div className='container'>
        <div className='title_row'>
          <h1>List | {user && user}</h1>
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
      </div>
      <div className='App'>
        <h1>Telegram Mini App</h1>
        {user ? (
          <h2>Salom, {user.first_name}!</h2>
        ) : (
          <h2>Foydalanuvchi ma'lumotlari olinmadi.</h2>
        )}
      </div>
    </>
  );
};

export default Home;
