import React, { useContext } from "react";
import { GlobalContext } from "./App";

function WordCards(props) {
  const { names } = useContext(GlobalContext);

  function enterNames(names, words) {
    console.log("entered");
    let string = words;
    if (names.person1)
      string = string.replaceAll("PERSON_1", names.person1.toUpperCase());
    if (names.person2)
      string = string.replaceAll("PERSON_2", names.person2.toUpperCase());
    return string;
  }

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
