

//TEMPLATES 

  //order
type OrderContent = [string, number];
type Order = Array<OrderContent | undefined>;
// type OrderNotNull = Array<OrderContent>

type NonEmptyArray<T> = [T, ...T[]];
type OrderNonEmpty = NonEmptyArray<OrderContent>;

  //sections
interface Section {
  script: Array<string>;
  description: string;
  start_pos: number;
  title: string;
  duplicates?: number;
}

  //template
interface TemplateSansOrder {
  [key: string]: Section;
}

interface TemplateSansSection{
  order: Order;
}

type Template = TemplateSansSection & Section;

  //templates
interface TemplatesSansContent{
  [key: string] : TemplateSansSection
}

interface TemplatesWithContent{
  [key: string] : Template
}

type Templates = TemplatesSansContent | TemplatesWithContent

//CACHE
interface Cache {
  [key: string]: Section;
}

//PERSON
type PersonState = {
  person1: string | undefined;
  person2: string | undefined;
};

//SELECTOR BOX
type selectorSec = {
  isVisible: boolean;
  position: undefined | number;
};


//META DATA
type MetaDataValue = { title: string; number: number | null };
type MetaData = Map<string, MetaDataValue> | null;


//REDUCERS

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
  OrderContent,
  Order,
  OrderNonEmpty,
  Section,
  TemplateSansOrder,
  TemplateSansSection,
  Template,
  TemplatesSansContent,
  TemplatesWithContent,
  Templates,
  Cache,
  PersonState,
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
};
