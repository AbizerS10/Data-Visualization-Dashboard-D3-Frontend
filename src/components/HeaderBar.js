import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import "../styles/header.css";
import Sidebar from "./Sidebar";

function HeaderBar({ children }) {
  return (
    <div className="container-fluid m-0 p-0">
      <div className="row topnav">
        <Navbar fixed="top" expand="lg" variant="dark" className="topnav">
          <p>News Data Visualization Dashbaord</p>
        </Navbar>
      </div>
      <div className="row">
        <div className="col-3">
          <Sidebar />
        </div>
        <div className="col-9">{children}</div>
      </div>
    </div>
  );
}

export default HeaderBar;
