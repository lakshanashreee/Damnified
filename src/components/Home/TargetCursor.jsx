import { useEffect, useRef, useCallback, useMemo } from "react";
import { gsap } from "gsap";
import "./TargetCursor.css";

const TargetCursor = ({
  targetSelector = ".section-button, .theme-toggle, .tie-symbol, .close-button",
  spinDuration = 2,
  hideDefaultCursor = true,
}) => {
  const cursorRef = useRef(null);
  const cornersRef = useRef(null);
  const spinTl = useRef(null);
  const dotRef = useRef(null);
  const constants = useMemo(
    () => ({
      borderWidth: 2,
      cornerSize: 10,
      parallaxStrength: 0.0001,
    }),
    []
  );

  const moveCursor = useCallback((x, y) => {
    if (!cursorRef.current) return;
    gsap.to(cursorRef.current, {
      x,
      y,
      duration: 0.1,
      ease: "power3.out",
    });
  }, []);

  useEffect(() => {
    if (!cursorRef.current) return;

    const originalCursor = document.body.style.cursor;
    if (hideDefaultCursor) {
      document.body.style.cursor = 'none';
    }

    const cursor = cursorRef.current;
    cornersRef.current = cursor.querySelectorAll(".target-cursor-corner");

    let activeTarget = null;

    gsap.set(cursor, {
      xPercent: -50,
      yPercent: -50,
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    });

    const createSpinTimeline = () => {
      if (spinTl.current) {
        spinTl.current.kill();
      }
      spinTl.current = gsap
        .timeline({ repeat: -1 })
        .to(cursor, { rotation: "+=360", duration: spinDuration, ease: "none" });
    };

    createSpinTimeline();

    const moveHandler = (e) => moveCursor(e.clientX, e.clientY);
    window.addEventListener("mousemove", moveHandler);

    const mouseDownHandler = () => {
      if (!dotRef.current) return;
      gsap.to(dotRef.current, { scale: 0.7, duration: 0.3 });
      gsap.to(cursorRef.current, { scale: 0.9, duration: 0.2 });
    };

    const mouseUpHandler = () => {
      if (!dotRef.current) return;
      gsap.to(dotRef.current, { scale: 1, duration: 0.3 });
      gsap.to(cursorRef.current, { scale: 1, duration: 0.2 });
    };

    window.addEventListener("mousedown", mouseDownHandler);
    window.addEventListener("mouseup", mouseUpHandler);

    const updateCorners = (target, mouseX, mouseY) => {
      if (!target || !cursorRef.current || !cornersRef.current) return;

      const rect = target.getBoundingClientRect();
      const cursorRect = cursorRef.current.getBoundingClientRect();
      const cursorCenterX = cursorRect.left + cursorRect.width / 2;
      const cursorCenterY = cursorRect.top + cursorRect.height / 2;

      const { borderWidth, cornerSize, parallaxStrength } = constants;

      let tlOffset = {
        x: rect.left - cursorCenterX - borderWidth,
        y: rect.top - cursorCenterY - borderWidth,
      };
      let trOffset = {
        x: rect.right - cursorCenterX + borderWidth - cornerSize,
        y: rect.top - cursorCenterY - borderWidth,
      };
      let brOffset = {
        x: rect.right - cursorCenterX + borderWidth - cornerSize,
        y: rect.bottom - cursorCenterY + borderWidth - cornerSize,
      };
      let blOffset = {
        x: rect.left - cursorCenterX - borderWidth,
        y: rect.bottom - cursorCenterY + borderWidth - cornerSize,
      };

      if (mouseX !== undefined && mouseY !== undefined) {
        const targetCenterX = rect.left + rect.width / 2;
        const targetCenterY = rect.top + rect.height / 2;
        const mouseOffsetX = (mouseX - targetCenterX) * parallaxStrength;
        const mouseOffsetY = (mouseY - targetCenterY) * parallaxStrength;

        tlOffset.x += mouseOffsetX;
        tlOffset.y += mouseOffsetY;
        trOffset.x += mouseOffsetX;
        trOffset.y += mouseOffsetY;
        brOffset.x += mouseOffsetX;
        brOffset.y += mouseOffsetY;
        blOffset.x += mouseOffsetX;
        blOffset.y += mouseOffsetY;
      }

      const [tlc, trc, brc, blc] = Array.from(cornersRef.current);
      const tl = gsap.timeline();
      const corners = [tlc, trc, brc, blc];
      const offsets = [tlOffset, trOffset, brOffset, blOffset];

      corners.forEach((corner, index) => {
        tl.to(
          corner,
          {
            x: offsets[index].x,
            y: offsets[index].y,
            duration: 0.2,
            ease: "power2.out",
          },
          0
        );
      });
    };

    const enterHandler = (e) => {
      const target = e.target.closest(targetSelector);
      if (!target || !cursorRef.current || !cornersRef.current) return;

      if (activeTarget === target) return;
      activeTarget = target;

      gsap.killTweensOf(cursorRef.current, "rotation");
      spinTl.current?.pause();
      gsap.set(cursorRef.current, { rotation: 0 });

      updateCorners(target, e.clientX, e.clientY);

      const targetMove = (ev) => {
        updateCorners(target, ev.clientX, ev.clientY);
      };

      const leaveHandler = () => {
        activeTarget = null;

        if (cornersRef.current) {
          const corners = Array.from(cornersRef.current);
          gsap.killTweensOf(corners);

          const { cornerSize } = constants;
          const positions = [
            { x: -cornerSize * 1.5, y: -cornerSize * 1.5 },
            { x: cornerSize * 0.5, y: -cornerSize * 1.5 },
            { x: cornerSize * 0.5, y: cornerSize * 0.5 },
            { x: -cornerSize * 1.5, y: cornerSize * 0.5 },
          ];

          const tl = gsap.timeline();
          corners.forEach((corner, index) => {
            tl.to(
              corner,
              {
                x: positions[index].x,
                y: positions[index].y,
                duration: 0.3,
                ease: "power3.out",
              },
              0
            );
          });
        }

        if (cursorRef.current && spinTl.current) {
          spinTl.current.restart();
        }

        target.removeEventListener("mousemove", targetMove);
        target.removeEventListener("mouseleave", leaveHandler);
      };

      target.addEventListener("mousemove", targetMove);
      target.addEventListener("mouseleave", leaveHandler);
    };

    window.addEventListener("mouseover", enterHandler, { passive: true });

    return () => {
      window.removeEventListener("mousemove", moveHandler);
      window.removeEventListener("mouseover", enterHandler);
      window.removeEventListener("mousedown", mouseDownHandler);
      window.removeEventListener("mouseup", mouseUpHandler);

      if (activeTarget) {
        activeTarget.removeEventListener("mousemove", moveHandler);
        activeTarget.removeEventListener("mouseleave", enterHandler);
      }

      spinTl.current?.kill();
      document.body.style.cursor = originalCursor;
    };
  }, [targetSelector, spinDuration, moveCursor, constants, hideDefaultCursor]);

  useEffect(() => {
    if (!cursorRef.current || !spinTl.current) return;

    if (spinTl.current.isActive()) {
      spinTl.current.kill();
      spinTl.current = gsap
        .timeline({ repeat: -1 })
        .to(cursorRef.current, { rotation: "+=360", duration: spinDuration, ease: "none" });
    }
  }, [spinDuration]);

  return (
    <div ref={cursorRef} className="target-cursor-wrapper">
      <div ref={dotRef} className="target-cursor-dot" />
      <div className="target-cursor-corner corner-tl" />
      <div className="target-cursor-corner corner-tr" />
      <div className="target-cursor-corner corner-br" />
      <div className="target-cursor-corner corner-bl" />
    </div>
  );
};

export default TargetCursor;