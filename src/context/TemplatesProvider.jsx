import React, { createContext, useReducer, useMemo, useEffect, useState } from 'react';
import {templateWed, templateElope } from '../server/files/database-script';
import { templatesReducer } from '../reducers/templatesReducer';
import { allCategoryTitles } from '../server/files/selectorTitles';
import { addContentsToCache } from '../functions/cache/cache';
import { createMetaDataFromStartingTemplates } from '../functions/metaData/createMetaDataFromStartingTemplates';
const allT = {wedding: templateWed, elope: templateElope }

export const TemplatesContext = createContext(null);

export const TemplatesProvider = ({ children }) => {
  const [templates, dispatch] = useReducer(templatesReducer, allT);
  const [templateTitle, setTemplateTitle] = useState("wedding");
  const [fetchedData, setFetchedData] = useState(null);
    //holds all titles, varnames, and category in an object for all sections
  const [selectorTitles, setSelectorTitles] = useState({...allCategoryTitles});
    //holds the names of the two getting married.
  const [names, setNames] = useState({
    person1: undefined,
    person2: undefined,
  });
    //meta data for the templates to help sync with database.
  const [metaData, setMetaData] = useState(new Map());


  if(fetchedData){
    dispatch({type: 'loadFetch', payload: fetchedData.payload})
    setFetchedData(null);
  }

    //initial load  
   useEffect(()=>{
        //add starting templates to cache
      addContentsToCache(templates)

        //add metadata from the starting templates.
      createMetaDataFromStartingTemplates(templates, metaData, setMetaData)
  }, [])


  const providerValue = useMemo(() => (
    { templates, 
      dispatch,
      templateTitle,
      setTemplateTitle,
      fetchedData,
      setFetchedData,
      selectorTitles,
      setSelectorTitles,
      names,
      setNames,
      metaData,
      setMetaData,
      currTemplate : templates[templateTitle],
    }
    ), [templates, dispatch, templateTitle, fetchedData, selectorTitles, names, metaData]);

  return (
    <TemplatesContext.Provider value={providerValue} >
      {children}
    </TemplatesContext.Provider>
  );
};
