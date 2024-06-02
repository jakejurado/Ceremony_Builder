import React, { useRef } from "react";
// import SectionsWordCards from "./SectionsWordCards";
import SectionsWordCards from "./SectionsWordCards";
import SectionsButtonAdd from "./SectionsButtonAdd";
import SectionsButtonAI from "./SectionsButtonAI";
import leftArrow from "../../../public/assets/arrowLft.png";
import leftArrowF from "../../../public/assets/arrowLftFull.png";
import arrow from "../../../public/assets/arrow-up-circle.svg";
import plus from "../../../public/assets/plus-circle.svg";
import ButtonClose from '../Utility/ButtonClose';
import { formatCards } from "../../functions/wordCards/formatCards";
import { useSwipeable } from 'react-swipeable';
import { useTemplates } from "../../hooks/useTemplates";

  //Section component holds all the sections
function Sections(props) {
  const {id, varName, cardIndex, mobileClass, cardDisplay, handleCardDisplay} = props

    //global context
  const { names, dispatch, currTemplate, templateTitle } = useTemplates();

  const {description, script, title} = currTemplate[varName];
  const numOfCards = script.length - 1;
  const cardContent = script[cardIndex];

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
      dispatch({
        type: "deleteSEC",
        payload: { index: parseInt(index), templateTitle },
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
        templateTitle,
        currTemplate
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
    templateTitle
  };

    //update state.
  dispatch({ type: "updateSEC", payload: payloadObj });
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
    dispatch({type: 'updateWords', payload: {textContent, sectionName, cardIndex, templateTitle}})
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
    //   if(mobileClass){
    //     handleLeftRightClickSwipe(event, 'Up')
    //   }
    // },
    // onSwipedDown: ({event}) => {
    //   if(mobileClass){
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
      if(mobileClass){
        handleLeftRightClickSwipe(event, 'Up')
      }
    },
    onSwipedDown: ({event}) => {
      if(mobileClass){
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
      varname: dom.dataset.varname,
      action: "updateSEC",
      add: dir === 'Right' ? -1 : 1,
      index: parseInt(dom.dataset.index),
      cardIndex: parseInt(dom.dataset.cardindex),
      numOfCards: parseInt(dom.dataset.numofcards),
      templateTitle
    }

    const i = parseInt(dom.dataset.index);
    let returnIndex = dir === 'Up' ? i + 1 : i - 1

    switch(dir){
      case 'Right':
      case 'Left':
        dispatch({ type: "updateSEC", payload: returnObj });
        break;
      case "Up":
      case "Down":
          handleCardDisplay(returnIndex);
        break;
      default:
    }
  }

  //closes the full screen card when clicked.
  function handleMobileCloseButtonClick(e){
    saveContent();
    handleCardDisplay();
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
    <div
      // id="section"
      className={`section ${varName} ${mobileClass} section shrinkWidth fadeIn`}
      data-varname={varName}
      data-cardindex={cardIndex}
      data-numofcards={numOfCards}
      data-index={id}
      {...handlersSectiondBox}
    >
      <div className="innerBox shrinkHeight">
        <div className="title">
          <h3 title={description}>{title}</h3>
        </div>
        <div className="middleBox" {...handlersCardBox}>
          <img
            src={leftArrow}
            alt="left arrow to go to previous card"
            className={`leftClick-${varName}-${id}-${cardIndex}-${numOfCards} lArrow`}
            data-varname={varName}
            data-cardindex={cardIndex}
            data-numofcards={numOfCards}
            data-index={id}
            data-dir="Left"
            onClick={handleLeftRightClick}
            onKeyDown={handleLeftRightClick}
            onMouseEnter={toggleImage}
            onMouseLeave={toggleImage}
            onMouseDown={toggleInsetClass}
            onMouseUp={toggleInsetClass}
          />
          <SectionsWordCards
            className={`${varName}`}
            key={`${varName}`}
            id={`${varName}`}
            cardContent={cardContent}
            cardIndex={cardIndex}
            class={`${varName}-${cardIndex}`}
            title={title} //only need for title.
            cardDivRef={cardDivRef}
            saveContent={saveContent}
            handleCardDisplay={handleCardDisplay}
            cardDisplay={cardDisplay}
          />
          <img
            src={leftArrow}
            alt="right arrow to go to next card"
            className={`rightClick-${varName}-${id}-${cardIndex}-${numOfCards} rArrow`}
            data-varname={varName}
            data-cardindex={cardIndex}
            data-numofcards={numOfCards}
            data-index={id}
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
            className={`${varName}-${id}`}
            onClick={handleXbutton}
            onKeyDown={handleXbutton}
          />
        </div>
        <SectionsButtonAdd
          key={`addButton-${varName}-${id}`}
          belowSection={varName}
          index={id}
          dispatch={dispatch}
        />
        <SectionsButtonAI
          proper = {props}
          key={`aiButton-${varName}-${id}`}
          belowSection={varName}
          index={id}
          varName={varName}
          cardIndex={cardIndex}
          cardContent={cardContent}
          saveContent={saveContent}
          handleCardDisplay={handleCardDisplay}
          cardDisplay={cardDisplay}
        />
        <div className="upArrow">
          <img
            className={`up-${id}`}
            data-dir='Up'
            data-index={id}
            onClick={handleArrowClick}
            // onKeyDown={{ handleArrowClick }}
            alt="arrow pointing up"
            src={arrow}
          />
        </div>
        <div className="dnArrow">
          <img
            src={arrow}
            className={`dn-${id}`}
            data-dir='Down'
            data-index={id}
            onClick={handleArrowClick}
            // onKeyDown={{ handleArrowClick }}
            alt="arrow pointing down"
          />
        </div>
      </div>
      { mobileClass && <ButtonClose classNames='' clickFunc={handleMobileCloseButtonClick} /> }
    </div>
  );
}

export default Sections;
