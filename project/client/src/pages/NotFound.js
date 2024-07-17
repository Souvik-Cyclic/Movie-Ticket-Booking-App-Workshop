import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  const notFoundContainerStyle = {
    maxWidth: "600px",
    margin: "50px auto",
    padding: "30px",
    backgroundColor: "#ffffff",
    border: "1px solid #e0e0e0",
    borderRadius: "5px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
  };

  const notFoundHeadingStyle = {
    fontSize: "3rem",
    color: "#dc3545",
    marginBottom: "20px",
    textTransform: "uppercase",
  };

  const notFoundTextStyle = {
    fontSize: "1.5rem",
    color: "#6c757d",
    lineHeight: "1.6",
    marginBottom: "20px",
  };

  const linkStyle = {
    color: "#007bff",
    textDecoration: "none",
    fontWeight: "bold",
    marginLeft: "5px",
  };

  return (
    <div style={notFoundContainerStyle}>
      <h1 style={notFoundHeadingStyle}>404 - Page Not Found</h1>
      <p style={notFoundTextStyle}>
        The page you are looking for does not exist. Please{" "}
        <Link to="/" style={linkStyle}>
          return to the homepage
        </Link>
        .
      </p>
    </div>
  );
};

export default NotFound;
