import { NavLink, Outlet, useLocation, useParams } from "react-router-dom";
import { useAppSelector } from "../redux";
import { Quizz } from "../interfaces";

const DetailLayout = () => {
  const { id } = useParams();
  const quizzes: Quizz[] = useAppSelector((state) => state.quiz.quizzes);
  const quiz: Quizz | undefined = quizzes.find((quiz) => quiz.id === id);

  return (
    <div className='container'>
      <h1 style={{ color: "#fff", marginTop: "20px" }}>{quiz?.title}</h1>
      <div className="detailsLinks">
        <NavLink to='' className={"detailsLink"}>Flashcard</NavLink>
        <NavLink to='one-lvl' className={"detailsLink"}>One Level</NavLink>
        <NavLink to='two-lvl' className={"detailsLink"}>Two Level</NavLink>
      </div>
      <main>
        <Outlet context={{ quiz }} />
      </main>
    </div>
  );
};

export default DetailLayout;
