import { useState } from "react";

function GlareHover({
  children,
  glareColor = "#ffffff",
  glareOpacity = 0.3,
  glareAngle = -30,
  glareSize = 300,
  transitionDuration = 800,
  playOnce = false,
  className = "",
}) {
  const [isActive, setIsActive] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setPosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
  };

  const handleMouseEnter = () => {
    if (playOnce && hasPlayed) {
      return;
    }
    setIsActive(true);
  };

  const handleMouseLeave = () => {
    setIsActive(false);
    if (playOnce) {
      setHasPlayed(true);
    }
  };

  return (
    <div
      className={className}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        position: "relative",
        overflow: "hidden",
      }}
    >
      {children}
      <span
        style={{
          pointerEvents: "none",
          position: "absolute",
          inset: 0,
          opacity: isActive ? glareOpacity : 0,
          transition: `opacity ${transitionDuration}ms ease`,
          background: `radial-gradient(circle ${glareSize}px at ${position.x}px ${position.y}px, ${glareColor}, transparent 70%)`,
          transform: `rotate(${glareAngle}deg)`,
        }}
      />
    </div>
  );
}

export default GlareHover;
