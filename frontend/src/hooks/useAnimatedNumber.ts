import { useEffect, useState } from "react";

export function useAnimatedNumber(value: number | null, duration = 600) {
  const [displayValue, setDisplayValue] = useState<number>(0);

  useEffect(() => {
    if (value === null || value === undefined) return;

    let start = 0;
    const end = value;
    const startTime = performance.now();

    const animate = (time: number) => {
      const progress = Math.min((time - startTime) / duration, 1);

      const current = Math.floor(start + (end - start) * progress);
      setDisplayValue(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [value]);

  return displayValue;
}