import React from "react";
import backgroundImage from "../files/minimal9.png";

  //selector box to add a section to the template
function SectionsSelector({ data, index, dispatch }) {

    //grabs the name of the selected section and adds that section.
  function handleClick(e) {
    const [_, varname] = e.target.classList[0].split("-");
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
          <h3>SECTION SELECTOR</h3>
        </div>
        <div className="middleBox">
          <div className="cards selections">
            {Object.entries(data).map(([category, obj]) => (
              <ul
                key={category}
                className={"selector-category"}
              >
                <h3>{category}:</h3>
                {Object.entries(obj).map(([title, varname]) => (
                  <li
                    key={title}
                    className={`selector-${varname}`}
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

export default SectionsSelector;
