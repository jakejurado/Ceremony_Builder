import React, {
  useState,
  useEffect,
  useReducer,
  createContext,
  useRef,
} from "react";
//React Components
import MainDisplay from "./MainDisplay";
import Sidebar from "./Sidebar";
import SidebarButton from "./SidebarButton";
import AccountBox from "./AccountBox";
import Popup from "../Components/Popup";
import PopupPrint from "./PopupPrint";
import { toggleSidebar } from "../functions/mainPage/sidebarFuncs";
import Header from "./Header";
import ErrorBoundary from "./ErrorBoundary";
import PopupAccount from "./PopupAccount";

//Temparary Data
import { templateWed, templateWed2 } from "../server/files/serverDB2";
import templateElope from "../server/files/serverDB";

//helperFunctions
import { updateSectionOrder } from "../functions/mainPage/dragdropFuncs";
import { addContentsToCache } from "../functions/cache/cache";
import { addSecToTemplate } from "../functions/sections/addSec";
import { addSelectorSection } from "../functions/sections/selectorSec";
import { updateCardIndex } from "../functions/sections/updateSec";
import { removeSection } from "../functions/sections/removeSec";
import { fetchTitles } from "../functions/sections/selectorBoxFuncs";
import { fillCacheWithNewSections } from "../functions/cache/sectionCacheFuncs";
import { updateTemplate } from "../functions/sections/updateTemplate";
import { saveDomToTemplates } from "../functions/sections/resetCard";
// import { addDomToTemplate } from "../functions/sections/resetCard";

//Typescript
import {
  Cache,
  Templates,
  Template,
  TemplateSansOrder,
  personState,
  selectorSec,
} from "../types/types";

//Style import
import "../styles/main.scss";

//global context
export const GlobalContext = createContext(null);

function App() {
  //stores the templates
  const [templates, setTemplates] = useState({
    wedding: templateWed2,
    elope: templateElope,
  });

  const domRef = useRef(null);

  //determines which template to be displayed.
  const [templateTitle, setTemplateTitle] = useState("wedding");

  //keeps track of sidebar state
  const [sidebarOpen, setSidebarOpen] = useState(false);

  //holds the names of the two getting married.
  const [names, setNames] = useState({
    person1: undefined,
    person2: undefined,
  });

  //holds data that needs to update state asynchronously
  const [updatedData, setUpdatedData] = useState(false);

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

  //informs react when the section selector Box has been activated.
  const [selectorSec, setSelectorSec] = useState({
    isVisible: false,
    position: undefined,
  });

  //cache for all sections from templates and ones added by user during session
  const [sectionCache, setSectionCache] = useState(
    addContentsToCache(templates, {})
  );

  //holds the current template, which contains the sections and the order of the sections, used to fill the page.
  const [template, dispatch] = useReducer(reducer, templates[templateTitle]);

  //The main logic and state for the sections
  function reducer(state, action) {
    const { order, ...sections } = state;
    const { type, payload } = action;

    switch (type) {
      case "addSEC": {
        //update order
        const { varname, index } = payload;
        //create a new updated template with the added section
        let newTemplate = addSecToTemplate(
          varname,
          index,
          order,
          state,
          sectionCache,
          setUpdatedData
        );

        //remove section selector from page
        setSelectorSec({ isVisible: false, position: undefined });

        //update state
        return { ...newTemplate };
      }
      case "loadSEC": {
        //this case is only ran after a section is fetched from the backend.
        //update the section cache
        const { order, ...sections } = payload;
        const newCache: Cache = fillCacheWithNewSections(
          sectionCache,
          sections
        );
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
        console.log("initialLoad");
        //loads the current state
        const newTemp = templates[templateTitle];
        return newTemp;
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

  //NEW POPUP CONTROLLS
  const [popup, setPopup] = useState('signup')


  //Controls the state of popup for printing, signin, and signup
  const [popupState, popDispatch] = useReducer(popReducer, {
    // display: <PopupPrint />,
    display: false,
  });

  function popReducer(state, action) {
    switch (action.type) {
      case "print":
        const newTemplates = saveDomToTemplates(
          template,
          domRef,
          names,
          templates,
          templateTitle
        );
        setTemplates(newTemplates);
        dispatch({ type: "initialLoad" });
        return { display: <PopupPrint /> };
      case "account":
        return { display: <AccountBox /> };
      case "signin":
        return { display: "signin" };
      case "signup":
        return { display: "signup" };
      case "initialLoad":
        return { display: false };
      case "close":
        return { display: false };
      default:
        console.log("error case");
    }
  }

  //updates state when new data is fetched or retrieved asynchronously
  useEffect(() => {
    dispatch(updatedData);
  }, [updatedData]);

  //watches for sideBarOpen state change to open and close the sidebar
  useEffect(() => {
    //adds the ability to close the sidebar.  The timeout allows time for transition to occur.
    if (sidebarOpen) {
      setTimeout(
        () => {
          document.getElementById("cover").addEventListener(
            "mousedown",
            () => {
              setSidebarOpen(false);
            },
            {
              once: true,
            }
          );
        },
        2500,
        { once: true }
      );
    }

    toggleSidebar(sidebarOpen);
  }, [sidebarOpen]);

  useEffect(() => {
    dispatch({ type: "loadTEMPLATE", payload: templates[templateTitle] });
  }, [templateTitle]);

  return (
    <ErrorBoundary>
      <div className="App">
        <GlobalContext.Provider
          value={{
            template,
            dispatch,
            selectorSec,
            selectorTitles,
            names,
            setNames,
            popDispatch,
            setTemplateTitle,
            templates,
            popupState,
            popup,
            setPopup,
            domRef,
          }}
        >
          <Header />
          {popupState.display && <Popup />}
          {popup && <PopupAccount curr={popup}/>}

          <SidebarButton
            toggleSidebarState={() => setSidebarOpen(!sidebarOpen)}
          />
          <Sidebar />
          <MainDisplay />
        </GlobalContext.Provider>
      </div>
    </ErrorBoundary>
  );
}

export default App;
