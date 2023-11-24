import React from 'react';
import { fetchCall } from './api';
import { Section } from '../../types/types';
import { LoadFetch, FetchSectionData } from '../../types/dispatch';


  //fetches section from the database
async function fetchSectionFromDatabase(varname: string, index: number, setState: React.Dispatch<React.SetStateAction<{type: string, payload: LoadFetch}>>, userId: number){
  const data = await fetchCall.get('grabSec', {varname, userId});
  const sec = buildSectionFromData(data);
  setState({type: 'loadFetch', payload : {varname, sec, index}})
}


  //builds section from the fetched data
function buildSectionFromData(data: FetchSectionData): Section{
  const section : Section= {
      description: data[0].description,
      start_pos: 0,
      title: data[0].title,
      script: data.map((obj) => obj.script)
  }
  return section
}


export {fetchSectionFromDatabase}