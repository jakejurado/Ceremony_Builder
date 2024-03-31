import React from "react";
import { addSelectorSection } from "../functions/sections/selectorSec";
import { updateCardIndex } from "../functions/sections/updateSec";
import { removeSection } from "../functions/sections/removeSec";
import { fetchTitles } from "../functions/fetches/selectorBoxFuncs";
import { fetchCall } from '../functions/fetches/api';
import { addSectionToTemplates} from "../functions/sections/addSectionToTemplates";
import { fetchSectionFromDatabase} from "../functions/fetches/fetchSectionFromDatabase";
import { saveTemplateToDatabase } from "../functions/fetches/saveTemplateToDatabase";
import { determineTemplateTitle } from "../functions/template/determineTemplateTitle";
import { updateSectionOrder } from "../functions/mainPage/dragdropFuncs";
import {templateWed, templateElope } from '../server/files/database-script';


export function templatesReducer(state, action) {
  const { type, payload } = action;

  switch (type) {
    //   //adds a section to the current displayed template
    // case 'addSEC':{
    //   const { varname, index } = payload;
    //     //remove section selector
    //   setSelectorSec({ isVisible: false, position: undefined });
    //     //get section data
    //   fetchSectionFromDatabase(varname, index, setFetchedData, currUser);
    //   return state;
    // }

      //loads a section that was fetched from 'addSEC' case.
    case 'loadFetch':{
      const {varname, sec, index, templateTitle} = payload;
      return addSectionToTemplates(state, templateTitle, varname, index, sec);
    }

      //removes section from current template
    case "deleteSEC": {
      const {index, templateTitle} = payload;
      const { order } = state[templateTitle];
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
      const { templateTitle } = payload
      const { order, ...sections } = state[templateTitle];

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
      const {textContent, sectionName, cardIndex, templateTitle} = payload;
      const templatesCopy = JSON.parse(JSON.stringify(state));
      templatesCopy[templateTitle][sectionName].script[cardIndex] = textContent;
      return templatesCopy;
    }

      //changes section order by updating the order array within the template
    case "moveSEC": {
      const {templateTitle, currTemplate} = payload;
      const { order, ...sections } = currTemplate;
        //create the new order for the display state after drag and drop
      const newOrder = updateSectionOrder(order, payload);
        //copy state and insert newOrder into the template that has the new section
      const templatesCopy = JSON.parse(JSON.stringify(state));
      templatesCopy[templateTitle] = {order: newOrder, ...sections};
      return templatesCopy
    }

      //inserts the section selector in the display
    // case "selectSEC": {
    //     //update state to signify that a selector box should be inserted.
    //   const insertSelector = addSelectorSection(payload.index);
    //   setSelectorSec(insertSelector);
    //   return state
    // }

    //   //saves user templates to database
    // case "saveTemplateToDatabase": {
    //   saveTemplateToDatabase(currUser, metaData, setMetaData, state);
    //   return state
    // }

      //loads the templates of the user from the database
    case "loadUserTemplates" : {
      const {userTemplates} = payload;
      const newTemplates = Object.assign({}, state, userTemplates)
      return newTemplates;
    }

    //   //loads a different template than the current one
    // case "loadTEMPLATE": {
    //   setTemplateTitle(payload.key)
    //   return state
    // }

      //creates a new blank template
    case "addTEMPLATE":{
      const {newTitle} = payload;
      return {...state, [newTitle]: {order: []}}
    }

    case "renameTEMPLATE":{
      const {newState} = payload;
      return newState
    }


    case "deleteTEMPLATE": {
      const {deleteTitle} = payload
      const templates = {...state}
      const {[deleteTitle]: value, ...otherTemplates } = templates;
      delete templates[deleteTitle];
      return otherTemplates;
    }

      //when user logs or deletes accountout resets to starting page
    case 'reset':{
      return payload
    }

      //Anything else returns current state
    default: {
      // returns the current state
      return state;
    }
  }
}
