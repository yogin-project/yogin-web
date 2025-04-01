import { useEffect, useRef, useState } from 'react';

import { useScrollInfo } from '../provider/ScrollProvider';

export default function useScrollDirection(threshold = 10) {
  const { scrollY } = useScrollInfo();
  const [direction, setDirection] = useState<'up' | 'down' | null>(null);
  const lastScrollY = useRef(0);
  const lastDirection = useRef<'up' | 'down' | null>(null);

  useEffect(() => {
    const newDirection =
      lastScrollY.current > scrollY || scrollY < threshold ? 'up' : 'down';

    if (newDirection !== lastDirection.current) {
      setDirection(newDirection);
      lastDirection.current = newDirection;
    }

    lastScrollY.current = scrollY;
  }, [scrollY, threshold]);

  return direction;
}
