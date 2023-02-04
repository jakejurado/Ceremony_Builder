import React, { Component, useState, useEffect } from "react";
import templateWed from "../server/files/serverDB2";
import templateElope from "../server/files/serverDB";
import Header from "./Header";
import Sections from "./Sections";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { updateSectionOrder } from "../helper/dragdropFuncs";
import AddSectionButton from "./AddSectionButton";
import SectionSelector from "./SectionSelector";
import {
  removeSection,
  updateCardIndex,
  addSection,
  addSelectorSection,
  addContentsToCache,
} from "../helper/sectionFuncs";
import { fetchTitles } from "../helper/selectorBoxFuncs";

function MainDisplay() {
  //holds all of the different templates in an array.
  const [data, setData] = useState([templateWed, templateElope]);
  //cache for all sections from templates and ones added by user during session
  const [sectionCache, setSectionCache] = useState();
  //holds the current selected template (object) that will be displayed on the page
  const [template, setTemplate] = useState(data[0]);
  //orders title and card index in an array which React uses to display on the page.
  const [display, setDisplay] = useState([]);
  //informs react when the section selector has been activated.
  const [SelectorSec, setSelectorSec] = useState({
    isVisible: false,
    position: undefined,
  });

  //holds all titles, varnames, and category in an object for all sections
  //RESET TO EMPTY OBJECT
  const [selectorTitles, setSelectorTitles] = useState({
    "Basic Elements": {
      "Giving Away": "giving_away",
      "Opening Remarks: First Words": "opening_remakrs1",
      "Opening Remarks: Main Content": "opening_remarks2",
      "Declaration of Intent": "declaration",
      Charge: "charge",
      "Transition to Vows": "vows_symbolism",
      Vows: "vow_content",
      "Rings Content": "ring_content",
      "Ring Exchange": "ring_exchange",
      Pronouncement: "pronouncement",
      "The Kiss": "kiss",
      Introduction: "introduction",
    },
    Readings: { "Reading: Traditional": "reading_traditional" },
    Prayer: { "Prayer: Opening": "prayer_opening" },
    Unity: { "Unity: Cocktail": "unity_cocktail" },
    Religious: { Arras: "arras" },
    "Including Others": { "Last Kiss": "last_kiss" },
    "Other Options": { "License Signing": "license_sign" },
  });

  //ORIGINAL SETUP FOR PAGELOAD
  //on page load, setsDisplay is filled from data
  useEffect(() => {
    const newDisplay = prepDisplay(template);
    setDisplay([...newDisplay]);
    setSectionCache(addContentsToCache(data, sectionCache));
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

    if (SelectorSec.isVisible && index === SelectorSec.position) {
      loadSections.push(
        <SectionSelector
          data={selectorTitles}
          index={index}
          handleSectionChange={handleSectionChange}
        />
      );
    } else {
      loadSections.push(
        <AddSectionButton
          key={`addButton-${varTitle}-${index}`}
          belowSection={varTitle}
          index={index}
          handleSectionChange={handleSectionChange}
        />
      );
    }
  });

  function handleSectionChange(dataObj) {
    switch (dataObj.action) {
      case "deleteSEC":
        removeSection(dataObj.title, display, setDisplay);
        break;
      case "addSEC":
        addSection(
          dataObj.varname,
          dataObj.index,
          display,
          setDisplay,
          sectionCache,
          setSectionCache
        );
        setSelectorSec({ isVisible: false, position: undefined });
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
      case "selectSEC":
        addSelectorSection(dataObj.index, setSelectorSec);
        if (Object.keys(selectorTitles).length === 0)
          fetchTitles(setSelectorTitles);
        break;
      default:
        console.log("error", dataObj);
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
