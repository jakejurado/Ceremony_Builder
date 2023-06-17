import React, { SetStateAction } from 'react';
import { fetchCall } from './api';
import {MetaData, Templates} from "../../types/types";
import { FetchUserTemplates, LoadUserTemplates} from "../../types/dispatch"



async function fetchUserTemplates(userId: number, metaData: MetaData, setMetaData: React.Dispatch<SetStateAction<MetaData>>, dispatch: React.Dispatch<SetStateAction<LoadUserTemplates>> ){
  const data: FetchUserTemplates = await fetchCall.get('allTemplates', {userId})

  const metaDataCopy: MetaData = new Map(metaData)
  const userTemplates: Templates = {};
  data.forEach(temp => {
    userTemplates[temp.title] = JSON.parse(temp.template);
    metaDataCopy.set(temp.title, {title: temp.title, number: temp._id} )
  })
  setMetaData(new Map(metaDataCopy))
  dispatch({type: 'loadUserTemplates', payload: {userTemplates, setTitle: null}})
}

export {fetchUserTemplates}