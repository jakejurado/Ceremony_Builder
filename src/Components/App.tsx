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
import Header from "./Header";
import ErrorBoundary from "./ErrorBoundary";
import MainPopup from './MainPopup';


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
  const allT = {wedding: templateWed2, elope: templateElope }
  const [templates, setTemplates] = useState(allT);

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
      case "saveTEMPLATE": {
        //copies dom into templates
        const newTemplates = saveDomToTemplates( templates[templateTitle], domRef, names, templates, templateTitle);
        setTemplates(newTemplates)
        return newTemplates[templateTitle]
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
      }
      case "renameTEMPLATE":{
        const {oldName, newName} = payload;

        const newTemplates = {};
        Object.entries(templates).forEach((entry) => {
          console.log({entry})
          if(entry[0] === oldName) newTemplates[newName] = entry[1];
          else newTemplates[entry[0]] = entry[1];
        })
        console.log(newTemplates)
        // setTemplates({newTemplates})
        // setTemplates({...newTemplates})
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


  //NEW NEW Popup Controls
  const [thePopup, popupDispatch] = useReducer(popupReducer, {box: 'myTemplates', subAct: 'login'});

  function popupReducer(state, action){
    const {type, subAct} = action
    
    switch (action.type){
      case 'myAccount':
        return {box: 'myAccount', subAct}
        break;
      case 'myAuth':
        return {box: 'myAuth', subAct}
        break;
      case 'myTemplates':
        return {box: 'myTemplates', subAct}
        break;
      case 'myPrint':
        return {box: 'myPrint', subAct}
        break;
      case 'mySave':
        const newTemplates = saveDomToTemplates( template, domRef, names, templates, templateTitle);
        setTemplates(newTemplates)
        return {box: null, subAct: null}
      default:
        return {box: null, subAct: null}
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
            templateTitle,
            setTemplateTitle,
            templates,
            setTemplates,
            theSidebar,
            domRef,
            popupDispatch,
            box: thePopup.box,
            subAct: thePopup.subAct
          }}
        >
          <Header />
          {thePopup.box &&  <MainPopup box={thePopup.box} subAct={thePopup.subAct}/> }

          <Sidebar />
          <MainDisplay />
        </GlobalContext.Provider>
      </div>
    </ErrorBoundary>
  );
}

export default App;
