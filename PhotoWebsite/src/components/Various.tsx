import React from 'react';

const Various: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen text-center">
      <div style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        color: "white",
        textAlign: "center"
      }}>
        <h1 className="text-xl font-bold" style={{ color: 'white'}}>I haven't taken any other photos.</h1>
        <p className="mt-2" style={{ color: 'white'}}>I'm joking. I'll upload other photos I've taken here at a later date. Maybe some of them will even be in color! (as if).</p>
        <img
          src="/Images/RotatingFish/rotation2.gif"
          alt="Cover"
          style={{ maxWidth: "90%" }}
        />
      </div>
    </div>
  );
};

export default Various;