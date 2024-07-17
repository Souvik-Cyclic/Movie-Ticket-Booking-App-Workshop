import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const UnAuthorized = () => {
  useEffect(() => {
    document.title = "Unauthorized";
  }, []);

  const unauthorizedContainerStyle = {
    maxWidth: "600px",
    margin: "50px auto",
    padding: "30px",
    backgroundColor: "#ffffff",
    border: "1px solid #e0e0e0",
    borderRadius: "5px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
  };

  const unauthorizedHeadingStyle = {
    fontSize: "3rem",
    color: "#dc3545",
    marginBottom: "20px",
    textTransform: "uppercase",
  };

  const unauthorizedTextStyle = {
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
    <div style={unauthorizedContainerStyle}>
      <h1 style={unauthorizedHeadingStyle}>Access Denied</h1>
      <p style={unauthorizedTextStyle}>
        You do not have permission to access this page. Please contact your
        administrator for assistance or{" "}
        <Link to="/" style={linkStyle}>
          return to the homepage
        </Link>
        .
      </p>
    </div>
  );
};

export default UnAuthorized;
