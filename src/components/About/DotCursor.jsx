import { useEffect, useRef } from "react";
import "./DotCursor.jsx";

const DotCursor = () => {
  const dotRef = useRef(null);

  useEffect(() => {
    const moveDot = (e) => {
      if (!dotRef.current) return;
      dotRef.current.style.left = `${e.clientX}px`;
      dotRef.current.style.top = `${e.clientY}px`;
    };

    window.addEventListener("mousemove", moveDot);

    return () => {
      window.removeEventListener("mousemove", moveDot);
    };
  }, []);

  return <div ref={dotRef} className="dot-cursor" />;
};

export default DotCursor;