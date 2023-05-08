import { Template, Templates, personState } from "../../types/types";
//This function adds the contents from the dom into the templates state
function saveDomToTemplates(
  template,
  domArr,
  persons,
  templates,
  templateTitle
) {
  console.log('here are templates', templates)
  const allTemplates = Object.assign({}, templates) //JSON.parse(JSON.stringify(templates));
  
  //puts the current dom into the current template.
  const updatedTemplate = putDomInTemplate(template, domArr, persons);
  
  //adds the updatedTemplate to the copied templates state
  const newTemplates = Object.assign(allTemplates, {
    [templateTitle]: updatedTemplate,
  });

  return newTemplates;
}

//This function puts the current dom into the current template
function putDomInTemplate(template, dom, persons) {
  const templateCopy = {} 
 
  //grab the list of sections from useRef
  const myDom = dom.current.children[0].children;

  //inset order into newTemplate
  templateCopy['order'] = [];

  //iterate over the dom elements and update the template copy
  for (const el of myDom) {
    const classes = el.children[0].classList;
    const title = classes[0]; //grab title from dom class
    const [_, indexNum] = classes[2].split("-"); //grab index from dom class
    const script = el.children[0].children[0].children[1].innerText; //grab script from dom

    //move entire section into templateCopy
    templateCopy[title] = {};
    Object.assign(templateCopy[title], template[title])

    //update order
    templateCopy['order'].push([title, indexNum])

    // update template
    templateCopy[title].script[parseInt(indexNum)] = replaceWords(
      script,
      persons
    );
  }
  
  return templateCopy;
}

//This function replaces the words
function replaceWords(input, persons) {
  let newText = input;
  if (persons.person1)
    newText = newText.replaceAll(persons.person1.toUpperCase(), "PERSON_1");
  if (persons.person2)
    newText = newText.replaceAll(persons.person2.toUpperCase(), "PERSON_2");
  const splitText = newText.split(/\r?\n\n/g);
  return splitText.join("<br/>");
}

export { saveDomToTemplates };
