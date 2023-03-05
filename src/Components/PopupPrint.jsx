import React, { useContext } from "react";
import { GlobalContext } from "./App";
import { enterNames } from "../functions/sections/names";

function PopupPrint() {
  const { currTemplate, names } = useContext(GlobalContext);
  console.log({ currTemplate });

  return (
    <div id="popupPrint">
      {currTemplate.order.map((sec) => {
        const words = currTemplate[sec[0]].script[sec[1]].split("<br/>");
        return (
          <div style={{ textAlign: "center" }}>
            <h3>{currTemplate[sec[0]].title}</h3>
            <div>
              {words.map((phrase, i) => (
                <p>{enterNames(names, phrase)}</p>
              ))}
            </div>
            <br />
          </div>
        );
      })}
    </div>
  );
}

export default PopupPrint;
