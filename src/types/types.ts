type displaySet = [string, number];

type display = [] | Array<displaySet>;

type displayU = [] | Array<displaySet | undefined>;

type section = {
  title: string,
  description: string,
  start_pos: number,
}

type dataObj = {
  title: string,
  description: string,
  varname: string,
  script: string
}

type dataArray = Array<dataObj>


export {displaySet, display, displayU, section, dataObj, dataArray}