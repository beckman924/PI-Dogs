import React from "react";
import { Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import landingpage from "./landingPage.css";

export default function LandingPage() {
  return (
    <div>
      <h1>Welcome!</h1>
      <Link to="/home">Enter</Link>
    </div>
  );
}
