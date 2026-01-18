import React from "react";

// STEP : 01
// jab humne project banaya tha tab humne ek,image return krri thi.

// "function logo", ke ander hum ke optional property le rahe hai
// optional property issliye kyuki hum property ke saath value bhi yahi pe de rahe h ki- width 100px rahega.
function Logo({ width = "100px" }) {
  return <div>Logo</div>;
}

export default Logo;

// STEP : 02
// go to Footer.jsx then import this logo
