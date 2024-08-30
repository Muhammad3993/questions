import { useOutletContext } from "react-router-dom";
import { Quizz } from "../../interfaces";
import { useEffect, useState } from "react";

const TwoLvl = () => {
  const { quiz } = useOutletContext<{ quiz: Quizz }>();
  // logical
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [score, setScore] = useState<number | null>(null);

  useEffect(() => {
    if (quiz?.questions.length > 0) {
      shuffleOptions();
    }
  }, [currentIndex, quiz.questions]);

  const shuffleOptions = () => {
    const correctAnswer = quiz?.questions[currentIndex].defination;
    const wrongAnswers = quiz?.questions
      .filter((_, index) => index !== currentIndex)
      .map((question) => question.defination)
      .sort(() => Math.random() - 0.5);

    const options = [correctAnswer, ...wrongAnswers].sort(
      () => Math.random() - 0.5,
    );
    setShuffledOptions(options);
  };

  const handleAnswerClick = (answer: string) => {
    const newAnswers = [...userAnswers, answer];
    setUserAnswers(newAnswers);

    if (currentIndex < quiz?.questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      calculateScore(newAnswers);
    }
  };

  const calculateScore = (answers: string[]) => {
    let correctCount = 0;

    answers.forEach((answer, index) => {
      const correctAnswer = quiz?.questions[index].defination;
      if (answer === correctAnswer) {
        correctCount++;
      }
    });
    setScore(correctCount);
  };

  if (quiz?.questions.length === 0) {
    return <p>No questions available. Please add some questions first.</p>;
  }

  if (score !== null) {
    return (
      <div>
        <h2>Quiz Complete</h2>
        <p>
          You got {score} out of {quiz?.questions.length} correct!
        </p>
      </div>
    );
  }


  return (
    <div className='flashcard-container'>
      <div className='flashcard'>
        <div className='flashcard-content'>
          <h3>Term:</h3>
          <p>{quiz?.questions[currentIndex].term}</p>
          <div className='options'>
            {shuffledOptions && shuffledOptions.map((option, index) => (
              <button
                key={index}
                className='option-btn'
                onClick={() => handleAnswerClick(option)}
              >
                {String.fromCharCode(65 + index)}. {option}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TwoLvl;
