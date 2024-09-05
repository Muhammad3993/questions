import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Quiz, Quizz } from "../../interfaces";
import successSound from "../../assets/auido/success.wav";
import failedSound from "../../assets/auido/failed.wav";

const OneLvl = () => {
  const { quiz } = useOutletContext<{ quiz: Quizz }>();
  // logical
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const [userAnswer, setUserAnswer] = useState<string>("");
  const [score, setScore] = useState<number>(0);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [congratulations, setCongratulations] = useState<boolean>(false);
  const [dontKnow, setDontKnow] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const handleShowAnswer = () => {
    setShowAnswer(!showAnswer);
  };

  if (quiz?.questions.length === 0) {
    return <p>No questions available. Please add some questions first.</p>;
  }

  const playSuccessSound = () => {
    const audio = new Audio(successSound);
    audio.play();
  };

  const playFailedSound = () => {
    const audio = new Audio(failedSound);
    audio.play();
  };

  const handleDontKnow = () => {
    setDontKnow(true);
    setError(true);
    playFailedSound();
    if (currentIndex + 1 < quiz?.questions.length) {
      setTimeout(() => {
        setCurrentIndex(currentIndex + 1);
        setCongratulations(false);
        setError(false);
        setDontKnow(false);
      }, 2500);
      setUserAnswer("");
      setShowAnswer(false);
    } else {
      setTimeout(() => {
        setShowResult(true);
      }, 2500);
    }
  };

  const handleNext = () => {
    const currentQuestion: Quiz | undefined = quiz?.questions[currentIndex];
    if (userAnswer === "") {
      setDontKnow(true);
      setError(true);
      playFailedSound();
    }
    if (
      userAnswer.trim().toLowerCase() ===
      currentQuestion?.defination.trim().toLowerCase()
    ) {
      setCongratulations(true);
      setScore(score + 1);
      playSuccessSound();
    } else {
      setCongratulations(false);
      setTimeout(() => {
        setDontKnow(false);
      }, 2500);
      playFailedSound();
      setError(true);
      // alert(`Incorrect! The correct answer is: ${currentQuestion?.defination}`);
    }
    if (currentIndex + 1 < quiz?.questions.length) {
      setTimeout(() => {
        setCurrentIndex(currentIndex + 1);
        setCongratulations(false);
        setError(false);
      }, 2500);
      setUserAnswer("");
      setShowAnswer(false);
    } else {
      setTimeout(() => {
        setShowResult(true);
      }, 2500);
    }
  };

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

  const currentQuestion: Quiz | undefined = quiz?.questions[currentIndex];

  const hintDash = currentQuestion.defination
    .split(" ")
    .map((word) => word[0] + " _ ".repeat(word.length - 1))
    .join(" ");

  return (
    <div>
      <div className='quiz_box'>
        <div className='flashcard-content'>
          <p>Term</p>
          <h3 className='current_term'>{currentQuestion?.term}</h3>
          {showAnswer && (
            <div className='current_defination'>
              <p>Hint</p>
              <p>{hintDash}</p>
            </div>
          )}
        </div>
        {!showAnswer ? (
          <button onClick={handleShowAnswer} className='flashcard-btn'>
            Show Hint
          </button>
        ) : (
          ""
        )}
        <div className='user-answer'>
          {!congratulations ? (
            <p>Your answer</p>
          ) : (
            <p style={{ color: "greenyellow" }}>Awesome</p>
          )}
          {!congratulations && !error ? (
            <div className='quiz_input'>
              <input
                type='text'
                placeholder='Your answer'
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
              />
            </div>
          ) : (
            <div
              className='quiz_input'
              style={{ border: `1px solid ${!error ? "greenyellow" : "red"} ` }}
            >
              <p style={{ color: `${!error ? "greenyellow" : "red"}` }}>
                {!error ? "Successfully !!!!!" : "Eror"}
              </p>
            </div>
          )}
        </div>
        {dontKnow || error ? (
          <div
            className='quiz_input quiz_input_error'
            style={{ height: "max-content", border: "3px dashed greenyellow", }}
          >
            <p>Correct answer: {currentQuestion.defination}</p>
          </div>
        ) : (
          <div className='quiz_bottom'>
            <button onClick={handleDontKnow} className='flashcard-btn'>
              Don't know ?
            </button>
            <button
              type='submit'
              onClick={handleNext}
              className='flashcard-btn'
            >
              {currentIndex + 1 < quiz.questions.length ? "Answer" : "Finish"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OneLvl;
