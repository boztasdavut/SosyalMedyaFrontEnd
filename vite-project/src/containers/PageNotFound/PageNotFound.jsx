import React from "react";
import "./PageNotFound.css";
import pageNotFoundImage from "./pageNotFoundImage.png"; // Doğru import

function PageNotFound() {
  return (
    <div>
      <div className="pageNotFoundAnaDiv">
        <div>
          <img
            className="notFoundImageElement"
            src={pageNotFoundImage}
            alt="404"
          />
        </div>
      </div>
    </div>
  );
}

export default PageNotFound;
