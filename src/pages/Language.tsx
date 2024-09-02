import React, { useRef, useState, useEffect } from 'react';
import Tesseract from 'tesseract.js';

const Language = () => {
  const [recognizedText, setRecognizedText] = useState("");
  const [language, setLanguage] = useState("eng");
  const [isDrawing, setIsDrawing] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

  const handleMouseDown = () => {
    setIsDrawing(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDrawing || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    if (context) {
      context.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
      context.stroke();
    }
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext('2d');
      if (context) {
        context.beginPath();
      }
    }
  };

  const handleRecognizeText = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const image = canvas.toDataURL("image/png");

    Tesseract.recognize(image, language, {
      logger: (info: string) => console.log(info),
    })
      .then(({ data: { text } }) => {
        setRecognizedText(text);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleClearCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext('2d');
      if (context) {
        context.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
  };

  const languages = [
    { id: 1, name: "English", value: "eng" },
    { id: 2, name: "Russian", value: "rus" },
    { id: 3, name: "Chinese", value: "chi_sim" },
    { id: 4, name: "Japanese", value: "jpn" },
    { id: 5, name: "Korean", value: "kor" },
    { id: 6, name: "Arabic", value: "ara" },
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
        <canvas
          ref={canvasRef}
          width={400}
          height={400}
          style={{ border: "1px solid red", background: "white" }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        />
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
