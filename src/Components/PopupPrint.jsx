import React, { useContext, useEffect, useRef } from "react";
import { enterNames } from "../functions/sections/names";
import printJs from "print-js";
import { useTemplates } from "../hooks/useTemplates";

  //Print Popup Box
function PopupPrint() {
  const { names, currTemplate} = useTemplates();;

  const ele = useRef(null)

    //print on load
  useEffect(()=>{
    printJs({
      printable: ele.current,
      type: "html",
      header: null,
      scanStyles: true,
      scanStyles: false,
      style: printstyle,
    });
  }, [])

    //style for print
  const printstyle = ".printBox { margin: 0px 0px 0px 0px; padding: 0}";

  return (
    <div id='popupPrintCover'>
      <div id='popupPrintBox'>
        <div id="popupPrint" ref={ele}>
          {currTemplate.order.map((sec, index) => {
            const words = currTemplate[sec[0]].script[sec[1]].split("<br/>");
            return (
              <div
                className="printBox"
                key={`popup${index}`}
                style={{ textAlign: "center" }}
              >
                <h3>{currTemplate[sec[0]].title}</h3>

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

export default PopupPrint;
