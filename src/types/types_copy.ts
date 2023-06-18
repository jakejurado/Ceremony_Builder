//USE

//ELEMENTRY TYPES
type OrderContent = [string, number];

type Order = Array<OrderContent | undefined>;

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


interface Template {
  [key: string]: Section | { order: Order };
}

interface EmptyTemplate {
  order: Order;
}

type FilledTemplate = EmptyTemplate & { [key: string]: Section };

interface TemplatesSansTemplate {
  [key: string]: Section | { order: Order }
}

type TemplatesFilled = TemplatesSansTemplate & FilledTemplate

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

type MetaDataValue = { title: string; number: number | null };

type MetaData = Map<string, MetaDataValue> | null;

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
  Order,
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
  TemplateState,
  MetaDataValue,
  MetaData,
  EmptyTemplate,
  FilledTemplate,
};
