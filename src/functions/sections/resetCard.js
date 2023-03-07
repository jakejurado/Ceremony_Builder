// const input =
//   "Will you, COURTNEY, take this (woman/man) to be your wedded wife?\n\n-COURTNEY: I will.\n\nWill you, JACOB, take this (man/woman) to be your wedded husband?\n\n-JACOB: I will.";
// const persons = { person1: "Jacob", person2: "Courtney" };

function saveToTemplate(templates, templateTitle, persons) {
  const newTemplate = addDomToTemplate(templates[templateTitle], persons);
  const allTemplates = { ...templates };
  return Object.assign(allTemplates, newTemplate);
}

function replaceWords(input, persons) {
  let newText = input;
  if (persons.person1)
    newText = newText.replaceAll(persons.person1.toUpperCase(), "PERSON_1");
  if (persons.person2)
    newText = newText.replaceAll(persons.person2.toUpperCase(), "PERSON_2");
  const splitText = newText.split(/\r?\n\n/g);
  return splitText.join("<br/>");
}

function addDomToTemplate(template, persons) {
  console.log({ template });
  // copies the object
  const newTemplate = { ...template };
  // Grabs all the cards on the page
  const cards = document.querySelectorAll(".cards");
  //updates the new object with the cards on the page.
  newTemplate.order.forEach((pair, i) => {
    const [varName, index] = pair;
    console.log({ pair });
    if (varName === "giving_away") {
      console.log(template[varName].script[index]);
      console.log(cards[i].innerText);
      template[varName].script[index] = replaceWords(
        cards[i].innerText,
        persons
      );
    }
  });

  console.log(newTemplate);
  return newTemplate;
}

function addDomToTemplate2(template, persons) {
  // copies the object
  const newTemplate = {};
  // Grabs all the cards on the page
  const cards = document.querySelectorAll(".cards");
  cards.forEach((card) => {});
  //updates the new object with the cards on the page.
  newTemplate.order.forEach((pair, i) => {
    const [varName, index] = pair;
    console.log({ pair });
    if (varName === "giving_away") {
      console.log(template[varName].script[index]);
      console.log(cards[i].innerText);
      template[varName].script[index] = cards[i].innerText;
    }
  });

  console.log(newTemplate);
  return newTemplate;
}

export { saveToTemplate };
