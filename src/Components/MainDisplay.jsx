import React, { useState, useEffect, useReducer } from "react";
import { templateWed, templateWed2 } from "../server/files/serverDB2";
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

  //informs react when the section selector has been activated.
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

  //holds Fetch Data
  const [holdFetch, setHoldFetch] = useState(false);

  //useReducer
  const [templated, dispatch] = useReducer(reducer, templateWed2);

  //On page load, populate display state and cache state
  useEffect(() => {
    setSectionCache(addContentsToCache(templates, sectionCache));
  }, []);

  useEffect(() => {
    let obj = { type: "initialLoad", payload: templates[templateTitle] };
    if (holdFetch) {
      obj = { type: "loadSEC", payload: holdFetch };
      console.log("session cache");
      const { order, ...sections } = holdFetch;
      const newTemplate = fillCacheWithNewSections(sectionCache, sections);
      setSectionCache(newTemplate);
    }
    dispatch(obj);
  }, [holdFetch]);

  function reducer(state, action) {
    const { order, ...sections } = state;
    const { type, payload } = action;

    switch (type) {
      case "addSEC": {
        console.log("addSEC");
        //update display
        const { varname, index } = payload;
        const res = addSecToDisplay(varname, index, order, sections);
        // setDisplay([...res.display]);

        //update Template if needed.
        const isDuplicate = res.dup;
        const notInTemplate = !sections.hasOwnProperty(varname);
        const notInCache = !sectionCache.hasOwnProperty(varname);

        let newTemplate = { ...sections };

        if (isDuplicate) {
          newTemplate = { ...res.template };
        } else if (notInTemplate && notInCache) {
          console.log("fetch");
          let result = fetchSection(
            varname,
            res.display,
            sections,
            setHoldFetch
          );
          console.log({ result });
        } else if (notInTemplate) {
          newTemplate[varname] = sectionCache[varname];
        }

        //remove section selector from page
        setSelectorSec({ isVisible: false, position: undefined });

        const newO = { ...newTemplate, order: res.display };
        console.log({ newO });
        return newO;
      }
      case "loadSEC": {
        return payload;
      }
      case "deleteSEC": {
        const newOrder = removeSection(payload.index, order);
        return { ...sections, order: newOrder };
      }
      case "updateSEC": {
        const newOrder = updateCardIndex(order, payload);
        return { order: newOrder, ...sections };
      }
      case "swapSEC": {
        //create the new order for the display state
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
      case "fetch":
        //the payload is the new fetched section added to the current template.
        return payload;
      case "initialLoad":
        //loads the current state
        return state;
      default:
        console.log("default");
        return templateWed2;
    }
  }

  //DRAG DROP FUNCTIONALITY
  function dragEnd(e) {
    dispatch({
      type: "swapSEC",
      payload: {
        sourceIndex: e.source.index,
        destIndex: e.destination.index,
      },
    });
  }

  //loads the sections from the state in display.  Build the dom
  let loadSections = [];
  const { order, ...rest } = templated;

  for (let i = 0; i < order.length; i++) {
    let [varTitle, pos] = order[i];

    //This occurs when the display is updated, but the template hasn't updated from the fetch yet.  skip that section until ready.
    if (!rest.hasOwnProperty(varTitle)) continue;

    const { title, description, script } = rest[varTitle];
    // console.log(title, varTitle);
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
