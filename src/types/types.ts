//USE

//ELEMENTRY TYPES
type orderContent = [string, number];

type order = Array<orderContent | undefined>;

interface Section {
  script: Array<string>;
  description: string;
  start_pos: number;
  title: string;
  duplicates?: number;
}

interface TemplateSansOrder {
  [key: string]: Section;
}

// interface Template {
//   order: order;
//   [key: string]: Section | order;
// }

interface Template {
  [key: string]: Section | { order: order };
}

interface Templates {
  [key: string]: Template;
}

interface Cache {
  [key: string]: Section;
}

type personState = {
  person1: string | undefined;
  person2: string | undefined;
};

type selectorSec = {
  isVisible: boolean;
  position: undefined | number;
};

//ReducerPayloads
type moveSecPayload = {
  sourceIndex: number;
  destIndex: number;
};

type updateSecPayload = {
  cardIndex: number;
  numOfCards: number;
  index: number;
  add: number;
};

type loadSecPayload = {};

//EXTRA SPACE

//CHECK
type displaySet = [string, number];

type display = [] | Array<displaySet>;

type displayU = [] | Array<displaySet | undefined>;

type section = {
  title: string;
  description: string;
  start_pos: number;
};

type dataObj = {
  title: string;
  description: string;
  varname: string;
  script: string;
};

type dataArray = Array<dataObj>;

interface TemplateState {
  [key: string]: any; // This allows any key with any value type
}

export {
  order,
  Section,
  Template,
  TemplateSansOrder,
  Templates,
  Cache,
  personState,
  selectorSec,
  moveSecPayload,
  updateSecPayload,
  displaySet,
  display,
  displayU,
  section,
  dataObj,
  dataArray,
  TemplateState
};
