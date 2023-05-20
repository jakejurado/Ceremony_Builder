import React, { useRef, useContext } from "react";
import { GlobalContext } from "./App";
import Header from "./Header";
import Section from "./Sections";
import SectionSelector from "./SectionSelector";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

//The main display for the site
function MainDisplay() {
  //Global Context comes from App.jsx
  const { selectorTitles, currTemplate, dispatch, selectorSec, domRef, templates, templateTitle } =
    useContext(GlobalContext);

  //loads the sections from the state in display to build the dom
  let loadSections = [];
  console.log({currTemplate})
  const { order, ...rest } = currTemplate;
  for (let i = 0; i < order.length; i++) {
    let [varTitle, pos] = order[i];

    //if the selector section is true and the index is at the position it should add the selector box
    if (selectorSec.isVisible && i === selectorSec.position) {
      loadSections.push(
        <SectionSelector 
          key="selectorBox" 
          data={selectorTitles} 
          index={i} 
          dispatch={dispatch}
       />);
    }

    //load each section into the array to be displayed.
    const { title, description, script } = rest[varTitle];
    loadSections.push(
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
      />
    );
  }
  
  //shows the selector if the template.order is empty
  if(!loadSections.length){
    loadSections.push(
      <SectionSelector
        key="selectorBox"
        data={selectorTitles}
        index={0}
        dispatch={dispatch}
      />
    )
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

  const toggleDragStartStop = createToggleDragStartStop();

  return (
    <div id="mainDisplay" ref={domRef}>
      <DragDropContext onDragEnd={dragEnd} onDragStart={toggleDragStartStop}>
        <Droppable droppableId="sectiondrop">
          {(provided) => (
            <div
              id="allSections"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {loadSections}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default MainDisplay;
