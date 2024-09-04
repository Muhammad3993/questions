import { useOutletContext } from "react-router-dom";
import { Quizz } from "../../interfaces";
import { useEffect, useState } from "react";
import successSound from "../../assets/auido/success.wav";
import failedSound from "../../assets/auido/failed.wav";

const TwoLvl = () => {
  const { quiz } = useOutletContext<{ quiz: Quizz }>();
  // logical
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [score, setScore] = useState<number>(0);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [congratulations, setCongratulations] = useState<string>("");
  const [buttonsDisabled, setButtonsDisabled] = useState<boolean>(false);


  const playSuccessSound = () => {
    const audio = new Audio(successSound);
    audio.play();
  };

  const playFailedSound = () => {
    const audio = new Audio(failedSound);
    audio.play();
  };

  useEffect(() => {
    if (quiz?.questions.length > 0) {
      shuffleOptions();
    }
  }, [currentIndex, quiz.questions]);

  const shuffleArray = (array: string[]): string[] => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };
  

  const shuffleOptions = () => {
    const correctAnswer = quiz?.questions[currentIndex].defination;
    const wrongAnswers = quiz?.questions
      .filter((_, index) => index !== currentIndex)
      .map((question) => question.defination);
  
    const selectedWrongAnswers = shuffleArray(wrongAnswers).slice(0, 3);
  
    const options = shuffleArray([correctAnswer, ...selectedWrongAnswers]);
  
    setShuffledOptions(options);
  };
  

  const handleAnswerClick = (answer: string) => {
    if (buttonsDisabled) return;

    setButtonsDisabled(true);

    setCongratulations(answer);
    const newAnswers = [...userAnswers, answer];
    setUserAnswers(newAnswers);

    const correctAnswer = quiz?.questions[currentIndex].defination;
    if (answer === correctAnswer) {
      playSuccessSound();
    } else {
      playFailedSound();
    }

    if (currentIndex < quiz?.questions.length - 1) {
      setTimeout(() => {
        setCurrentIndex(currentIndex + 1);
        setCongratulations("");
        setButtonsDisabled(false);
      }, 2500);
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
    setTimeout(() => {
      setShowResult(true);
    }, 2500);
  };

  if (quiz?.questions.length === 0) {
    return <p>No questions available. Please add some questions first.</p>;
  }

  if (showResult) {
    const notstudied = quiz.questions.length - score;
    const studied = quiz.questions.length - notstudied;
    const percentage = Math.round((studied / quiz.questions.length) * 100);
    // if (score === quiz.questions.length) {
    return (
      <div className='result-container'>
        <div className='result_right'>
          <h1>Don't stop now, you're on a roll</h1>
        </div>
        <div className='result_left'>
          <div
            className='result_circle'
            style={{
              background: `conic-gradient(green ${percentage}%, red 0%)`,
            }}
          >
            <p className='result_circle_title'>{percentage}%</p>
          </div>
          <div className='result_box'>
            <div className='studied'>
              <p className='studied_title'>Studied</p>
              <div className='studied_border'>
                <p>{studied}</p>
              </div>
            </div>
            <div className='studied'>
              <p className='studied_title' style={{ color: "red" }}>
                Not studied
              </p>
              <div
                className='studied_border'
                style={{ color: "red", borderColor: "red" }}
              >
                <p>{notstudied}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
    // }
    // return (
    //   <div className='result-container'>
    //     <h2>Test Completed!</h2>
    //     <p>
    //       You answered {score} out of {quiz?.questions.length} questions
    //       correctly.
    //     </p>
    //   </div>
    // );
  }

  return (
    <div className='quiz_box'>
      <div className='flashcard-content'>
        <p>Term:</p>
        <h3 className='current_term'>{quiz?.questions[currentIndex].term}</h3>
        <div className='options'>
          {shuffledOptions &&
            shuffledOptions.map((option, index) => {
              let optionClass = "option-btn";

              if (congratulations) {
                if (option === quiz?.questions[currentIndex].defination) {
                  optionClass += " option-btn_success";
                } else if (option === congratulations) {
                  optionClass += " option-btn_error";
                } else {
                  optionClass += " option-btn_dimmed";
                }
              }
              return (
                <button
                  key={index}
                  className={optionClass}
                  onClick={() => handleAnswerClick(option)}
                  disabled={buttonsDisabled}
                >
                  {index + 1}. {option}
                </button>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default TwoLvl;
