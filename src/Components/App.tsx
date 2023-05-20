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
import Popup from './Popup';

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
  TemplateState
} from "../types/types";

//Style import
import "../styles/main.scss";

//global context
export const GlobalContext = createContext(null);

//Here's the full course: https://www.youtube.com/playlist?list=PL1w1q3fL4pmj9k1FrJ3Pe91EPub2_h4jF
function App() {

const [metaData, setMetaData] = useState<Map<string, { title: string, number: number }> | null>(
  new Map()
);


  //templates to start
  const allT = {wedding: templateWed2, elope: templateElope }

  

  //cache for all sections from templates and ones added by user during session
  const [sectionCache, setSectionCache] = useState(null);

  //stores the current users ID
  const [currUser, setCurrUser] = useState(null);

  async function fetchUserTemplates(url){
    console.log('fetching');
    const response = await fetch(url);
    const data = await response.json();

    const metaDataCopy = new Map(metaData)
    const userTemplates = {};
    data.forEach(temp => {
      userTemplates[temp.title] = JSON.parse(temp.template);
      metaDataCopy.set(temp.title, {title: temp.title, number: temp._id} )
    })
    setMetaData(new Map(metaDataCopy))
    dispatch({type: 'loadUserTemplates', payload: {userTemplates, setTitle: null}})
  }

  useEffect(() => {
    if(currUser){
      const url = `templates/all?userId=${currUser}`;
      fetchUserTemplates(url);
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

  //determines which template to be displayed.
  const [templateTitle, setTemplateTitle] = useState("wedding");

  const [myOrder, setMyOrder] = useState();

  //holds the current template, which contains the sections and the order of the sections, used to fill the page.
  const [templates, dispatch] = useReducer(reducer, allT);

  //The main logic and state for the sections
  function reducer(state, action) {
    const { order, ...sections } = state[templateTitle];
    const { type, payload } = action;

    switch (type) {
      case "addSEC": {
        console.log('addSEC')
        //adds a section to the current displayed template

        const { varname, index } = payload;

        //create a new updated template with the added section
        let updatedTemplate = addSecToTemplate(
          varname,
          index,
          state[templateTitle],
          sectionCache,
          setFetchedData,
        );

        //remove section selector from page
        setSelectorSec({ isVisible: false, position: undefined });

        //copy state and insert into it the template that has the new section
          const templatesCopy = state;
          templatesCopy[templateTitle] = updatedTemplate;

        //update state.  If fetch occured then returns current state.
        return Object.keys(updatedTemplate) ? templatesCopy : state ;
      }
      //
      case "initialLoad": {
        return state;
      }

      case 'loadFetch':{ 
        console.log('loadFetch')
        //after fetch is complete, we insert section into the template and order
        const {varname, sec, newOrder} = payload;
        console.log({payload})

        //update cache
        const cacheCopy = {...sectionCache}
        cacheCopy[varname] = sec;
        setSectionCache(cacheCopy);

        //update state
        const templatesCopy = JSON.parse(JSON.stringify(state));
        templatesCopy[templateTitle][varname] = sec
        if(newOrder) {
          console.log('we get here')
          templatesCopy[templateTitle]['order'] = newOrder
        }

        console.log(templatesCopy)
        return templatesCopy
      }

      
      case "deleteSEC": {
        //removes section from current template
        const newOrder = removeSection(payload.index, order);

        //copy state and insert into it the template that has the new section
        const templatesCopy = JSON.parse(JSON.stringify(state));
        templatesCopy[templateTitle].order = newOrder;
        
        //remove deleted section from template (not just from the order)

        return templatesCopy;
      }

      case "updateSEC": {
        //updates with 'order' which card in the section is being displayed
        const newOrder = updateCardIndex(order, payload);

        //copy state and insert into it the template that has the new section
        const templatesCopy = JSON.parse(JSON.stringify(state));
        templatesCopy[templateTitle] = {order: newOrder, ...sections};

        return templatesCopy
      }

      case "updateWords":{
        //updates the template with the user inputs
        const {textContent, sectionName, cardIndex} = payload;
        const templatesCopy = JSON.parse(JSON.stringify(state));
        templatesCopy[templateTitle][sectionName].script[cardIndex] = textContent;
        return templatesCopy;
      }

      case "moveSEC": {
        //create the new order for the display state after drag and drop
        const newOrder = updateSectionOrder(order, payload);

        //copy state and insert newOrder into the template that has the new section
        const templatesCopy = JSON.parse(JSON.stringify(state));
        templatesCopy[templateTitle] = {order: newOrder, ...sections};
  
        return templatesCopy
      }

      
      case "selectSEC": {
        //inserts the section selector in the display

        //fetch titles if not present in state.
        if (Object.keys(selectorTitles).length === 0)
          fetchTitles(setSelectorTitles);

        //update state to signify that a selector box should be inserted.
        const insertSelector = addSelectorSection(payload.index);
        setSelectorSec(insertSelector);
        return state
      }
    
      case "saveTemplate": {
        console.log('saveTemplate')
        const {template, domRef} = payload;
        const newTemplates = saveDomToTemplates( template, domRef, names, state, templateTitle);
        return newTemplates
      }

      case "saveTemplateToDatabase": {
        console.log('saveTemplateToDatabase')
        //iterate through metaData and save to database
        metaData.forEach((set) => {
          console.log({set})
          const url = 'templates/userTemplate'
          const userId = currUser
          const templateTitle = set.title
          const userTemplate = JSON.stringify(state[set.title])
          const templateId = set.number
          const options = {
            method: "POST",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({userId, templateTitle, userTemplate, templateId})
          };

          if(!templateId){
            console.log('set.number', {templateId})
            // console.log(options.body)
            // //fetch put update
            // fetch(url, options )
            //   .then((res) =>{
            //     console.log('res', res)
            //     console.log('res.body', res.body)
            //   })
            //   .catch((error) =>{
            //     console.log('error in fetch for add', error)
            //   })
          } else{
            options.method = "PUT"
            console.log('void', 'put')
            fetch(url, options )
              .then((res) =>{
                console.log({res})
              }).catch((error) =>{
                console.log('error in fetch for put', error)
              })
            console.log('entered else with ', templateTitle, templateId)
          }
        });

        return state
      }
      case "loadUserTemplates" : {
        console.log('loadUserTemplates')
        const {userTemplates} = payload;
        const newTemplates = Object.assign({}, state, userTemplates)
        return newTemplates;
      }
      case "loadTEMPLATE": {
        console.log('loadTEMPLATE')
        const {key, value} = payload
        setTemplateTitle(key)
        return state
      }
      case "addTEMPLATE":{
        console.log('addTEMPLATE')
        
        const {key, value} = payload
        console.log({key, value})
        const templatesCopy = state;
        templatesCopy[key] = value;
        setTemplateTitle(key);
        return templatesCopy
      }
      case "renameTEMPLATE":{
        console.log('renameTEMPLATE')
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
        setMetaData(new Map(metaDataCopy))


        //update the templateTitle if that was the template name changed
        if(currTemplate) setTemplateTitle(newName);

        return templatesCopy
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
  const [thePopup, popupDispatch] = useReducer(popupReducer, {box: null, subAct: null});

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
      default:
        return {box: null, subAct: null}
    }
  }


  //initial load
  const theSidebar = new createSidebarToggle();
  useEffect(()=>{
    console.log('enter initial useEffect')
    //close the sidebar
    theSidebar.toggle();  

    //add starting templates to cache
    setSectionCache(addContentsToCache(templates, {}));

    //add metadata to starting templates.
    const dataCopy = new Map(metaData);
    Object.keys(templates).forEach((el) => {
      dataCopy.set(el, {title: el, number: null});
      setMetaData(new Map(dataCopy));
    })

    //check if the user has a cookie
    fetch('/user/access')
      .then((data) => data.json())
      .then((data) => {
        console.log('user', {data})
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
            dispatch,
            selectorSec,
            selectorTitles,
            names,
            setNames,
            templateTitle,
            setTemplateTitle,
            templates,
            currTemplate : templates[templateTitle],
            theSidebar,
            domRef,
            popupDispatch,
            box: thePopup.box,
            subAct: thePopup.subAct,
            setCurrUser
          }}
        >
          <Header />
          {thePopup.box &&  <Popup box={thePopup.box} subAct={thePopup.subAct}/> }

          <Sidebar />
          <MainDisplay />
        </GlobalContext.Provider>
      </div>
    </ErrorBoundary>
  );
}

export default App;
