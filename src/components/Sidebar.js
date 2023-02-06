import React from "react";
import "../styles/sidebar.css";
import { Link } from "react-router-dom";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";

function Sidebar() {
  return (
    <>
      <div className="container sidebar">
        <Link className="link" to={"/"}>
          Home
        </Link>
        <Link className="link" to={"/intensity_analysis"}>
          Intensity Analysis Dashboard
        </Link>
        <Link className="link" to={"/likelihood_analysis"}>
          Likelihood Analysis Dashboard
        </Link>
      </div>
    </>
  );
}

export default Sidebar;
