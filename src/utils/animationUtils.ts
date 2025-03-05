
import { useEffect, useState } from 'react';

// Custom hook for revealing elements on scroll
export const useRevealOnScroll = (threshold = 0.1) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [ref, setRef] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!ref) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    
    observer.observe(ref);
    
    return () => {
      observer.disconnect();
    };
  }, [ref, threshold]);

  return { ref: setRef, isRevealed };
};

// Function for staggered animations
export const staggeredClasses = (index: number, baseClass: string, delay = 100) => {
  const delayMs = index * delay;
  return `${baseClass} transition-all duration-500 ease-out` + 
         (delayMs > 0 ? ` delay-[${delayMs}ms]` : '');
};

// Image preloader function
export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
};

// Preload multiple images
export const preloadImages = async (sources: string[]): Promise<void[]> => {
  const promises = sources.map(src => preloadImage(src));
  return Promise.all(promises);
};

// Simple debounce function
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  
  return function(...args: Parameters<T>) {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => func(...args), wait);
  };
};
