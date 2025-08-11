import { useRef, useEffect } from "react";
import "./MagnetLines.css";

export default function MagnetLines({
  rows = 30, // Increased to 30 for denser grid
  columns = 30, // Increased to 30 for denser grid
  containerSize = "100vw",
  lineColor = "#ffffff",
  lineWidth = "0.2vmin", // Further reduced for smaller lines
  lineHeight = "1.5vmin", // Further reduced for smaller lines
  baseAngle = 0,
  className = "",
  style = {}
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const items = container.querySelectorAll("span");

    const onPointerMove = (pointer) => {
      items.forEach((item) => {
        const rect = item.getBoundingClientRect();
        const centerX = rect.x + rect.width / 2;
        const centerY = rect.y + rect.height / 2;

        const b = pointer.x - centerX;
        const a = pointer.y - centerY;
        const c = Math.sqrt(a * a + b * b) || 1;
        const r =
          (Math.acos(b / c) * 180) / Math.PI * (pointer.y > centerY ? 1 : -1);

        item.style.setProperty("--rotate", `${r}deg`);
      });
    };

    window.addEventListener("pointermove", onPointerMove);

    if (items.length) {
      const middleIndex = Math.floor(items.length / 2);
      const rect = items[middleIndex].getBoundingClientRect();
      onPointerMove({ x: rect.x, y: rect.y });
    }

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  const total = rows * columns;
  const spans = Array.from({ length: total }, (_, i) => (
    <span
      key={i}
      style={{
        "--rotate": `${baseAngle}deg`,
        backgroundColor: lineColor,
        width: lineWidth,
        height: lineHeight,
        transition: "transform 0.1s ease-out"
      }}
    />
  ));

  return (
    <div
      ref={containerRef}
      className={`magnetLines-container ${className}`}
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
        width: containerSize,
        height: containerSize,
        gap: "0.1vmin", // Further reduced gap
        ...style
      }}
    >
      {spans}
    </div>
  );
}