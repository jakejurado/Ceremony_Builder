import React, { useContext, useState, useRef, useReducer } from "react";
// import SectionsWordCards from "./SectionsWordCards";
import SectionsWordCards from "./SectionsWordCards-mobile";
import SectionsAddButton from "./SectionsAddButton";
import { GlobalContext } from "./App";
import { Draggable } from "react-beautiful-dnd";
import leftArrow from "../../public/assets/arrowLft.png";
import leftArrowF from "../../public/assets/arrowLftFull.png";
import arrow from "../../public/assets/arrow-up-circle.svg";
import plus from "../../public/assets/plus-circle.svg";
import ButtonClose from "./ButtonClose"
import { formatCards } from "../functions/wordCards/formatCards";
import { useSwipeable } from 'react-swipeable';

  //Section component holds all the sections
function Sections(props) {

    //global context
  const { names, dispatch, currTemplate } = useContext(GlobalContext);

    //card dom ref
  const cardDivRef = useRef(null)
 
  //4 BUTTONS ON TOP OF SECTIONs (add, delete, move section up/down)
    //delete section: shrinks the section and then sends a dispatch to remove sec from order
  function handleXbutton(e) {
    const sec = findParentNode(e.target, 'section') 
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

    //handles the up and down arrows of a section, changing the section order.
  function handleArrowClick(e) {
    saveContent();
    const index = parseInt(e.target.dataset.index);
    const dir = e.target.dataset.dir
    const numOfSec = currTemplate.order.length - 1;

    let sourceIndex;
    let destIndex;

      //determine if user clicked up or down.
    if (dir === "Up") {
      sourceIndex = index - 1 < 0 ? 0 : index - 1;
      destIndex = index;
    } else {
      sourceIndex = index;
      destIndex = index + 1 > numOfSec ? numOfSec : index + 1;
    }

      //update state
    dispatch({
      type: "moveSEC",
      payload: {
        sourceIndex,
        destIndex,
      },
    });
  }

  //SECTION CARDS NAVIGATION
    //swaping cards within a section using click
  function handleLeftRightClick(e) {
    //save the content of the cards
  saveContent();
  
    //fill the payload object from the dataset
  const payloadObj = {
    varname: e.target.dataset.varname,
    action: "updateSEC",
    add: e.target.dataset.dir === "Right" ? 1 : -1,
    index: parseInt(e.target.dataset.index),
    cardIndex: parseInt(e.target.dataset.cardindex),
    numOfCards: parseInt(e.target.dataset.numofcards),
  };

    //update state.
  props.dispatch({ type: "updateSEC", payload: payloadObj });
}
    //changes the arrow button when hoovering
  function toggleImage(e) {
    e.target.src = e.target.src === leftArrow ? leftArrowF : leftArrow;
  }
    //changes the arrow button class when clicked
  function toggleInsetClass(e) {
    e.target.classList.toggle("inset");
  }

    //saves card's user input and formats it for the database.
  function saveContent(){
      //removes names and adds line breaks
    const textContent = formatCards(cardDivRef.current.innerHTML, names);
    const sectionName = cardDivRef.current.dataset.varname;
    const cardIndex = parseInt(cardDivRef.current.dataset.cardindex);
    
      //update state
    dispatch({type: 'updateWords', payload: {textContent, sectionName, cardIndex}})
  }

  //MOBILE 
    //swipe functionality for the card box
  const handlersCardBox = useSwipeable({
    onSwiped: ({ event }) => {
      event.stopPropagation();
    },
    onSwipedRight: ({event}) => {
      handleLeftRightClickSwipe(event, 'Right')
    },
    onSwipedLeft: ({event}) => {
      handleLeftRightClickSwipe(event, 'Left')
    },
    // onSwipedUp: ({event}) => {
    //   if(props.mobileClass){
    //     handleLeftRightClickSwipe(event, 'Up')
    //   }
    // },
    // onSwipedDown: ({event}) => {
    //   if(props.mobileClass){
    //     handleLeftRightClickSwipe(event, 'Down')
    //   }
    // },
    
    preventDefaultTouchmoveEvent: true
  });

  const handlersSectiondBox = useSwipeable({
    onSwiped: ({ event }) => {
      event.stopPropagation();
    },
    onSwipedUp: ({event}) => {
      if(props.mobileClass){
        handleLeftRightClickSwipe(event, 'Up')
      }
    },
    onSwipedDown: ({event}) => {
      if(props.mobileClass){
        handleLeftRightClickSwipe(event, 'Down')
      }
    },
    
    preventDefaultTouchmoveEvent: true
  });

    //swaping cards within a section using swipe
  function handleLeftRightClickSwipe(event, dir) {
    saveContent();
    
    const dom = findParentNode(event.target, 'section');
    const returnObj= {
      action: "updateSEC",
      add: dir === 'Right' ? -1 : 1,
      index: parseInt(dom.dataset.index),
      cardIndex: parseInt(dom.dataset.cardindex),
      numOfCards: parseInt(dom.dataset.numofcards)
    }

    const i = parseInt(dom.dataset.index);
    let returnIndex = dir === 'Up' ? i + 1 : i - 1

    switch(dir){
      case 'Right':
      case 'Left':
        console.log('Right/Left')
        props.dispatch({ type: "updateSEC", payload: returnObj });
        break;
      case "Up":
      case "Down":
        console.log('Up/Down')
          props.handleCardDisplay(returnIndex);
        break;
      default:
        console.log(dir)
        console.log('whaat???')
    }
  }

  //closes the full screen card when clicked.
  function handleMobileCloseButtonClick(e){
    saveContent();
    props.handleCardDisplay();
  }

  //STORE WITH FUNCTIONS
    //finds the parent node that has the metaData.
  function findParentNode(currNode, parentNodeClass){
    let dom = currNode
    while(dom && !dom.classList.contains(parentNodeClass)){
      dom = dom.parentNode
    }
    return dom
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
            className={`${props.varName} ${props.mobileClass} section shrinkWidth fadeIn`}
            data-varname={props.varName}
            data-cardindex={props.cardIndex}
            data-numofcards={props.numOfCards}
            data-index={props.id}
            {...handlersSectiondBox}
          >
            <div className="innerBox shrinkHeight">
              <div className="title">
                <h3 title={props.description}>{props.title}</h3>
              </div>
              <div className="middleBox" {...handlersCardBox}>
                <img
                  src={leftArrow}
                  alt="left arrow to go to previous card"
                  className={`leftClick-${props.varName}-${props.id}-${props.cardIndex}-${props.numOfCards} lArrow`}
                  data-varname={props.varName}
                  data-cardindex={props.cardIndex}
                  data-numofcards={props.numOfCards}
                  data-index={props.id}
                  data-dir="Left"
                  onClick={handleLeftRightClick}
                  onKeyDown={handleLeftRightClick}
                  onMouseEnter={toggleImage}
                  onMouseLeave={toggleImage}
                  onMouseDown={toggleInsetClass}
                  onMouseUp={toggleInsetClass}
                />
                <SectionsWordCards
                  className={`${props.varName}`}
                  key={`${props.varName}`}
                  id={`${props.varName}`}
                  cardContent={props.cardContent}
                  cardIndex={props.cardIndex}
                  class={`${props.varName}-${props.cardIndex}`}
                  title={props.title} //only need for title.
                  cardDivRef={cardDivRef}
                  saveContent={saveContent}
                  handleCardDisplay={props.handleCardDisplay}
                  cardDisplay={props.cardDisplay}
                />
                <img
                  src={leftArrow}
                  alt="right arrow to go to next card"
                  className={`rightClick-${props.varName}-${props.id}-${props.cardIndex}-${props.numOfCards} rArrow`}
                  data-varname={props.varName}
                  data-cardindex={props.cardIndex}
                  data-numofcards={props.numOfCards}
                  data-index={props.id}
                  data-dir="Right"
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
              <SectionsAddButton
                key={`addButton-${props.varName}-${props.id}`}
                belowSection={props.varName}
                index={props.id}
                dispatch={props.dispatch}
              />
              <div className="upArrow">
                <img
                  className={`up-${props.id}`}
                  data-dir='Up'
                  data-index={props.id}
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
                  data-dir='Down'
                  data-index={props.id}
                  onClick={handleArrowClick}
                  // onKeyDown={{ handleArrowClick }}
                  alt="arrow pointing down"
                />
              </div>
            </div>
            { props.mobileClass && <ButtonClose classNames='' clickFunc={handleMobileCloseButtonClick} /> }
          </div>
        </div>
      )}
    </Draggable>
  );
}

export default Sections;
