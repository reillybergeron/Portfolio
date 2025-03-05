import React, { useState, useEffect } from 'react';

const Fish: React.FC = () => {
  const [position, setPosition] = useState<number>(-200); // Start off-screen
  const [fishAscii, setFishAscii] = useState<string>("");

  // Fetch the fish ASCII art from the fish.txt file
  useEffect(() => {
    const fetchFish = async () => {
      const response = await fetch("/fish.txt");
      if (response.ok) {
        const text = await response.text();
        setFishAscii(text);
      } else {
        console.error("Failed to load fish ASCII art");
      }
    };

    fetchFish();
  }, []);

  useEffect(() => {
    const moveFish = () => {
      const speed = 2; // Control the speed of the fish's movement
      const interval = setInterval(() => {
        setPosition((prevPosition) => {
          // Move the fish from left to right
          if (prevPosition < window.innerWidth) {
            return prevPosition + speed;
          } else {
            return -200; // Reset to start when it reaches the end
          }
        });
      }, 16); // 16ms to simulate 60fps

      // Cleanup the interval on component unmount
      return interval;
    };

    const intervalId = moveFish();

    return () => {
      clearInterval(intervalId);
    };
  }, []); // Only run once when the component mounts

  return (
    <pre
      style={{
        position: 'absolute',
        right: `${position}px`,
        top: '50%',
        fontSize: '45px',
        fontFamily: 'monospace',
        zIndex: 1000, // Make sure it appears on top
        whiteSpace: 'pre-wrap', // Ensures the whitespace in ASCII art is preserved
        transform: 'translateY(-50%)',
        transition: 'letft 0.16s linear', // Smooth movement transition
        color: 'red'
      }}
    >
      {fishAscii}
    </pre>
  );
};

export default Fish;
