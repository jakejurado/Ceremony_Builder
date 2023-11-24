import React, {
  useState,
  useEffect,
  useReducer,
  createContext,
  useRef,
} from "react";

//React Components
import AppMainDisplay from "./AppMainDisplay";
import Sidebar from "./Sidebar";
import ErrorBoundary from "./ErrorBoundary";
import Popup from './Popup';

//Starting Data
import {templateWed, templateElope } from '../server/files/database-script.js';

//helperFunctions
import { updateSectionOrder } from "../functions/mainPage/dragdropFuncs";
import { addContentsToCache } from "../functions/cache/cache";
import { addSelectorSection } from "../functions/sections/selectorSec";
import { updateCardIndex } from "../functions/sections/updateSec";
import { removeSection } from "../functions/sections/removeSec";
import { fetchTitles } from "../functions/fetches/selectorBoxFuncs";
import {createSidebarToggle} from '../functions/mainPage/sidebarClass';
import {fetchCall} from '../functions/fetches/api';
import { addSectionToTemplates} from "../functions/sections/addSectionToTemplates";
import { fetchSectionFromDatabase} from "../functions/fetches/fetchSectionFromDatabase";
import { saveTemplateToDatabase } from "../functions/fetches/saveTemplateToDatabase";
import { determineTemplateTitle } from "../functions/template/determineTemplateTitle";
import { fetchUserTemplates } from "../functions/fetches/fetchUserTemplates";
import { checkCookieForAccess } from "../functions/fetches/checkUserAccess"
import { createMetaDataFromStartingTemplates } from "../functions/metaData/createMetaDataFromStartingTemplates"

//Typescript
import {
  MetaData,
} from "../types/types_copy";

  //Style import
import "../styles/main.scss";

  //global context
export const GlobalContext = createContext(null);


