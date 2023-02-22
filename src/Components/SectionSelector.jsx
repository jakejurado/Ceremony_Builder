import React from "react";
// import "../styles/sections.scss";
import backgroundImage from "../files/minimal9.png";

function SectionSelector({ data, index, handleSectionChange, dispatch }) {
  function handleClick(e) {
    const [_, varname] = e.target.classList[1].split("-");
    const res = { action: "addSEC", varname, index: parseInt(index) + 1 };
    // handleSectionChange(res);
    dispatch({
      type: "addSEC",
      payload: { varname, index: parseInt(index) },
    });
  }

  return (
    <div className="selectorBox">
      <div
        className="innerBox"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="title">
          <h3>Section Selector</h3>
        </div>
        <div className="middleBox">
          <div className="cards selections">
            {Object.entries(data).map(([category, obj]) => (
              <ul
                key={category}
                className={"sectionCategory selector-category"}
              >
                <h3>{category}:</h3>
                {Object.entries(obj).map(([title, varname]) => (
                  <li
                    key={title}
                    className={`sectionTitle selector-${varname}`}
                    onClick={handleClick}
                    onKeyDown={handleClick}
                  >
                    {title}
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SectionSelector;
