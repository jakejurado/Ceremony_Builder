import {Section, Templates} from "./types";

//*** */
type LoadFetch = {
  varname: string;
  sec: Section;
  index: number;
}

type FetchSectionDataItem = {
  description: string;
  title: string;
  script: string
  varname: string
}
type FetchSectionData = Array<FetchSectionDataItem>;

//*** */
type LoadUserTemplates = {type: 'loadUserTemplates', payload: {userTemplates: Templates, setTitle: null}}

type FetchUserTemplatesItem = {
  title: string;
  _id: number;
  creator: number;
  template: string;
} 

type FetchUserTemplates = Array<FetchUserTemplatesItem>;

//*** */

type FetchTitlesItem = {
  category: string;
  title: string;
  varname: string;
}

type FetchTitles = Array<FetchTitlesItem>

type TitlesData = {
  [key: string] : {[key: string]: string}
}


export {LoadFetch, FetchSectionData, FetchUserTemplates, LoadUserTemplates, FetchTitles, TitlesData}