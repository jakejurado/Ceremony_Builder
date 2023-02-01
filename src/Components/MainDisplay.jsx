import React, { Component, useState, useEffect } from "react";
import templateWed from "../server/files/serverDB2";
import templateElope from "../server/files/serverDB";
import Header from "./Header";
import Sections from "./Sections";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { updateSectionOrder } from "../helper/dragdropFuncs";
import {
  removeSection,
  updateCardIndex,
  addSection,
} from "../helper/sectionFuncs";

function MainDisplay() {
  //holds all of the wording
  const [data, setData] = useState([templateWed, templateElope]);
  //determines which template to use from data
  const [template, setTemplate] = useState(data[0]);
  //informs react which script to display from the template  with an array
  const [display, setDisplay] = useState([]);
  

  //ORIGINAL SETUP
  //on page load, setsDisplay is filled from data
  useEffect(() => {
    const newDisplay = prepDisplay(template);
    setDisplay([...newDisplay]);
  }, []);

  //fills the display state with the current template
  function prepDisplay(data) {
    const tempOrder = new Map();
    for (const [key, value] of Object.entries(data)) {
      tempOrder.set(key, value.start_pos);
    }
    return tempOrder;
  }

  //loads the sections from the state in display.
  let loadSections = [];
  display.forEach((set, index) => {
    const [varTitle, pos] = set;
    const { title, description, _, script } = template[varTitle];
    loadSections.push(
      <Sections
        key={varTitle}
        id={index}
        title={title}
        cardContent={script}
        description={description}
        varName={varTitle}
        cardIndex={pos}
        handleSectionChange={handleSectionChange}
      />
    );
  });

  function handleSectionChange(dataObj) {
    switch (dataObj.action) {
      case "deleteSEC":
        removeSection(dataObj.title, display, setDisplay);
        break;
      case "addSEC":
        addSection(dataObj.add, dataObj.title, display, setDisplay);
        break;
      case "updateSEC":
        updateCardIndex(
          dataObj.title,
          dataObj.add,
          display,
          setDisplay,
          template
        );
        break;
      default:
        console.log("error");
    }
  }

  //DRAG DROP FUNCTIONALITY
  function dragEnd(e) {
    updateSectionOrder(
      e.source.index,
      e.destination.index,
      display,
      setDisplay
    );
  }

  return (
    <div id="mainDisplay">
      <Header />
      <DragDropContext onDragEnd={dragEnd}>
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
