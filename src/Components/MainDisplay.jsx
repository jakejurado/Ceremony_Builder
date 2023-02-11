import React, { Component, useState, useEffect } from "react";
import templateWed from "../server/files/serverDB2";
import templateElope from "../server/files/serverDB";
import Header from "./Header";
import Sections from "./Sections";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { updateSectionOrder } from "../functions/mainPage/dragdropFuncs";
import AddSectionButton from "./AddSectionButton";
import SectionSelector from "./SectionSelector";
import { addContentsToCache } from "../functions/cache/cache";
import { addSecToDisplay, fetchSection } from "../functions/sections/addSec";
import { addSelectorSection } from "../functions/sections/selectorSec";
import { updateCardIndex } from "../functions/sections/updateSec";
import { removeSection } from "../functions/sections/removeSec";
import { fetchTitles } from "../functions/sections/selectorBoxFuncs";
import { addToTemplate } from "../functions/template/templateFuncs";
import { fillCacheWithNewSections } from "../functions/cache/sectionCacheFuncs";

function MainDisplay() {
  //cache for all sections from templates and ones added by user during session
  const [sectionCache, setSectionCache] = useState();

  //holds all of the different templates in an array.
  const [templates, setTemplates] = useState({
    wedding: templateWed,
    elope: templateElope,
  });

  //determines which template to be displayed.
  const [templateTitle, setTemplateTitle] = useState("wedding");

  //holds the current selected template (object) that will be displayed on the page
  const [template, setTemplate] = useState(templates[templateTitle]);

  //orders title and card index in an array which React uses to display on the page.
  const [display, setDisplay] = useState([]);

  //informs react when the section selector has been activated.
  const [SelectorSec, setSelectorSec] = useState({
    isVisible: false,
    position: undefined,
  });

  //holds all titles, varnames, and category in an object for all sections
  //RESET TO EMPTY OBJECT FOR PRODUCTION
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

  //On page load, populate display state and cache state
  useEffect(() => {
    //fills the display state with the current template
    function prepDisplay(data) {
      const tempOrder = [];
      for (const [key, value] of Object.entries(data)) {
        tempOrder.push([key, value.start_pos]);
      }
      return tempOrder;
    }

    setDisplay(prepDisplay(template));
    setSectionCache(addContentsToCache(templates, sectionCache));
  }, []);

  //ORIGINAL SETUP FOR PAGELOAD
  useEffect(() => {
    //update cache with new template
    const cache = fillCacheWithNewSections(sectionCache, template, false);
    setSectionCache(cache);
  }, [template]);

  //loads the sections from the state in display.  Build the dom
  let loadSections = [];

  for (let i = 0; i < display.length; i++) {
    let [varTitle, pos] = display[i];
    if (!template.hasOwnProperty(varTitle)) continue;

    const { title, description, script } = template[varTitle];

    loadSections.push(
      <Sections
        key={varTitle}
        id={i}
        title={title}
        cardContent={script[pos]}
        description={description}
        varName={varTitle}
        cardIndex={pos}
        numOfCards={script.length - 1}
        handleSectionChange={handleSectionChange}
      />
    );

    if (SelectorSec.isVisible && i === SelectorSec.position) {
      loadSections.push(
        <SectionSelector
          key="selectorBox"
          data={selectorTitles}
          index={i}
          handleSectionChange={handleSectionChange}
        />
      );
    } else {
      loadSections.push(
        <AddSectionButton
          key={`addButton-${varTitle}-${i}`}
          belowSection={varTitle}
          index={i}
          handleSectionChange={handleSectionChange}
        />
      );
    }
  }

  function handleSectionChange(dataObj) {
    switch (dataObj.action) {
      case "deleteSEC":
        {
          //update the display state, removing selected section
          const newDisplay = removeSection(dataObj.index, display);
          setDisplay([...newDisplay]);
        }
        break;
      case "addSEC":
        {
          //update display
          const { varname, index } = dataObj;
          const res = addSecToDisplay(varname, index, display, template);
          setDisplay([...res.display]);

          //update Template if needed.
          const isDuplicate = res.dup;
          const notInTemplate = !template.hasOwnProperty(varname);
          const notInCache = !sectionCache.hasOwnProperty(varname);

          if (isDuplicate) {
            setTemplate({ ...res.template });
          } else if (notInTemplate && notInCache) {
            console.log("fetch");
            fetchSection(varname, template, setTemplate);
          } else if (notInTemplate) {
            const newTemplate = addToTemplate(
              template,
              varname,
              sectionCache[varname]
            );
            setTemplate({ newTemplate });
          }

          //remove section selector from page
          setSelectorSec({ isVisible: false, position: undefined });
        }
        break;
      case "updateSEC":
        {
          const { add, cardIndex, numOfCards, index } = dataObj;
          //update the display state with the new card selected
          const updatedState = updateCardIndex(
            display,
            cardIndex + add,
            numOfCards,
            index
          );
          setDisplay([...updatedState]);
        }
        break;
      case "selectSEC":
        {
          //update state to signify that a selector box should be inserted
          const newState = addSelectorSection(dataObj.index);
          setSelectorSec({ ...newState });
          //fetch titles if not present int state.
          if (Object.keys(selectorTitles).length === 0)
            fetchTitles(setSelectorTitles);
        }
        break;
      case "swapSEC":
        {
          const { sourceIndex, destIndex } = dataObj;
          //create the new order for the display state
          const newDisplay = updateSectionOrder(
            sourceIndex,
            destIndex,
            display
          );
          setDisplay([...newDisplay]);
        }
        break;
      default:
        console.log("error", dataObj);
    }
  }

  //DRAG DROP FUNCTIONALITY
  function dragEnd(e) {
    handleSectionChange({
      action: "swapSEC",
      sourceIndex: e.source.index,
      destIndex: e.destination.index,
    });
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
