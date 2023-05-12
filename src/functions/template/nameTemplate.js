function createNameValidator(){
  const cache = {};

  return (allNames, newName) => {
    if( !allNames.includes(newName)) {
      return newName;

    } else {
      if(!cache.hasOwnProperty(newName)){
        cache[newName] = 1;
      }
      cache[newName]++;
      return `${newName}${cache[newName]}`;
    }
  }
}

const nameValidator = createNameValidator();

export {nameValidator}