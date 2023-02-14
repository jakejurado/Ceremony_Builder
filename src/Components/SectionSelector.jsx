import React from "react";

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
      <ul>
        {Object.entries(data).map(([category, obj]) => (
          <li key={category} className={"sectionCategory selector-category"}>
            <b>{category}</b>:
            <ul>
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
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SectionSelector;
