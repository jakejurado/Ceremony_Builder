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
import { usePopup } from "../../hooks/usePopup";
import { addSelectorSection } from "../../functions/sections/addSelectorSection";

  //Section component holds all the sections
function Sections(props) {
  const {id, varname, cardIndex, mobileClass, cardDisplay, handleCardDisplay} = props

    //global context
  const { popupDispatch } = usePopup();
  const { names, dispatch, currTemplate, templateTitle, setSelectorSec } = useTemplates();
  const {description, script, title} = currTemplate[varname];
  const numOfCards = script.length - 1;
  const cardContent = script[cardIndex];


    //card dom ref
  const cardDivRef = useRef(null)
  const sectionRef = useRef(null)
 
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
  function handleArrowClick(dir) {
    saveContent();
    const index = parseInt(id);
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
  function handleLeftRightClick(dir) {
      //save the content of the cards
    saveContent();
    
      //fill the payload object from the dataset
    const payloadObj = {
      varname,
      action: "updateSEC",
      add: dir === "Right" ? 1 : -1,
      index: id,
      cardIndex: cardIndex,
      numOfCards,
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
    
      //update state
    dispatch({type: 'updateWords', payload: {textContent, sectionName: varname, cardIndex, templateTitle}})
  }

  //MOBILE 
    //swipe functionality for the card box
  const handlersCardBox = useSwipeable({
    onSwiped: ({ event }) => {
      event.stopPropagation();
    },
    onSwipedRight: ({event}) => {
      handleLeftRightClickSwipe('Right')
    },
    onSwipedLeft: ({event}) => {
      handleLeftRightClickSwipe('Left')
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
        handleLeftRightClickSwipe('Up')
      }
    },
    onSwipedDown: ({event}) => {
      if(mobileClass){
        handleLeftRightClickSwipe('Down')
      }
    },
    
    preventDefaultTouchmoveEvent: true
  });

    //swaping cards within a section using swipe
  function handleLeftRightClickSwipe(dir) {
    saveContent();
    
    const returnObj= {
      varname,
      action: "updateSEC",
      add: dir === 'Right' ? -1 : 1,
      index: id,
      cardIndex,
      numOfCards,
      templateTitle
    }

    const i = parseInt(id);
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
    handleCardDisplay(id);
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


  function handleAiButtonClick(e) {
    const dataVarname = varname
    const dataIndex = id
    const dataCardIndex = cardIndex
    // const dataCardContent = e.target.parentNode.dataset.cardcontent;
    const dataCardContent = cardDivRef.current.innerHTML
    popupDispatch({ type: "boxAI", subAct: { dataVarname, dataIndex, dataCardContent, dataCardIndex } });
  }

  function handleAddButtonClick(){
    const insertSelector = addSelectorSection(id);
    setSelectorSec(insertSelector);
  }


  return (
    <div
      // id="section"
      className={`section ${varname} ${mobileClass} section shrinkWidth fadeIn`}
      ref={sectionRef}
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
            className='lArrow'
            onClick={() => handleLeftRightClick('Left')}
            onKeyDown={() => handleLeftRightClick('Left')}
            onMouseEnter={toggleImage}
            onMouseLeave={toggleImage}
            onMouseDown={toggleInsetClass}
            onMouseUp={toggleInsetClass}
          />
          <SectionsWordCards
            className={`${varname}`}
            key={`${varname}`}
            id={`${varname}`}
            cardContent={cardContent}
            cardIndex={cardIndex}
            class={`${varname}-${cardIndex}`}
            title={title} //only need for title.
            cardDivRef={cardDivRef}
            saveContent={saveContent}
            handleCardDisplay={()=>handleCardDisplay(id)}
            cardDisplay={cardDisplay}
          />
          <img
            src={leftArrow}
            alt="right arrow to go to next card"
            className='rArrow'
            data-dir="Right"
            onClick={() => handleLeftRightClick('Right')}
            onKeyDown={() => handleLeftRightClick('Right')}
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
            className={`${varname}-${id}`}
            onClick={handleXbutton}
            onKeyDown={handleXbutton}
          />
        </div>
        <SectionsButtonAdd
          key={`addButton-${varname}-${id}`}
          handleClick={handleAddButtonClick}
        />
        <SectionsButtonAI
          key='aiButton'
          handleClick={handleAiButtonClick}
        />
        <div className="upArrow">
          <img
            onClick={() =>handleArrowClick('Up')}
            onKeyDown={() =>handleArrowClick('Up')}
            alt="arrow pointing up"
            src={arrow}
          />
        </div>
        <div className="dnArrow">
          <img
            src={arrow}
            onClick={() =>handleArrowClick('Down')}
            onKeyDown={() =>handleArrowClick('Down')}
            alt="arrow pointing down"
          />
        </div>
      </div>
      { mobileClass && <ButtonClose classNames='' clickFunc={handleMobileCloseButtonClick} /> }
    </div>
  );
}

export default Sections;
