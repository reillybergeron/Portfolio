import React from "react";

const Footer: React.FC = () => {
  return (
    <footer
      style={{
        backgroundColor: "#000000",
        color: "white",               // White text
        textAlign: "left",            // Left aligned text
        padding: "0px",               // Padding around the footer
        width: "100%",                // Full width
        bottom: "0",                  // Stick to the bottom
        display: "flex",              // Flexbox layout
        justifyContent: "flex-start", // Align items horizontally to the left
        alignItems: "center",         // Vertically center the content
        height: "60px",               // Set a fixed height for the footer
      }}
    >
      <p style={{ marginLeft: "20px", lineHeight: "1.2" }}>
         <br />
        Photography and website by Reilly Bergeron<br />
        Photos taken with SONY A7IV, FUJIFILM XS10, and SONY XPERIA 5 IV
      </p>
    </footer>
  );
};

export default Footer;