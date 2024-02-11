import React, { SetStateAction } from 'react';
import { fetchCall } from './api';
import { MetaData, Templates, TemplatesWithContent } from '../../types/types';

async function saveTemplateToDatabase(currUser: number, metaData: MetaData, setMetaData: React.Dispatch<SetStateAction<MetaData>>, state: Templates){
  for(const [theTitle, set] of metaData){
    const {number} = set;
    const userId: number = currUser;
    const userTemplate: string = JSON.stringify(state[theTitle]);
    const templateTitle: string = theTitle
    const templateId: number = number
    const body = { userId, templateTitle, templateId, userTemplate };
      //enter template into database and return templateId
    try{
      if(templateId){
        const res = await fetchCall.put('templates', body)
          //update template in database
      } else {
        const data = await fetchCall.post('templates', body);
        const {_id, title} = await data;
        const newMetaData: MetaData = new Map(metaData);
        newMetaData.set(title, {number: _id, title})
        setMetaData(new Map(newMetaData))
      }
    } catch(err){
      console.log(err)
    }
  }
}


export {saveTemplateToDatabase}