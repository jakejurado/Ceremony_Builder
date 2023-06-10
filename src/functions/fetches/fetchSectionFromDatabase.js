import React from 'react';
import { fetchCall } from './api';

  //fetches section from the database
async function fetchSectionFromDatabase(varname, index, setState){
  const data = await fetchCall.get('grabSec', {varname});
  const sec = await buildSectionFromData(data, varname);
  setState({type: 'loadFetch', payload : {varname, sec, index}})
}

  //builds section from the fetched data
function buildSectionFromData(data){
  const section = {
      description: data[0].description,
      start_pos: 0,
      title: data[0].title,
      script: data.map((obj) => obj.script)
  }
  return section
}


export {fetchSectionFromDatabase}