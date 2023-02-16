import React from "react";

function WordCards(props) {
  const newDiv = document.createElement("div");
  newDiv.classList.add("cards");
  newDiv.classList.add(`${props.class}`);
  newDiv.insertAdjacentHTML("beforeend", props.cardContent);

  const words = props.cardContent.split("<br/>");

  return (
    <div className={`cards ${props.class}`}>
      {words.map((phrase, i) => (
        <p>{phrase}</p>
      ))}
    </div>
  );
}

export default WordCards;
