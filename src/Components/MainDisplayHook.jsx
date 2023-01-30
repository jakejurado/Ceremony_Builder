import React, { Component, useState, useEffect } from "react";
import templateWed from "../server/files/serverDB2";
import templateElope from "../server/files/serverDB";
import Header from "./Header";
import Sections from "./Sections";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

function MainDisplay() {
  //holds all of the wording
  const [data, setData] = useState([templateWed, templateElope]);
  //determines which template to use from data
  const [template, setTemplate] = useState(data[0]);
  //informs react which script to display from the template  with an array
  const [display, setDisplay] = useState([]);

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

  //receives the name of the section and the direction of the arrow and updates display state.
  function updateCardIndex(name, dir) {
    const currDisplay = new Map(display);
    const len = template[name].script.length - 1;
    //adds/subtracts from the current position
    let pos = currDisplay.get(name) + dir;
    //loops the cards when you reach the end or beginning
    pos = pos > len ? 0 : pos < 0 ? len : pos;
    //updates state
    currDisplay.set(name, pos);
    setDisplay([...currDisplay]);
  }

  //removes section from display
  function removeSection(name) {
    const newOrder = [];
    for (let item of display) {
      if (item[0] !== name) newOrder.push(item);
    }
    setDisplay([...newOrder]);
  }

  //swaps sections in display
  function updateSectionOrder(sourceIndex, destIndex) {
    if (sourceIndex === destIndex) return;
    const newOrder = [];
    for (let i = 0; i < display.length; i++) {
      if (i === destIndex && sourceIndex > destIndex)
        newOrder.push(display[sourceIndex]);
      if (i !== sourceIndex) newOrder.push(display[i]);
      if (i === destIndex && sourceIndex < destIndex)
        newOrder.push(display[sourceIndex]);
    }
    setDisplay([...newOrder]);
  }

  function addSection(name) {
    console.log(name);
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
        updateCardIndex={updateCardIndex}
        removeSection={removeSection}
        display={display}
      />
    );
  });

  function dragEnd(e) {
    updateSectionOrder(e.source.index, e.destination.index);
  }

  return (
    <div>
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
