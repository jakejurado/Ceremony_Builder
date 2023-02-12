import React, { Component, useState } from "react";
import WordCards from "./WordCards";
import leftArrow from "../../public/assets/arrowLft.png";
// import addButton from "../../public/assets/add.png";
import { Draggable } from "react-beautiful-dnd";

function Sections(props) {
  //swaping cards
  function handleLeftRightClick(e) {
    const [button, varname, index, cardIndex, numOfCards] =
      e.target.classList[0].split("-");
    const returnObj = {
      varname,
      action: "updateSEC",
      add: button === "rightClick" ? 1 : -1,
      index: parseInt(index),
      cardIndex: parseInt(cardIndex),
      numOfCards: parseInt(numOfCards),
    };
    props.handleSectionChange(returnObj);
  }

  //delete section
  function handleXbutton(e) {
    const [_, index] = e.target.classList[0].split("-");
    props.handleSectionChange({ index: parseInt(index), action: "deleteSEC" });
  }

  return (
    <Draggable draggableId={props.varName} index={props.id}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div className={`${props.varName} section box_index-${props.id}`}>
            <div className="deleteMove">
              <button type="button">M</button>
              <h3> {props.title}</h3>
              <button
                className={`${props.varName}-${props.id}`}
                onClick={handleXbutton}
              >
                X
              </button>
            </div>
            <div className="OuterBox">
              <button
                id="leftClick"
                className={`leftClick-${props.varName}-${props.id}-${props.cardIndex}-${props.numOfCards}`}
                onClick={handleLeftRightClick}
              >
                left
              </button>
              <WordCards
                className={`${props.varName}`}
                key={`${props.varName}`}
                id={`${props.varName}`}
                cardContent={props.cardContent}
                cardIndex={props.cardIndex}
                class={`${props.varName}-${props.cardIndex}`}
              />
              <button
                id="rightClick"
                className={`rightClick-${props.varName}-${props.id}-${props.cardIndex}-${props.numOfCards}`}
                onClick={handleLeftRightClick}
              >
                right
              </button>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
}

export default Sections;
