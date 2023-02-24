import React, { Component, useState } from "react";
import WordCards from "./WordCards";
import leftArrow from "../../public/assets/arrowLft.png";
import leftArrowF from "../../public/assets/arrowLftFull.png";
import closeButton from "../../public/assets/plus-circle.svg";
import { Draggable } from "react-beautiful-dnd";
// import "../styles/sections.scss";

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

    props.dispatch({ type: "updateSEC", payload: returnObj });
  }

  //delete section
  function handleXbutton(e) {
    const sec = e.target.parentElement.parentElement;
    const [innerBox, removeBox] = sec.children;
    const [title, text] = innerBox.children;
    const plus = sec.parentElement.nextElementSibling;

    //Shrinks to center
    removeBox.remove();
    plus.style.display = "none";
    sec.style.margin = "0 auto 0 auto";
    const intID = setInterval(() => {
      const text = title.innerText;
      title.innerText = text.slice(0, -1);
      if (text.length === 1) clearInterval(intID);
    }, 40);
    innerBox.style.height = "0px";
    sec.style.width = "0px";
    //END OF SHRINKS

    const [_, index] = e.target.classList[0].split("-");

    setTimeout(() => {
      props.dispatch({
        type: "deleteSEC",
        payload: { index: parseInt(index) },
      });
    }, 1000);
  }

  function toggleImage(e) {
    e.target.src = e.target.src === leftArrow ? leftArrowF : leftArrow;
  }

  function toggleInsetClass(e) {
    e.target.classList.toggle("inset");
  }

  return (
    <Draggable draggableId={props.varName} index={props.id}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div
            id="section"
            className={`${props.varName} section box_index-${props.id}`}
          >
            <div className="innerBox">
              <div className="title">
                <h3 title={props.description}>{props.title}</h3>
              </div>
              <div className="middleBox">
                <img
                  src={leftArrow}
                  alt="left arrow to go to previous card"
                  className={`leftClick-${props.varName}-${props.id}-${props.cardIndex}-${props.numOfCards} lArrow`}
                  onClick={handleLeftRightClick}
                  onKeyDown={handleLeftRightClick}
                  onMouseEnter={toggleImage}
                  onMouseLeave={toggleImage}
                  onMouseDown={toggleInsetClass}
                  onMouseUp={toggleInsetClass}
                />
                <WordCards
                  className={`${props.varName}`}
                  key={`${props.varName}`}
                  id={`${props.varName}`}
                  cardContent={props.cardContent}
                  cardIndex={props.cardIndex}
                  class={`${props.varName}-${props.cardIndex}`}
                />
                <img
                  src={leftArrow}
                  alt="right arrow to go to next card"
                  className={`rightClick-${props.varName}-${props.id}-${props.cardIndex}-${props.numOfCards} rArrow`}
                  onClick={handleLeftRightClick}
                  onKeyDown={handleLeftRightClick}
                  onMouseEnter={toggleImage}
                  onMouseLeave={toggleImage}
                  onMouseDown={toggleInsetClass}
                  onMouseUp={toggleInsetClass}
                />
              </div>
            </div>
            <div className="removeButton">
              <img
                src={closeButton}
                alt="x for closing the section box"
                className={`${props.varName}-${props.id}`}
                onClick={handleXbutton}
                onKeyDown={handleXbutton}
              />
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
}

export default Sections;
