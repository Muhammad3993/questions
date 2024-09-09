import { Link } from "react-router-dom";
import { Quizz } from "../interfaces";
import { useAppSelector } from "../redux";
import { useEffect, useState } from "react";

const Home = () => {
  const quizzes: Quizz[] = useAppSelector((state) => state.quiz.quizzes);

  const [user, setUser] = useState(null);
  const [isTelegram, setIsTelegram] = useState(false);

  useEffect(() => {
    // Telegram WebApp API'ni faqat Telegram ilovasi orqali ishlatish uchun tekshirish
    if (window.Telegram && window.Telegram.WebApp) {
      const tg = window.Telegram.WebApp;
      tg.ready();
      setIsTelegram(true); // Telegram'da ekanligimizni belgilash

      const initDataUnsafe = tg.initDataUnsafe;
      const user = initDataUnsafe?.user;

      if (user) {
        setUser({
          firstName: user.first_name || "Foydalanuvchi",
          username: user.username || "Username mavjud emas",
          telegramId: user.id,
        });
      }
    }
  }, []);

  return (
    <>
      <div className='container'>
        <div className='title_row'>
          <h1>List | {user?.firstName}</h1>
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
        {isTelegram ? (
          user ? (
            <h2>Salom, {user.firstName}!</h2>
          ) : (
            <h2>Foydalanuvchi ma'lumotlari olinmadi.</h2>
          )
        ) : (
          <h2>Telegram ilovasi orqali oching.</h2>
        )}
      </div>
    </>
  );
};

export default Home;
