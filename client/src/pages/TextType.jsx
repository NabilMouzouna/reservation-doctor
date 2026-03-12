import { useEffect, useMemo, useState } from "react";

function getRandomSpeed(min, max, fallback) {
  if (min >= max) {
    return fallback;
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function TextType({
  text,
  texts,
  typingSpeed = 75,
  deletingSpeed = 50,
  pauseDuration = 1500,
  showCursor = true,
  cursorCharacter = "_",
  variableSpeedEnabled = false,
  variableSpeedMin = 60,
  variableSpeedMax = 120,
  cursorBlinkDuration = 0.5,
}) {
  const messages = useMemo(() => {
    if (Array.isArray(texts) && texts.length > 0) {
      return texts;
    }
    if (Array.isArray(text) && text.length > 0) {
      return text;
    }
    return [];
  }, [text, texts]);

  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (messages.length === 0) {
      return;
    }

    const current = messages[index] || "";
    const atEnd = displayed === current;
    const atStart = displayed.length === 0;

    if (!isDeleting && atEnd) {
      const pauseTimer = setTimeout(() => setIsDeleting(true), pauseDuration);
      return () => clearTimeout(pauseTimer);
    }

    if (isDeleting && atStart) {
      setIsDeleting(false);
      setIndex((prev) => (prev + 1) % messages.length);
      return;
    }

    const baseSpeed = isDeleting ? deletingSpeed : typingSpeed;
    const speed = variableSpeedEnabled
      ? getRandomSpeed(variableSpeedMin, variableSpeedMax, baseSpeed)
      : baseSpeed;

    const typeTimer = setTimeout(() => {
      if (isDeleting) {
        setDisplayed((prev) => prev.slice(0, -1));
      } else {
        setDisplayed(current.slice(0, displayed.length + 1));
      }
    }, speed);

    return () => clearTimeout(typeTimer);
  }, [
    messages,
    index,
    displayed,
    isDeleting,
    pauseDuration,
    typingSpeed,
    deletingSpeed,
    variableSpeedEnabled,
    variableSpeedMin,
    variableSpeedMax,
  ]);

  return (
    <span>
      {displayed}
      {showCursor && (
        <span
          style={{
            display: "inline-block",
            marginLeft: "2px",
            animation: `blink ${cursorBlinkDuration}s step-end infinite`,
          }}
        >
          {cursorCharacter}
        </span>
      )}
      <style>{`
        @keyframes blink {
          50% { opacity: 0; }
        }
      `}</style>
    </span>
  );
}

export default TextType;
