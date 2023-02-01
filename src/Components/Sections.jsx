import React, { Component, useState } from "react";
import WordCards from "./WordCards";
import leftArrow from "../../public/assets/arrowLft.png";
// import addButton from "../../public/assets/add.png";
import { Draggable } from "react-beautiful-dnd";

function Sections(props) {
  //swaping cards
  function handleLeftRightClick(e) {
    const button = e.target.id;
    const [title, _] =
      e.target.parentElement.children[1].classList[1].split("-");
    const returnObj = {
      title,
      action: "updateSEC",
      add: button === "rightClick" ? 1 : -1,
    };
    props.handleSectionChange(returnObj);
  }

  //delete section
  function handleXbutton(e) {
    const title = e.target.className;
    props.handleSectionChange({ title, action: "deleteSEC" });
    // props.removeSection(title);
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
        </div>
      )}
    </Draggable>
  );
}

export default Sections;
