import { useRef, useState, useEffect, forwardRef } from "react";

const DrawingCanvas = forwardRef((props, ref) => {
  const canvasRef = useRef(null);
  const [drawing, setDrawing] = useState(false);

  useEffect(() => {
    const canvas: any = canvasRef.current;
    const context = canvas.getContext("2d");

    const handleStart = () => {
      setDrawing(true);
    };

    const handleEnd = () => {
      setDrawing(false);
      context.beginPath();
    };

    const handleMove = (event: any) => {
      if (!drawing) return;

      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      context.lineWidth = 15;
      context.lineCap = "round";
      context.strokeStyle = "black";

      context.lineTo(x, y);
      context.stroke();
      context.beginPath();
      context.moveTo(x, y);
    };

    // Mouse events
    canvas.addEventListener("mousedown", handleStart);
    canvas.addEventListener("mouseup", handleEnd);
    canvas.addEventListener("mousemove", handleMove);

    // Touch events
    canvas.addEventListener("touchstart", (e: any) => {
      e.preventDefault();
      handleStart(e);
    });
    canvas.addEventListener("touchend", handleEnd);
    canvas.addEventListener("touchmove", (e: any) => {
      e.preventDefault();
      handleMove(e.touches[0]);
    });

    return () => {
      canvas.removeEventListener("mousedown", handleStart);
      canvas.removeEventListener("mouseup", handleEnd);
      canvas.removeEventListener("mousemove", handleMove);
      canvas.removeEventListener("touchstart", handleStart);
      canvas.removeEventListener("touchend", handleEnd);
      canvas.removeEventListener("touchmove", (e: any) => {
        e.preventDefault();
        handleMove(e.touches[0]);
      });
    };
  }, [drawing]);

  useEffect(() => {
    if (ref) {
      ref.current = canvasRef.current;
    }
  }, [ref]);

  return (
    <div style={{ width: "100%", height: "400px", overflow: "hidden", borderRadius: "10px", }}>
      <canvas
        ref={canvasRef}
        width={"1430"}
        height={400}
        style={{
          // width: "100%",
          height: "400px",
          border: "1px solid black",
          background: "white",
        }}
      />
    </div>
  );
});

export default DrawingCanvas;
