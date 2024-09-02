import { useEffect, useRef, useState } from "react";
import Tesseract from "tesseract.js";
import CanvasDraw from "react-canvas-draw";

const Language = () => {
  const canvasRef = useRef(null);
  const [recognizedText, setRecognizedText] = useState("");
  const [language, setLanguage] = useState("eng");

  useEffect(() => {
    const savedLanguage = sessionStorage.getItem("selectedLanguage");
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLanguage = e.target.value;
    setLanguage(selectedLanguage);
    sessionStorage.setItem("selectedLanguage", selectedLanguage);
  };

  const handleRecognizeText = () => {
    if (canvasRef.current) {
      const canvas = canvasRef.current.canvasContainer.children[1];
      const image = canvas.toDataURL("image/png");

      Tesseract.recognize(image, language, {
        logger: (info) => console.log(info),
      })
        .then(({ data: { text } }) => {
          setRecognizedText(text);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  const handleClearCanvas = () => {
    if (canvasRef.current) {
      canvasRef.current.clear();
    }
  };

  interface ILangugae {
    id: number;
    name: string;
    value: string;
  }

  const languages: ILangugae[] = [
    {
      id: 1,
      name: "English",
      value: "eng",
    },
    {
      id: 2,
      name: "Russian",
      value: "rus",
    },
    {
      id: 3,
      name: "Xitoy",
      value: "chi_sim",
    },
    {
      id: 4,
      name: "Japanese",
      value: "jpn",
    },
    {
      id: 5,
      name: "Korean",
      value: "kor",
    },
    {
      id: 6,
      name: "Arabic",
      value: "ara",
    },
  ];

  return (
    <div className='container'>
      <div style={{ marginTop: 30 }} className='title_row'>
        <h1>Choice Language</h1>
        <div style={{ display: "flex", gap: 20 }}>
          <select
            onChange={handleLanguageChange}
            style={{ border: "none", outline: "none" }}
          >
            {languages.map((lang) => (
              <option key={lang.id} value={lang.value}>
                {lang.name}
              </option>
            ))}
          </select>
          <h1>Your language: {language}</h1>
        </div>
      </div>
      <div style={{ marginTop: 30 }}>
        <CanvasDraw ref={canvasRef} canvasWidth={"1000"} />
        <div style={{ display: "flex", gap: 20 }}>
          <button onClick={handleRecognizeText} className='createBtn'>
            Submit
          </button>
          <button
            onClick={handleClearCanvas}
            style={{ background: "red" }}
            className='createBtn'
          >
            Clear
          </button>
        </div>
        <div style={{ marginTop: 30 }}>
          <h1>Result: {recognizedText}</h1>
        </div>
      </div>
    </div>
  );
};

export default Language;
