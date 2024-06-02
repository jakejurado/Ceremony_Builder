import React from "react";
import backgroundImage from "../../../public/assets/minimal9.png";
import { useAuth } from '../../hooks/useAuth'
import { fetchSectionFromDatabase } from "../../functions/fetches/fetchSectionFromDatabase";
import { useTemplates } from "../../hooks/useTemplates";
  //selector box to add a section to the template
function SectionsSelector({ index }) {
  const {currUser} = useAuth;
  const {templateTitle, removeSelectorSec, selectorTitles, dispatch} = useTemplates();

    //grabs the name of the selected section and adds that section.
  async function handleClick(e) {
    const [_, varname] = e.target.classList[0].split("-");
    // dispatch({
    //   type: "addSEC",
    //   payload: { varname, index: parseInt(index) },
    // });

    try{
      const response = await fetchSectionFromDatabase(varname, parseInt(index), currUser)
      
      dispatch({
        type: "loadFetch",
        payload: { varname, sec: response, index: parseInt(index), templateTitle }
      });
      removeSelectorSec();

    } catch(err){
      console.error(err)
      removeSelectorSec();
    }
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
            {Object.entries(selectorTitles).map(([category, obj]) => (
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
