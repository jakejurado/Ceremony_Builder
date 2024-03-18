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


export function templatesReducer(state, action) {
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
          .catch((err) => {console.error(err)})
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
