import { useState, useEffect, useRef } from 'react';

export function useSmoothViewBox(targetViewBox, duration = 650) {
  const [currentViewBox, setCurrentViewBox] = useState(targetViewBox);
  const animRef = useRef(null);
  const startRef = useRef(null);
  const initialRef = useRef(targetViewBox);

  useEffect(() => {
    initialRef.current = currentViewBox;
    startRef.current = performance.now();

    const animate = (now) => {
      const elapsed = now - startRef.current;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const ease = 1 - Math.pow(1 - progress, 3);

      const next = {
        x: initialRef.current.x + (targetViewBox.x - initialRef.current.x) * ease,
        y: initialRef.current.y + (targetViewBox.y - initialRef.current.y) * ease,
        w: initialRef.current.w + (targetViewBox.w - initialRef.current.w) * ease,
        h: initialRef.current.h + (targetViewBox.h - initialRef.current.h) * ease,
      };

      setCurrentViewBox(next);

      if (progress < 1) {
        animRef.current = requestAnimationFrame(animate);
      }
    };

    animRef.current = requestAnimationFrame(animate);

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [targetViewBox.x, targetViewBox.y, targetViewBox.w, targetViewBox.h, duration]);

  return `${currentViewBox.x} ${currentViewBox.y} ${currentViewBox.w} ${currentViewBox.h}`;
}
