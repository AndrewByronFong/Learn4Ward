import React, { useRef, useEffect } from 'react';

const ScramblingText = ({ text, onClick }) => {
  const titleRef = useRef(null);
  const intervalRef = useRef(null);
  const letters = "Learn4Ward";

  useEffect(() => {
    const onMouseOver = () => {
      let iteration = 0;

      clearInterval(intervalRef.current);

      intervalRef.current = setInterval(() => {
        if (titleRef.current) {
          titleRef.current.innerText = titleRef.current.innerText
            .split("")
            .map((letter, index) => {
              if (index < iteration) {
                return text[index];
              }

              return letters[Math.floor(Math.random() * 10)];
            })
            .join("");

          if (iteration >= text.length) {
            clearInterval(intervalRef.current);
          }

          iteration += 1 / 4;
        }
      }, 30);
    };

    const titleElement = titleRef.current;

    if (titleElement) {
      titleElement.addEventListener('mouseover', onMouseOver);
    }

    return () => {
      clearInterval(intervalRef.current);
      if (titleElement) {
        titleElement.removeEventListener('mouseover', onMouseOver);
      }
    };
  }, [text]);

  return <p onClick={onClick} ref={titleRef} className="logo-title">{text}</p>;
};

export default ScramblingText;
