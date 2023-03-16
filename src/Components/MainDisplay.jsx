import React, { useRef, useContext } from "react";
import { GlobalContext } from "./App";
import Header from "./Header";
import Section from "./Sections";
import SectionSelector from "./SectionSelector";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

//The main display for the site
function MainDisplay() {
  //Global Context comes from App.jsx
  const { selectorTitles, template, dispatch, selectorSec, domRef } =
    useContext(GlobalContext);

  //loads the sections from the state in display.  Build the dom
  let loadSections = [];
  // console.log({ template });
  const { order, ...rest } = template;
  for (let i = 0; i < order.length; i++) {
    let [varTitle, pos] = order[i];

    //This occurs when the display is updated, but the template hasn't updated from the fetch yet.  skip that section until ready.
    if (!rest.hasOwnProperty(varTitle)) continue;

    //if the selector section is true and the index is at the position it should go, add the selector box
    if (selectorSec.isVisible && i === selectorSec.position) {
      loadSections.push(
        <SectionSelector
          key="selectorBox"
          data={selectorTitles}
          index={i}
          dispatch={dispatch}
        />
      );
    }
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

  function createToggleDragStartStop() {
    const nodes = [];
    return (e) => {
      if (!nodes.length) {
        const [node] = document.getElementsByClassName(e.draggableId);
        const removeBox = node.querySelector(".removeButton");
        const addBox =
          node.parentElement.nextElementSibling.querySelector(".addButton");
        removeBox.style.display = "none";
        addBox.style.display = "none";
        nodes.push(removeBox, addBox);
      } else {
        while (nodes.length) {
          let node = nodes.pop();
          node.style.display = "flex";
        }
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