function App() {
    //keep track of screen size
  const maxMobileSize = 800;
  const [isMobile, setIsMobile] = useState(window.innerWidth < maxMobileSize);
  
    //set up the sidebar functionality.
  const theSidebar = new createSidebarToggle('sideBar', 'whiteCover', isMobile);
  
    //meta data for the templates to help sync with database.
  const [metaData, setMetaData] = 
    useState<MetaData>(
    new Map()
  );

    //templates to start the program
  const allT = {wedding: templateWed, elope: templateElope }
    //stores the current users ID
  const [currUser, setCurrUser] = useState(null);

    //fetch templates after user signs in.
  useEffect(() => {
    if(currUser){
      fetchUserTemplates(currUser, metaData, setMetaData, dispatch);
    }
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
      "Charge": "charge",
      "Transition to Vows": "vows_symbolism",
      "Vows": "vow_content",
      "Rings Content": "ring_content",
      "Ring Exchange": "ring_exchange",
      "Pronouncement": "pronouncement",
      "The Kiss": "kiss",
      "Introduction": "introduction",
    },
    "Readings": { 
      "Reading: Traditional": "reading_traditional",
      "Reading: Humor": "reading_humor",
      "Reading: Entertainment": "reading_entertainment",
      "Reading: Scripture": "reading_scripture",
    },
    "Prayer": { 
      "Prayer: Opening": "prayer_opening",
      "Prayer: Wedding": "prayer_middle",
      "Prayer: Benediction": "prayer_benediction", 
    },
    "Unity": { 
      "Unity: Candle": "unity_candle",
      "Unity: Sand": "unity_sand",
      "Unity: Stone": "unity_stone",
      "Unity: Wine Box:": "unity_winebox",
      "Unity: Rose": "unity_rose",
      "Unity: Tea Ceremony": "unity_tea",
      "Unity: Hand Fasting": "unity_handfasting",
      "Unity: Mead": "unity_mead",
      "Unity: Cocktail": "unity_cocktail",
      "Unity Canvas": "unity_canvas",
      "Unity Glass": "unity_glass",
      "Unity: Playdough": "unity_playdough",
      "Unity: Beer": "unity_beer",
      "Unity: Plant": "unity_plant",
    },
    "Religious": { 
      "Arras": "arras",
      "Lasso": "lasso",
      "Veil": "veil",
      "Veil & Cord": "veil_cord",
      "God Knot": "god_knot",
      "Breaking Glass": "breaking_glass",
    },
    "Including Others": { 
      "Last Kiss": "last_kiss",
      "Flowers For Mothers": "flowers_mothers",
      "Gift To Parents": "gift_parents",
      "Song": "song",
      "Ring Warmer": "ring_warmer",
      "Vows of Suppoert": "vows_of_support"
    },
    "Other Options": { 
      "Blessing": "blessing",
      "Deceased": "deceased",
      "Turn Off Devices": "turnoff",
      "License Singing": "license_sign",
      "Custom": "custom"
    },
  });
  // const [selectorTitles, setSelectorTitles] = useState({});

    //ref the content of the etite
  const domRef = useRef();
    //ref 
  const sidebarRef = useRef();
  const coverRef = useRef();

    //informs react when the section selector Box has been activated.
  const [selectorSec, setSelectorSec] = useState({
    isVisible: false,
    position: undefined,
  });

    //determines which template to be displayed.
  const [templateTitle, setTemplateTitle] = useState("wedding");

    //holds the current template, which contains the sections and the order of the sections, used to fill the page.
  const [templates, dispatch] = useReducer(reducer, allT);

    //The main logic and state for the sections
  function reducer(state, action) {
    const { order, ...sections } = state[templateTitle];
    const { type, payload } = action;

    switch (type) {
        //adds a section to the current displayed template
      case 'addSEC':{
        const { varname, index } = payload;
          //remove section selector
        setSelectorSec({ isVisible: false, position: undefined });
          //get section data
        fetchSectionFromDatabase(varname, index, setFetchedData, currUser);
        return state;
      }

        //loads a section that was fetched from 'addSEC' case.
      case 'loadFetch':{
        const {varname, sec, index} = payload;
        return addSectionToTemplates(state, templateTitle, varname, index, sec);
      }

        //removes section from current template
      case "deleteSEC": {
        const {index} = payload;
        const title = order[index][0]
          //remove section from order
        const newOrder = removeSection(payload.index, order);
          //copy state and insert newOrder into the template that has the new section
        const templatesCopy = JSON.parse(JSON.stringify(state));
        templatesCopy[templateTitle].order = newOrder;
          //remove deleted section from template
        delete templatesCopy[templateTitle][title]  
        return templatesCopy;
      }
        //changes which card is displayed in that section
      case "updateSEC": {
          //updates with 'order' which card in the section is being displayed
        const newOrder = updateCardIndex(order, payload);
          //copy state and insert into it the template that has the new section
        const templatesCopy = JSON.parse(JSON.stringify(state));
        templatesCopy[templateTitle] = {order: newOrder, ...sections};
        return templatesCopy
      }

        //updates state with the user inputed content
      case "updateWords":{
          //updates the template with the user inputs
        const {textContent, sectionName, cardIndex} = payload;
        const templatesCopy = JSON.parse(JSON.stringify(state));
        templatesCopy[templateTitle][sectionName].script[cardIndex] = textContent;
        return templatesCopy;
      }

        //changes section order by updating the order array within the template
      case "moveSEC": {
          //create the new order for the display state after drag and drop
        const newOrder = updateSectionOrder(order, payload);
          //copy state and insert newOrder into the template that has the new section
        const templatesCopy = JSON.parse(JSON.stringify(state));
        templatesCopy[templateTitle] = {order: newOrder, ...sections};
        return templatesCopy
      }

        //inserts the section selector in the display
      case "selectSEC": {
        //fetch titles if not present in state.
        if (Object.keys(selectorTitles).length === 0) fetchTitles(setSelectorTitles);
          //update state to signify that a selector box should be inserted.
        const insertSelector = addSelectorSection(payload.index);
        setSelectorSec(insertSelector);
        return state
      }

        //saves user templates to database
      case "saveTemplateToDatabase": {
        saveTemplateToDatabase(currUser, metaData, setMetaData, state);
        return state
      }

        //loads the templates of the user from the database
      case "loadUserTemplates" : {
        const {userTemplates} = payload;
        const newTemplates = Object.assign({}, state, userTemplates)
        return newTemplates;
      }

        //loads a different template than the current one
      case "loadTEMPLATE": {
        setTemplateTitle(payload.key)
        return state
      }

        //creates a new blank template
      case "addTEMPLATE":{
          //deep copy the state
        const templatesCopy = {...state};
          //determine templates title
        const key = determineTemplateTitle(state)
          //build the bones of a template
        templatesCopy[key] = {order: []};
          //update the curent template title
        setTemplateTitle(key);
          //update metaData
        const metaDataCopy = new Map(metaData);
        metaDataCopy.set(key, {number: null, title: key})
        setMetaData(metaDataCopy);
        return templatesCopy
      }

        //renames the template
      case "renameTEMPLATE":{
        const {oldName, newName, currTemplate} = payload;
          //copy state
        const templatesCopy = JSON.parse(JSON.stringify(state));
          //update the state with the new name for the template.
        templatesCopy[newName] = templatesCopy[oldName];
          //delete oldName from template
        delete templatesCopy[oldName];
          //update metaData
        const metaDataCopy = new Map(metaData);
        const dataCopy = metaDataCopy.get(oldName);
        metaDataCopy.set(newName, dataCopy);
        metaDataCopy.delete(oldName)
        setMetaData(new Map(metaDataCopy))
          //update the templateTitle if that was the template name changed
        if(currTemplate) setTemplateTitle(newName);
          //return updated templates
        return templatesCopy
      }

      case "deleteTEMPLATE": {
        const {currTitle} = payload
          //delete from database
        const templateId = metaData.get(currTitle).number
        if(templateId){
          fetchCall.delete('templates', {templateId, userId: currUser})
            .catch((err) => {console.log(err)})
        } 
          //remove from metaData
        const metaDataCopy = new Map(metaData);
        metaDataCopy.delete(currTitle)
        setMetaData(metaDataCopy);
          //remove from local templates
        const templatesCopy = state;
        delete templatesCopy[currTitle];
          //change templateTitle if it is current.
        if(templateTitle === currTitle){
          setTemplateTitle(Object.keys(state)[0])
        }

        return templatesCopy;
      }

        //when user logs or deletes accountout resets to starting page
      case 'reset':{
        fetchCall.get('signout')
        setTemplateTitle('wedding');
        return allT
      }

        //Anything else returns current state
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

  // Popup Controls
  const [thePopup, popupDispatch] = useReducer(popupReducer, {box: null, subAct: null});

  function popupReducer(state, action){
    const {subAct, type} = action
    
    switch (type){
      case 'myAccount':
        return {box: 'myAccount', subAct}
      case 'myAuth':
        return {box: 'myAuth', subAct}
      case 'myTemplates':
        return {box: 'myTemplates', subAct}
      case 'myPrint':
        return {box: 'myPrint', subAct}
      default:
        return {box: null, subAct: null}
    }
  }

    //initial load  
  useEffect(()=>{
      //add starting templates to cache
    addContentsToCache(templates)

      //add metadata from the starting templates.
    createMetaDataFromStartingTemplates(templates, metaData, setMetaData)

      //check if the user has a cookie
    checkCookieForAccess(setCurrUser);

      //close the sidebar
    setTimeout(() => {
      theSidebar.deactivate()
    }, 1000);

    //grab the screen size
    if(window.innerWidth < maxMobileSize){
      setIsMobile(true);
    }
  }, [])

  return (
    <ErrorBoundary>
      <div className="AppContainer">
        <GlobalContext.Provider
          value={{
            dispatch,
            selectorSec,
            selectorTitles,
            names,
            setNames,
            isMobile,
            templateTitle,
            setTemplateTitle,
            templates,
            currTemplate : templates[templateTitle],
            theSidebar,
            domRef,
            sidebarRef,
            coverRef,
            popupDispatch,
            box: thePopup.box,
            subAct: thePopup.subAct,
            currUser,
            setCurrUser,
            metaData,
            setMetaData
          }}
        >
          <div ref={coverRef} id='whiteCover'></div>
          {thePopup.box &&  <Popup box={thePopup.box} subAct={thePopup.subAct}/> }
          <Sidebar />
          <AppMainDisplay />
        </GlobalContext.Provider>
      </div>
    </ErrorBoundary>
  );
}

export default App;
