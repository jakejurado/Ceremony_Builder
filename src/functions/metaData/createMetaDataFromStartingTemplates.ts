//   //adds the meta data from the starting template to metaData state
// function createMetaDataFromStartingTemplates(templates, metaData, setMetaData){
//   const dataCopy = new Map(metaData);
//     Object.keys(templates).forEach((el) => {
//       dataCopy.set(el, {title: el, number: null});
//       setMetaData(new Map(dataCopy));
//     })
//   return dataCopy
// }


// export { createMetaDataFromStartingTemplates }

import {Templates, MetaDataValue, MetaData} from '../../types/types_copy'
import React, { SetStateAction, Dispatch } from "react";


//adds the meta data from the starting template to metaData state
const createMetaDataFromStartingTemplates = (
  templates: Templates,
  metaData: MetaData,
  setMetaData: Dispatch<SetStateAction<MetaData>>
): MetaData => {
  const dataCopy = new Map<string, MetaDataValue>(metaData || undefined);

  Object.keys(templates).forEach((el) => {
    dataCopy.set(el, { title: el, number: null });
  });

  setMetaData(new Map<string, MetaDataValue>(dataCopy));
  
  return dataCopy;
};

export { createMetaDataFromStartingTemplates }