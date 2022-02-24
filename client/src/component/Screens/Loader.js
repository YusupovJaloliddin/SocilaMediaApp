import React from "react";
import "../Screens/Css/Loader.css";
function Loader() {
  return (
    <div className="loader-container">
      <div className="box-loader">
        <div className="rond first"></div>
        <div className="rond second"></div>
      </div>
    </div>
  );
}

export default Loader;
