import { Templates } from "../../types/types";


function determineTemplateTitle(state: Templates): string{
  let title: string = 'myTemplate'
  if(!state.hasOwnProperty(title)) return title;
  title += '1';
  let i: number = 2;
  while(state.hasOwnProperty(title)){
    title = title.slice(0, -1) + i;
    i++;
  }

  return title;
}

export {determineTemplateTitle}