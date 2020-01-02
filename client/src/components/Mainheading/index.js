import React from "react";
import "./style.css";

export function Mainheading({ children, color }) {
  return (
    <div className="main-heading">
      <h1 className={color}>{children}
      <span className="tile_underline">
        <span className="tile_underline_semicircle semicircle_1"></span>
        <span className="tile_underline_semicircle semicircle_2"></span>
        <span className="tile_underline_semicircle semicircle_3"></span>
      </span>
      </h1>
    </div>
  )
}