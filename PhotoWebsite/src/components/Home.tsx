import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        margin: 0,
        color: "white",
        textAlign: "center", // Ensures buttons are centered under the title
        padding: "5rem",
      }}
    >
      <h1 style={{ display: "flex", justifyContent: "center" }}>
        <img
          src="/Images/CoverPhoto.JPG"
          alt="Cover"
          style={{ width: "100%", maxWidth: "40rem", height: "auto" }}
        />
      </h1>
      <h1 style={{ display: "flex" }}>
        REILLY BERGERON PHOTOGRAPHY
      </h1>

      {/* Navigation Buttons */}
      <div style={{ display: "flex", gap: "10px", fontSize: "auto" }}>
        <Link to="/gallery">
          <button className="home-button">GALLERY 2023</button>
        </Link>
        <Link to="/various">
          <button className="home-button">VARIOUS</button>
        </Link>
        {/* GitHub Button */}
        <a
          href="https://github.com/reillybergeron" // Replace with your actual GitHub profile URL
          target="_blank" // Opens the link in a new tab
          rel="noopener noreferrer" // For security reasons
          className="home-button" // Optional: Apply custom CSS class for styling
        >
          GITHUB
        </a>
        <Link to="/contact">
          <button className="home-button">CONTACT</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
