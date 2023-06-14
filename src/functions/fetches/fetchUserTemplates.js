import React from 'react';
import { fetchCall } from './api';

async function fetchUserTemplates(userId, metaData, setMetaData, dispatch ){
  const data = await fetchCall.get('allTemplates', {userId})

  const metaDataCopy = new Map(metaData)
  const userTemplates = {};
  data.forEach(temp => {
    userTemplates[temp.title] = JSON.parse(temp.template);
    metaDataCopy.set(temp.title, {title: temp.title, number: temp._id} )
  })
  setMetaData(new Map(metaDataCopy))
  dispatch({type: 'loadUserTemplates', payload: {userTemplates, setTitle: null}})
}

export {fetchUserTemplates}