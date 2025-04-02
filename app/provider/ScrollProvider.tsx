'use client';

import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

type ScrollContextType = {
  scrollY: number;
  innerHeight: number;
};

const ScrollContext = createContext<ScrollContextType | undefined>(undefined);

export const ScrollProvider = ({ children }: { children: React.ReactNode }) => {
  const [scrollY, setScrollY] = useState(0);
  const [innerHeight, setInnerHeight] = useState(0);

  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    setInnerHeight(window.innerHeight);

    const handleResize = () => {
      setInnerHeight(window.innerHeight);
    };

    const updateScroll = () => {
      const currentScrollY = window.scrollY;

      setScrollY(currentScrollY);
      lastScrollY.current = Math.max(currentScrollY, 0);
      ticking.current = false;
    };

    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(updateScroll);
        ticking.current = true;
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <ScrollContext.Provider value={{ scrollY, innerHeight }}>
      {children}
    </ScrollContext.Provider>
  );
};

export const useScrollInfo = () => {
  const context = useContext(ScrollContext);
  if (context === undefined) {
    throw new Error('useScrollInfo must be used within a ScrollProvider');
  }
  return context;
};
