import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Quiz, Quizz } from "../../interfaces";

const OneLvl = () => {
  const { quiz } = useOutletContext<{quiz: Quizz}>();
  // logical
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const [userAnswer, setUserAnswer] = useState("");
  const [score, setScore] = useState<number>(0);
  const [showResult, setShowResult] = useState<boolean>(false);

  const handleShowAnswer = () => {
    setShowAnswer(!showAnswer);
  };

  if (quiz?.questions.length === 0) {
    return <p>No questions available. Please add some questions first.</p>;
  }

  const handleNext = () => {
    const currentQuestion: Quiz | undefined = quiz?.questions[currentIndex];
    if (
      userAnswer.trim().toLowerCase() ===
      currentQuestion?.defination.trim().toLowerCase()
    ) {
      setScore(score + 1);
      alert("Correct!");
    } else {
      alert(`Incorrect! The correct answer is: ${currentQuestion?.defination}`);
    }

    if (currentIndex + 1 < quiz?.questions.length) {
      setCurrentIndex(currentIndex + 1);
      setUserAnswer("");
      setShowAnswer(false);
    } else {
      setShowResult(true);
    }
  };

  if (showResult) {
    return (
      <div className='result-container'>
        <h2>Test Completed!</h2>
        <p>
          You answered {score} out of {quiz?.questions.length} questions
          correctly.
        </p>
      </div>
    );
  }

  const currentQuestion: Quiz | undefined = quiz?.questions[currentIndex];

  return (
    <div className='container'>
      <h1>Details</h1>
      <h3>{quiz?.title}</h3>
      <div>
        <div className='flashcard'>
          <div className='flashcard-content'>
            <h3>Term:</h3>
            <p>{currentQuestion?.term}</p>
            {showAnswer && (
              <>
                <h3>Definition:</h3>
                <p>{currentQuestion?.defination}</p>
              </>
            )}
          </div>
          <button onClick={handleShowAnswer} className='flashcard-btn'>
            {showAnswer ? "Hide Answer" : "Show Answer"}
          </button>
          <div className='user-answer'>
            <input
              type='text'
              placeholder='Your answer'
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
            />
          </div>
          <button type='submit' onClick={handleNext} className='flashcard-btn'>
            {currentIndex + 1 < quiz.questions.length ? "Next" : "Finish"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OneLvl;
