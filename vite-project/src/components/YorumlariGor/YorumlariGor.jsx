import React from "react";
import "./YorumlariGor.css";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

function YorumlariGor({ yorumlar }) {
  return (
    <div>
      {yorumlar.map((yorum) => (
        <div className="yorumlarAnaDiv">
          <div style={{ fontSize: "20px" }}>{yorum.yeniYorumIcerigi}</div>
          <div className="yorumlarinAksiyonlari">
            <div className="begenmeButonu">
              <FavoriteBorderIcon style={{ fontSize: "30px" }} />
            </div>
            <div className="yorumButonu">
              <ChatBubbleOutlineIcon style={{ fontSize: "30px" }} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default YorumlariGor;
