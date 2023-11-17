import React from "react";
import "./style.css";
const Emoji = ({ setContent, content }) => {
  const reactions = [
    "❤️",
    "😆",
    "😯",
    "😢",
    "😡",
    "👍",
    "👎",
    "😄",
    "😂",
    "",
    "😘",
    "😗",
    "😚",
    "😳",
    "😭",
    "😓",
    "😤",
    "🤤",
    "👻",
    "💀",
    "🤐",
    "😴",
    "😷",
    "😵",
  ];

  return (
    <>
      <div className="nav-item dropdown">
        <span
          className="nav-link position-relative px-1"
          id="navbarDropdown"
          role="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
          style={{ cursor: "pointer" }}
        >
          <span style={{ opacity: 0.4 }}>😄</span>
        </span>

        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
          <div className="reactions">
            {reactions.map((icon) => (
              <span key={icon} onClick={() => setContent(content + icon)}>
                {icon}
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Emoji;
