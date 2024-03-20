import { fetchCall } from "./api";
import { Templates } from "../../types/types"
import { SetStateAction } from "react";
import {FetchTitles, TitlesData} from "../../types/dispatch"


//fetch request to the backend/database for all titles along with their varname and category
async function fetchTitles(updateState: React.Dispatch<SetStateAction<TitlesData>>): Promise<void> {
  try{
    const response: FetchTitles = await fetchCall.get('titles');
    const allTitles: TitlesData = await organizeDataByCategory(response)
    updateState(allTitles);
  } catch(err){
    console.error('error in fetching all titles', err)
  }
}

//recieves array with multiple objects of "category", "varname", and "title", and returns an object organized by category.
function organizeDataByCategory(data: FetchTitles): TitlesData {
  const res: TitlesData = {};
  data.forEach(({ category, title, varname }) => {
    if (!res.hasOwnProperty(category)) res[category] = {};
    res[category][title] = varname;
  });
  return res;
}

export { fetchTitles, organizeDataByCategory };
