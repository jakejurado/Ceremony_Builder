import React, { Component, useState } from "react";
import WordCards from "./WordCards";
import leftArrow from "../../public/assets/arrowLft.png";
import addButton from "../../public/assets/add.png";
import { Draggable } from "react-beautiful-dnd";

function Sections(props) {
  //swaping cards
  function handleLeftRightClick(e) {
    const button = e.target.id;
    const [name, indexNum] =
      e.target.parentElement.children[1].classList[1].split("-");

    //depending on right or left click, change the state to the next content.
    switch (e.target.id) {
      case "rightClick":
        props.updateCardIndex(name, 1);
        break;
      case "leftClick":
        props.updateCardIndex(name, -1);
        break;
      default:
        console.log("something went wrong! Did you change the class?");
    }
  }

  //delete section
  function handleXbutton(e) {
    const name = e.target.className;
    props.removeSection(name);
  }

  return (
    <Draggable draggableId={props.varName} index={props.id}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div>
            <div className="deleteMove">
              <button type="button">M</button>
              <h3> {props.title}</h3>
              <button className={`${props.varName}`} onClick={handleXbutton}>
                X
              </button>
            </div>
            <div className="OuterBox">
              <button
                id="leftClick"
                className={props.varName}
                onClick={handleLeftRightClick}
              >
                left
              </button>
              <WordCards
                className={`${props.varName}`}
                key={`${props.varName}`}
                id={`${props.varName}`}
                cardContent={props.cardContent[props.cardIndex]}
                cardIndex={props.cardIndex}
                class={`${props.varName}-${props.cardIndex}`}
              />
              <button
                id="rightClick"
                className={props.varName}
                onClick={handleLeftRightClick}
              >
                right
              </button>
            </div>
          </div>
          <div className="addButtonDiv">
            <img id="addButtonImg" src={addButton} alt="arrow button" />
          </div>
        </div>
      )}
    </Draggable>
  );
}

export default Sections;
