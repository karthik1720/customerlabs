import React from "react";

// MATERIAL ICONS
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

function Navbar({ text }) {
  return (
    <div className="navbarContainer">
      <ArrowBackIosIcon className="icon" />
      <h1 className="h1size">{text}</h1>
    </div>
  );
}

export default Navbar;
