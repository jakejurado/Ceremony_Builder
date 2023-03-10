import React, { useContext } from "react";
import { GlobalContext } from "./App";
import { enterNames } from "../functions/sections/names";
import printJs from "print-js";

function PopupPrint() {
  const { template, names } = useContext(GlobalContext);

  setTimeout(() => {
    const ele = document.getElementById("popupPrint");
    printJs({ printable: ele, type: "html", header: null, scanStyles: true });
  }, 0);

  return (
    <div id="popupPrint">
      {template.order.map((sec, index) => {
        const words = template[sec[0]].script[sec[1]].split("<br/>");
        return (
          <div key={`popup${index}`} style={{ textAlign: "center" }}>
            <h3>{template[sec[0]].title}</h3>
            <div>
              {words.map((phrase, i) => (
                <p key={`phra se${i}`}>{enterNames(names, phrase)}</p>
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
