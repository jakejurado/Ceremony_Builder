import React, { useState, useContext } from "react";
import { GlobalContext } from "./App";
import Header from "./Header";
import Section from "./Sections";
import SectionsSelector from "./SectionsSelector";
//packages
import { Draggable, DragDropContext, Droppable } from "react-beautiful-dnd";
import { useSwipeable } from 'react-swipeable';

//The main display for the site
function AppMainDisplay() {

  //Global Context comes from App.jsx
  const { 
    selectorTitles, 
    currTemplate, 
    dispatch, 
    selectorSec, 
    domRef, 
    theSidebar, 
    isMobile
  } = useContext(GlobalContext);

    //State for mobile view and enlarging card
  const [ cardDisplay, setCardDisplay ] = useState()
  // const [ cardDisplay, setCardDisplay ] = useState(0)

    //updates card view (when in mobile and card expands)
  function handleCardDisplay(secIndex){
      //handle indexes out of range
    const overIndex = secIndex > currTemplate.order.length - 1;
    const underIndex = secIndex < 0
    
      //handle clearing the card display or updating it
    if((!secIndex && secIndex !==0) || overIndex || underIndex){
      setCardDisplay(undefined)
    } else{
      setCardDisplay(secIndex)
    }
  }

    //creates section components from the template state
  function buildSectionsFromTemplate(temp, selectorSec){
    const { order, ...rest } = temp;
    let loadSections = [];

    for (let i = 0; i < order.length; i++) {
      let [varTitle, pos] = order[i];
  
      //if the selector section is true and the index is at the position it should add the selector box
      if (selectorSec.isVisible && i === selectorSec.position) {
        loadSections.push(
          <SectionsSelector 
            key="selectorBox" 
            data={selectorTitles} 
            index={i} 
            dispatch={dispatch}
         />);
      }
      //load each section into the array to be displayed.
      const { title, description, script } = rest[varTitle];
      loadSections.push(
        <Draggable draggableId={varTitle} index={i} key={varTitle}> 
          {(provided) => 
            (
              <div
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={provided.innerRef}
              >
                <Section
                  key={varTitle}
                  id={i}
                  title={title}
                  cardContent={script[pos]}
                  description={description}
                  varName={varTitle}
                  cardIndex={pos}
                  numOfCards={script.length - 1}
                  dispatch={dispatch}
                  mobileClass=''
                  cardDisplay = {cardDisplay}
                  handleCardDisplay={handleCardDisplay}
                />
              </div>
            )
          }
        </Draggable> 
      );
    }
      //if the order is empty then put selector in the display
    if(!loadSections.length){
      loadSections.push(
        <SectionsSelector 
            key="selectorBox" 
            data={selectorTitles} 
            index={0} 
            dispatch={dispatch}
         />
      )
    }
    return loadSections
  }

    //builds the card view for mobile
  function buildOneSection(template, cardDisplay){
    const secIndex = cardDisplay
    const { order } = template;
    const [secName, pos] = order[secIndex]
    const { title, description, script } = template[secName];
    
    const section = [];
    section.push(
      <Section
        key={secName}
        id={secIndex}
        title={title}
        cardContent={script[pos]}
        description={description}
        varName={secName}
        cardIndex={pos}
        numOfCards={script.length - 1}
        dispatch={dispatch}
        mobileClass='section-mobile'
        cardDisplay = {cardDisplay}
        handleCardDisplay={handleCardDisplay}
      />
    )

    return section
  }

  //DRAG DROP FUNCTIONALITY
  function dragEnd(e) {
    toggleDragStartStop();

    dispatch({
      type: "moveSEC",
      payload: {
        sourceIndex: e.source.index,
        destIndex: e.destination.index,
      },
    });
  }

    //hides all the buttons for the section that is being dragged and drops
  function createToggleDragStartStop() {
    const nodes = [];
    return (e) => {
      if (!nodes.length) {
        const [node] = document.getElementsByClassName(e.draggableId);
        const allBtns = node.querySelector(".secButtons");
        allBtns.style.display = "none";
        nodes.push(allBtns);
      } else {
        let node = nodes.pop();
        node.style.display = "flex";
      }
    };
  }

    //hides buttons on drag start
  const toggleDragStartStop = createToggleDragStartStop();

    //handles swipes left and right for the side bar
  function sidebarSlider(dir){
    console.log(dir)
    if(isMobile){
      switch(dir){
        case 'Left':
          theSidebar.deactivate();
          break;
        case 'Right':
          theSidebar.activate();
          theSidebar.removeEventListeners();
          break;
      }
    }
  }

    //impliments swipe
  const { ref: documentRef } = useSwipeable({
    onSwiped: ({ dir }) => {
      sidebarSlider(dir)
    },
    preventDefaultTouchmoveEvent: true
  });

  React.useEffect(() => {
    documentRef(document);
    // Clean up swipeable event listeners
    return () => documentRef({});
  });


  if(!cardDisplay){
    return (
      <div id='titleAndSections'>
        <Header />
        <div id="mainDisplay" ref={domRef}>
          <DragDropContext onDragEnd={dragEnd} onDragStart={toggleDragStartStop}>
            <Droppable droppableId="sectiondrop">
              {(provided) => (
                <div
                  id="allSections"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {buildSectionsFromTemplate(currTemplate, selectorSec)}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </div>
    );

  } else{
    return(
      <div id='titleAndSections'>
        <div id="mainDisplay" ref={domRef}>
          <div id="allSections">
            {buildOneSection(currTemplate, cardDisplay)}
          </div>
        </div>
      </div>
    )
  }
}

export default AppMainDisplay;
