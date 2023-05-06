import React, { useContext } from "react";
import { GlobalContext } from "./App";
import { enterNames } from "../functions/sections/names";
import printJs from "print-js";

function MainPrint() {
  const { template, names } = useContext(GlobalContext);

  setTimeout(() => {
    const ele = document.getElementById("popupPrint");
    printJs({
      printable: ele,
      type: "html",
      header: null,
      scanStyles: true,
      scanStyles: false,
      style: printstyle,
    });
  }, 0);

  // style: '.custom-h3 { color: red; }'
  const printstyle = ".printBox { margin: 0px 0px 0px 0px; padding: 0}";

  return (
    <div id='popupPrintCover'>
      <div id='popupPrintBox'>
        <div id="popupPrint">
          {template.order.map((sec, index) => {
            const words = template[sec[0]].script[sec[1]].split("<br/>");
            return (
              <div
                className="printBox"
                key={`popup${index}`}
                style={{ textAlign: "center" }}
              >
                <h3>{template[sec[0]].title}</h3>

                {words.map((phrase, i) => (
                  <p className="printP" key={`phra se${i}`}>
                    {enterNames(names, phrase)}
                  </p>
                ))}

                <br />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default MainPrint;
