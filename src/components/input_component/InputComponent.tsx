// css
import { useState } from "react";
import "./inputComponent.css";
import { addQuiz } from "../../redux/slices/quizSlice";
import { useAppDispatch } from "../../redux";
import { useNavigate } from "react-router-dom";
import { Quizz } from "../../interfaces";
import { LuTrash } from "react-icons/lu";

const InputComponent = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [questionsRow, setQuestionsRow] = useState<
    { term: string; defination: string }[]
  >([{ term: "", defination: "" }]);

  const handleAddQuestion = () => {
    setQuestionsRow([...questionsRow, { term: "", defination: "" }]);
  };

  const handleRemoveQuestion = (index: number) => {
    if (questionsRow.length > 1) {
      setQuestionsRow(questionsRow.filter((_, i) => i !== index));
    }
  };

  const handleTermChange = (index: number, value: string) => {
    const updateQuestionsRow = [...questionsRow];
    updateQuestionsRow[index].term = value;
    setQuestionsRow(updateQuestionsRow);
  };

  const handleDefinationChange = (index: number, value: string) => {
    const updatedQuestionsRow = [...questionsRow];
    updatedQuestionsRow[index].defination = value;
    setQuestionsRow(updatedQuestionsRow);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Please enter a title for the quiz.");
      return;
    }

    if (questionsRow.some((q) => !q.term.trim() || !q.defination.trim())) {
      alert("Please fill out all fields for each question.");
      return;
    }

    const newQuiz: Quizz = {
      id: Math.random().toString(36).substr(2, 9),
      title: title,
      questions: questionsRow.map((questionRow) => ({
        id: Math.random().toString(36).substr(2, 9),
        term: questionRow.term,
        defination: questionRow.defination,
      })),
    };

    dispatch(addQuiz(newQuiz));
    navigate("/");
    setTitle("");
    setQuestionsRow([{ term: "", defination: "" }]);
  };

  return (
    <div className='container'>
      <form onSubmit={handleSubmit}>
        <div className='inputTitle'>
          <input
            type='text'
            placeholder={`Enter Title`}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        {questionsRow.map((question, index) => (
          <div className='inputBox'>
            <div className='inputBoxTop'>
              <p>{index + 1}</p>
              <div
                onClick={() => handleRemoveQuestion(index)}
                className='trashIcon'
              >
                <LuTrash />
              </div>
            </div>
            <div key={index} className='inputRow'>
              <div className='input'>
                <input
                  type='text'
                  placeholder={`Enter term ${index + 1}`}
                  value={question.term}
                  onChange={(e) => handleTermChange(index, e.target.value)}
                />
              </div>
              <div className='input'>
                <input
                  type='text'
                  placeholder={`Enter definition ${index + 1}`}
                  value={question.defination}
                  onChange={(e) =>
                    handleDefinationChange(index, e.target.value)
                  }
                />
              </div>
            </div>
          </div>
        ))}
        <div className='addCard' onClick={handleAddQuestion}>
          <p className="addCardNumber">{questionsRow.length + 1}</p>
          <p className="addCardTitle">+ Add Card</p>
        </div>
        <button type='submit' className='createBtn'>
          Create
        </button>
      </form>
    </div>
  );
};

export default InputComponent;
