import React from 'react';
import { fetchCall } from '../fetches/api';

function saveTemplateToDatabase(currUser, metaData, setMetaData, state){
  for(const [theTitle, set] of metaData){
    const {number} = set;
    const userId = currUser;
    const userTemplate = JSON.stringify(state[theTitle]);
    const templateTitle = theTitle
    const templateId = number
    const body = { userId, templateTitle, templateId, userTemplate };
      //enter template into database and return templateId
    if(templateId){
      fetchCall.put('templates', body)
        .catch((error) => {
          console.log(templateId ? 'error in fetch for put' : 'error in fetch for add', error);
        });
        //update template in database
    } else {
      fetchCall.post('templates', body)
        .then((data) => {
          const {_id, title} = data;
          const newMetaData = new Map(metaData);
          newMetaData.set(title, {number: _id, title})
          setMetaData(new Map(newMetaData))
         })
        .catch((error) => {
          console.log(templateId ? 'error in fetch for put' : 'error in fetch for add', error);
      });
    }
  }

}


export {saveTemplateToDatabase}