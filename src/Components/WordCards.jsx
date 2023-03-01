import React, { useContext } from "react";
import { GlobalContext } from "./App";
import { enterNames } from "../functions/sections/names";

function WordCards(props) {
  const { names } = useContext(GlobalContext);

  const newDiv = document.createElement("div");
  newDiv.classList.add("cards");
  newDiv.classList.add(`${props.class}`);
  newDiv.insertAdjacentHTML("beforeend", props.cardContent);

  const content = enterNames(names, props.cardContent);
  const words = content.split("<br/>");

  return (
    <div className={`cards ${props.class}`}>
      {words.map((phrase, i) => (
        <p>{phrase}</p>
      ))}
    </div>
  );
}

export default WordCards;
