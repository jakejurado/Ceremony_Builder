import React, { useContext, useState, useRef } from "react";
import WordCards from "./WordCards";
import AddSectionButton from "./AddSectionButton";
import { GlobalContext } from "./App";
import { Draggable } from "react-beautiful-dnd";
import leftArrow from "../../public/assets/arrowLft.png";
import leftArrowF from "../../public/assets/arrowLftFull.png";
import arrow from "../../public/assets/arrow-up-circle.svg";
import plus from "../../public/assets/plus-circle.svg";

function Sections(props) {
  //global context
  const { dispatch, currTemplate } = useContext(GlobalContext);
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

  //delete section: shrinks the section and then sends a dispatch to remove sec from order
  function handleXbutton(e) {
    const sec = e.target.parentElement.parentElement.parentElement;
    const [innerBox, removeBox] = sec.children;
    const [title, text] = innerBox.children;

    //Shrinks the section to center
    removeBox.remove();
    sec.style.margin = "0 auto 0 auto";
    const intID = setInterval(() => {
      const text = title.innerText;
      title.innerText = text.slice(0, -1);
      if (text.length === 1) clearInterval(intID);
    }, 15);
    innerBox.style.height = "0px";
    sec.style.width = "0px";
    //END OF SHRINKS

    const [_, index] = e.target.classList[0].split("-");

    setTimeout(() => {
      //delayed dispatch in order to see section shrink
      props.dispatch({
        type: "deleteSEC",
        payload: { index: parseInt(index) },
      });
    }, 500);
  }

  //styling for left and right arrows
  function toggleImage(e) {
    e.target.src = e.target.src === leftArrow ? leftArrowF : leftArrow;
  }
  //styling for left & right arrows
  function toggleInsetClass(e) {
    e.target.classList.toggle("inset");
  }

  //handles the up and down arrows of a section, changing the section order.
  function handleArrowClick(e) {
    let [dir, index] = e.target.classList[0].split("-");
    index = parseInt(index);
    const numOfSec = currTemplate.order.length - 1;

    let sourceIndex;
    let destIndex;

    if (dir === "up") {
      sourceIndex = index - 1 < 0 ? 0 : index - 1;
      destIndex = index;
    } else {
      sourceIndex = index;
      destIndex = index + 1 > numOfSec ? numOfSec : index + 1;
    }

    dispatch({
      type: "moveSEC",
      payload: {
        sourceIndex,
        destIndex,
      },
    });
  }

  const [curserPos, setcurserPos] = useState();
  const activeDom = useRef();
  function captureCardContent(){
    const innerText = activeDom.current.innerText;
    const curserPos = activeDom.current.selectionStart;
    setcurserPos(curserPos);
    // dispatch({type: 'updateWords', payload: {innerText, sectionName: 'what'}})
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
            className={`${props.varName} section box_index-${props.cardIndex}`}
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
            <div className="secButtons">
              <div className="removeButton">
                <img
                  src={plus}
                  alt="x for closing the section box"
                  className={`${props.varName}-${props.id}`}
                  onClick={handleXbutton}
                  onKeyDown={handleXbutton}
                />
              </div>
              <AddSectionButton
                key={`addButton-${props.varName}-${props.id}`}
                belowSection={props.varName}
                index={props.id}
                dispatch={props.dispatch}
              />
              <div className="upArrow">
                <img
                  className={`up-${props.id}`}
                  onClick={handleArrowClick}
                  // onKeyDown={{ handleArrowClick }}
                  alt="arrow pointing up"
                  src={arrow}
                />
              </div>
              <div className="dnArrow">
                <img
                  src={arrow}
                  className={`dn-${props.id}`}
                  onClick={handleArrowClick}
                  // onKeyDown={{ handleArrowClick }}
                  alt="arrow pointing down"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
}

export default Sections;
