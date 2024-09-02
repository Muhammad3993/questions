import { useEffect, useRef, useState } from "react";
import Tesseract from "tesseract.js";
import { Stage, Layer, Line } from "react-konva";

const Language = () => {
  const [recognizedText, setRecognizedText] = useState("");
  const [language, setLanguage] = useState("eng");
  const [lines, setLines] = useState([]);
  const isDrawing = useRef(false);
  const stageRef = useRef(null);

  useEffect(() => {
    const savedLanguage = sessionStorage.getItem("selectedLanguage");
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  const handleLanguageChange = (e) => {
    const selectedLanguage = e.target.value;
    setLanguage(selectedLanguage);
    sessionStorage.setItem("selectedLanguage", selectedLanguage);
  };

  const handleMouseDown = () => {
    isDrawing.current = true;
    setLines([...lines, []]);
  };

  const handleMouseMove = (e) => {
    if (!isDrawing.current) {
      return;
    }
    const stage: any = stageRef.current;
    const point = stage.getPointerPosition();
    let lastLine: any = lines[lines.length - 1];
    lastLine = [...lastLine, point.x, point.y];
    setLines([...lines.slice(0, -1), lastLine]);
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  const handleRecognizeText = () => {
    const stage = stageRef.current;
    if (!stage) return;

    const dataURL = stage.toDataURL();
    Tesseract.recognize(dataURL, language, {
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
    setLines([]);
  };

  const languages = [
    { id: 1, name: "English", value: "eng" },
    { id: 2, name: "Russian", value: "rus" },
    { id: 3, name: "Xitoy", value: "chi_sim" },
    { id: 4, name: "Japanese", value: "jpn" },
    { id: 5, name: "Korean", value: "kor" },
    { id: 6, name: "Arabic", value: "ara" },
  ];

  return (
    <div className='container'>
      <div style={{ marginTop: 30 }} className='title_row'>
        <h1></h1>
        <div style={{ display: "flex", gap: 20 }}>
          <h1>Langugae: </h1>
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
        </div>
      </div>
      <div style={{ marginTop: 30 }}>
        <div style={{overflow: "hidden", width: "100%", height: "400px", border: "10px solid red"}}>
          <Stage
            width={10000}
            height={400}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            ref={stageRef}
            style={{ border: "1px solid red", background: "white" }}
          >
            <Layer>
              {lines.map((line, i) => (
                <Line
                  key={i}
                  points={line}
                  strokeEnabled
                  strokeScaleEnabled
                  fillAfterStrokeEnabled
                  stroke='black'
                  strokeWidth={10}
                />
              ))}
            </Layer>
          </Stage>
        </div>
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
