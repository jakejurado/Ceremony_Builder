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
import AccountBox from "./AccountBox";
import Popup from "../Components/Popup";
import PopupPrint from "./PopupPrint";
import Header from "./Header";
import ErrorBoundary from "./ErrorBoundary";
import PopupAccount from "./PopupAccount";


//Temparary Data
import { templateWed, templateWed2, templateSaved } from "../server/files/serverDB2";
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
import {createSidebarToggle} from '../functions/mainPage/sidebarClass';

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

 

  //cache for all sections from templates and ones added by user during session
  const [sectionCache, setSectionCache] = useState(
    addContentsToCache(templates, {})
  );

  
  //determines which template to be displayed.
  const [templateTitle, setTemplateTitle] = useState("wedding");

  //stores the current users ID
  const [currUser, setCurrUser] = useState(null);

  async function fetchUserTemplates(url){
    const response = await fetch(url);
    const [data] = await response.json();
    setTemplates({...templates, [data.title] : JSON.parse(data.template)})
    // console.log({...templates, [data.title] : JSON.parse(data.template)})
  }

  useEffect(() => {
    const url = `templates/all?userId=${currUser}`;
    fetchUserTemplates(url);
  }, [currUser])

  
  

  

  //holds the names of the two getting married.
  const [names, setNames] = useState({
  person1: undefined,
  person2: undefined,
});

//holds data that needs to update state asynchronously
const [fetchedData, setFetchedData] = useState(null);


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

  //ref the content of the etite
  const domRef = useRef();

  //informs react when the section selector Box has been activated.
  const [selectorSec, setSelectorSec] = useState({
    isVisible: false,
    position: undefined,
  });

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
        console.log('addSec', varname, index)
        //create a new updated template with the added section
        let newTemplate = addSecToTemplate(
          varname,
          index,
          order,
          state,
          sectionCache,
          setFetchedData,
        );

        //remove section selector from page
        setSelectorSec({ isVisible: false, position: undefined });

        //update state
        return Object.keys(newTemplate) ? newTemplate : state ;
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
      case 'loadFetch':{
        return payload
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
        console.log('selectSEC');
        console.log({action})
        const insertSelector = addSelectorSection(payload.index);
        console.log(insertSelector)
        setSelectorSec(insertSelector);
        console.log('in selectSEC', sections, order)
        return { ...sections, order };
      }
      case "initialLoad": {
        //loads the current state
        return templates[templateTitle];
      }
      case "loadTEMPLATE": {
        const {key, value} = payload
        setTemplateTitle(key)
        return templates[key];
      }
      case "addTEMPLATE":{
        const {key, value} = payload
        setTemplates({...templates, [key]: value});
        setTemplateTitle(key);
        return value
        // dispatch({type: 'leadTEMPLATE', payload: key})
      }
      default: {
        // returns the current state
        return state;
      }
    }
  }

  if(fetchedData){
    dispatch({type: 'loadFetch', payload: fetchedData.payload})
    setFetchedData(null);
  }

  //NEW POPUP CONTROLLS
  // const [popup, setPopup] = useState('signup')
  const [popup, setPopup] = useState(null)


  //Controls the state of popup for printing, signin, and signup
  const [popupState, popDispatch] = useReducer(popReducer, {
    // display: <PopupPrint />,
    // display: <AccountBox />,
    display: false,
  });

  const [print, setPrint] = useState(false);
  
  if(print){
    const newTemplates = saveDomToTemplates( template, domRef, names, templates, templateTitle);
    setTemplates(newTemplates);
    setPrint(false);
  }

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
      case "save":{
        const newTemplates = saveDomToTemplates(template, domRef, names, templates, templateTitle);
        setTemplates(newTemplates);
        console.log({newTemplates})
        
        return {display: false}

        
      }
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

  //initial load
  const theSidebar = new createSidebarToggle();
  useEffect(()=>{
    theSidebar.toggle();  


    fetch('/user/access')
      .then((data) => data.json())
      .then((data) => {
        console.log({data})
        if(data.authorized){
          setCurrUser(data.userId)
        }
      }).catch((err) => {console.log('error in the building', err)})
    
  }, [])


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
            templateTitle,
            setTemplateTitle,
            templates,
            setTemplates,
            popupState,
            popup,
            setPopup,
            theSidebar,
            domRef,
          }}
        >
          <Header />
          {popupState.display && <Popup />}
          {popup && <PopupAccount curr={popup}/>}

          <Sidebar />
          <MainDisplay />
        </GlobalContext.Provider>
      </div>
    </ErrorBoundary>
  );
}

export default App;
