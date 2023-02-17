import React, { useState, useEffect, useReducer, useContext } from "react";
import { GlobalContext } from "./App";
import { templateWed, templateWed2 } from "../server/files/serverDB2";
import templateElope from "../server/files/serverDB";
import Header from "./Header";
import Sections from "./Sections";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { updateSectionOrder } from "../functions/mainPage/dragdropFuncs";
import AddSectionButton from "./AddSectionButton";
import SectionSelector from "./SectionSelector";
import { addContentsToCache } from "../functions/cache/cache";
import { addSecToOrder, fetchSection } from "../functions/sections/addSec";
import { addSelectorSection } from "../functions/sections/selectorSec";
import { updateCardIndex } from "../functions/sections/updateSec";
import { removeSection } from "../functions/sections/removeSec";
import { fetchTitles } from "../functions/sections/selectorBoxFuncs";
import { addToTemplate } from "../functions/template/templateFuncs";
import { fillCacheWithNewSections } from "../functions/cache/sectionCacheFuncs";
import { updateTemplate } from "../functions/sections/updateTemplate";
import Section from "./Sections";
function MainDisplay() {
  //cache for all sections from templates and ones added by user during session
  const [sectionCache, setSectionCache] = useState();

  const { currTemplate } = useContext(GlobalContext);

  //informs react when the section selector Box has been activated.
  const [selectorSec, setSelectorSec] = useState({
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
  // const [selectorTitles, setSelectorTitles] = useState({});

  //holds data that needs to update state asynchronously
  const [updatedData, setUpdatedData] = useState(false);

  //holds the current template, which contains the sections and the order of the sections, used to fill the page.
  const [template, dispatch] = useReducer(reducer, currTemplate);

  //On page load, populate display state and cache state
  useEffect(() => {
    console.log("in useeffect");
    setSectionCache(addContentsToCache(currTemplate, sectionCache));
    dispatch({ type: "loadTEMPLATE", payload: currTemplate });
  }, [currTemplate]);

  //updates state when new data is fetched or retrieved asynchronously
  useEffect(() => {
    dispatch(updatedData);
  }, [updatedData]);

  function reducer(state, action) {
    const { order, ...sections } = state;
    const { type, payload } = action;

    switch (type) {
      case "addSEC": {
        //update order
        const { varname, index } = payload;
        const data = addSecToOrder(varname, index, order, sections);

        //update Template if needed.
        let newTemplate = updateTemplate(
          varname,
          sections,
          data,
          setUpdatedData,
          sectionCache
        );

        //remove section selector from page
        setSelectorSec({ isVisible: false, position: undefined });

        //update state
        return { ...newTemplate, order: data.order };
      }
      case "loadSEC": {
        //this case is only ran after a section is fetched from the backend.
        //update the section cache
        const { order, ...sections } = payload;
        const newCache = fillCacheWithNewSections(sectionCache, sections);
        setSectionCache(newCache);

        //update the state
        return payload;
      }
      case "deleteSEC": {
        const newOrder = removeSection(payload.index, order);
        return { ...sections, order: newOrder };
      }
      case "updateSEC": {
        //changes the cardIndex of a section
        const newOrder = updateCardIndex(order, payload);
        return { order: newOrder, ...sections };
      }
      case "moveSEC": {
        //create the new order for the display state after drag and drop
        const newOrder = updateSectionOrder(order, payload);
        return { order: newOrder, ...sections };
      }
      case "selectSEC": {
        //fetch titles if not present int state.
        if (Object.keys(selectorTitles).length === 0)
          fetchTitles(setSelectorTitles);

        //update state to signify that a selector box should be inserted.
        const insertSelector = addSelectorSection(payload.index);
        setSelectorSec(insertSelector);
        return { ...sections, order };
      }
      case "initialLoad": {
        //loads the current state
        return state;
      }
      case "loadTEMPLATE": {
        return payload;
      }
      default: {
        // returns the current state
        console.log("default");
        return state;
      }
    }
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
        const removeBox = node.querySelector(".removeBox");
        const addBox =
          node.parentElement.nextElementSibling.querySelector(".circle");
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

  //loads the sections from the state in display.  Build the dom
  let loadSections = [];
  const { order, ...rest } = template;

  for (let i = 0; i < order.length; i++) {
    let [varTitle, pos] = order[i];

    //This occurs when the display is updated, but the template hasn't updated from the fetch yet.  skip that section until ready.
    if (!rest.hasOwnProperty(varTitle)) continue;

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
      //otherwise add the plus button to add a section
    } else {
      loadSections.push(
        <AddSectionButton
          key={`addButton-${varTitle}-${i}`}
          belowSection={varTitle}
          index={i}
          dispatch={dispatch}
        />
      );
    }
  }

  return (
    <div id="mainDisplay">
      <Header />
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
