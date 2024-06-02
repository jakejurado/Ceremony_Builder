import React, { useState, useContext, useEffect, useRef } from "react";
import Header from "./Header";
import Section from "./Sections/Sections";
import SectionsSelector from "./Sections/SectionsSelector";
import { useTemplates } from "../hooks/useTemplates";
import { useSidebar } from "../hooks/useSidebar";
import { useScreen } from "../hooks/useScreen";

//packages
import { Draggable, DragDropContext, Droppable } from "react-beautiful-dnd";
import { useSwipeable } from 'react-swipeable';
import { set } from "mongoose";

//The main display for the site
function AppMainDisplay() {
  const { templateTitle, currTemplate, dispatch, selectorSec} = useTemplates();
  const { openSidebar, closeSidebar } = useSidebar();
  const { isMobile } = useScreen();

  const domRef = useRef();

    //State for mobile view and enlarging card
  const [ cardDisplay, setCardDisplay ] = useState()
  // const [ cardDisplay, setCardDisplay ] = useState(0)

    //updates card view (when in mobile and card expands)
  function handleCardDisplay(secIndex){
    console.log('handleCardDisplay', secIndex);

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
      if (selectorSec?.isVisible && i === selectorSec?.position) {
        loadSections.push(
          <SectionsSelector 
            key="selectorBox" 
            index={i} 
         />);
      }
      //load each section into the array to be displayed.
      const { script } = rest[varTitle];
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
                  varname={varTitle}
                  cardIndex={pos}
                  mobileClass=''
                  cardDisplay={cardDisplay}
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
            index={0} 
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
    
    const section = [];
    section.push(
      <Section
        key={secName}
        id={secIndex}
        varname={secName}
        cardIndex={pos}
        mobileClass='section-mobile'
        cardDisplay = {cardDisplay}
        handleCardDisplay={handleCardDisplay}
      />
    )

    return section
  }

  //DRAG DROP FUNCTIONALITY
  function dragEnd(e) {
    toggleDragStartStop(e);

    dispatch({
      type: "moveSEC",
      payload: {
        sourceIndex: e.source.index,
        destIndex: e.destination.index,
        templateTitle,
        currTemplate
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
    if(isMobile){
      switch(dir){
        case 'Left':
          closeSidebar();
          break;
        case 'Right':
          openSidebar();
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

  useEffect(() => {
    documentRef(document);
      // Clean up swipeable event listeners
    return () => documentRef({});
  });

  if(cardDisplay !== 0 && !cardDisplay){
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
