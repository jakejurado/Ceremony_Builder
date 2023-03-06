import React, { useContext } from "react";
import { GlobalContext } from "./App";
import { enterNames } from "../functions/sections/names";

function PopupPrint() {
  const { template, names } = useContext(GlobalContext);

  return (
    <div id="popupPrint">
      {template.order.map((sec, i) => {
        const words = template[sec[0]].script[sec[1]].split("<br/>");
        return (
          <div key={"popup${i}"} style={{ textAlign: "center" }}>
            <h3>{template[sec[0]].title}</h3>
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
