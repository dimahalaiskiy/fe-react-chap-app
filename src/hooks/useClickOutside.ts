import { RefObject, useEffect, useState } from "react";

export const useClickOutside = (ref: RefObject<HTMLDivElement>) => {
  const [isClickedOutside, setIsClickedOutside] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const targetNode = event.target as Node;
      const isClickedOutside = ref.current && !ref.current.contains(targetNode);
      setIsClickedOutside(Boolean(isClickedOutside));
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  return {
    isClickedOutside,
  };
};
