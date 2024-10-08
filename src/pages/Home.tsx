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
  const [message, setMessage] = useState("Mini-ilovaga xush kelibsiz!!");

  useEffect(() => {
    // Dynamically load the Telegram Web App script
    const script = document.createElement("script");
    script.src = "https://telegram.org/js/telegram-web-app.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      const tg = window.Telegram?.WebApp;
      if (tg) {
        tg.ready();

        const userData = tg.initDataUnsafe?.user;
        if (userData) {
          const firstName = userData.first_name || "Foydalanuvchi";
          const username = userData.username || "Username mavjud emas";

          setUser({
            id: userData.id,
            first_name: firstName,
            username: username,
          });

          fetch("https://668cf8d5099db4c579f12c4b.mockapi.io/users/users", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              telegramId: userData.id,
              firstName: firstName,
              username: username,
            }),
          })
            .then((response) => response.json())
            .then((data) => {
              console.log("Foydalanuvchi ma'lumotlari yuborildi:", data);
              setMessage(firstName);
            })
            .catch((error) => {
              console.error("Xato yuz berdi:", error);
              setMessage("Xatolik");
            });
        } else {
          setMessage("Ma`lumotsiz");
        }
      }
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      <div className='container'>
        <div className='title_row'>
          <h1>List</h1>
          <p>{message}</p>
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
