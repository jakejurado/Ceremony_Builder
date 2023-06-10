function determineTemplateTitle(state){
  let title = 'myTemplate'
  if(!state.hasOwnProperty(title)) return title;
  title += '1';
  let i = 2;
  while(state.hasOwnProperty(title)){
    title = title.slice(0, -1) + i;
    i++;
  }

  return title;
}

export {determineTemplateTitle}