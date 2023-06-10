  //adds the meta data from the starting template to metaData state
function createMetaDataFromStartingTemplates(templates, metaData, setMetaData){
  const dataCopy = new Map(metaData);
    Object.keys(templates).forEach((el) => {
      dataCopy.set(el, {title: el, number: null});
      setMetaData(new Map(dataCopy));
    })
}


export {createMetaDataFromStartingTemplates}