import { useEffect, useRef } from 'react';

export const useOutsideClick = (callback: () => void) => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleClickOutsideSort = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.body.addEventListener('mousedown', handleClickOutsideSort);

    return () => {
      document.body.removeEventListener('mousedown', handleClickOutsideSort);
    };
  }, [callback]);

  return ref;
};
