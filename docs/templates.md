# Templates (useReducer)

## Overview
The heart of the site is the object *Templates*, stored in a useReducer.  The *Templates* object contains multiple templates that the user either creates or chooses to have displayed.  Updating the *Templates* is done by using the dispatch function.  We'll cover the structure of the *Templates* object and the different dispatch functions.


## Templates Structure
### Overview
There are multiple levels to the *Template* object: 
 - sections: a part of a wedding ceremony, like the vows, or exchange of rings
 - order: lists the order of sections in a ceremony
 - template: contains sections and an order
 - templates: holds multiple templates

### Templates Breakdown
#### Section
The purpose of the section object is to hold all the data and metadata needed to display a specific part of the wedding ceremony.  The section object is composed of 4 properties:
- **title**: string -> the vanity title of the section, used to display the name, like 'Giving Away', 'Opening Remarks', 'The Kiss'.

- **script**: string[] -> this contains an array of the different scripts that could be spoken by the officiant for this section of the ceremony.  

- **start_pos**: number -> represents the index of the script array at which to display first when loading a section individually from the database.  *-Please note that there is another spot in state (the order) that keeps track of what script the user wants in their template.  This is only used as the default value, chosen by the creator of the site/new sections to display what script will be seen by the user when the user first load the section individually.*

- **description**: string -> a short sentance or two that describes the purpose of the section.  So if the section is 'vows', then the description would say: 'the part of the ceremony where the couple express why they love the other and what they promise for their future.'

Here is an example:
```
kiss: {
  title: "The Kiss",
  start_pos: 1,
  description: "This is when the two people share their first kiss as a married couple",
  script: [
    "PERSON_2, You may kiss your beautiful Wife",
    "PERSON_2, you may kiss your bride.",
    "PERSON_2, You May Kiss Your Wife",
    "You May Kiss",
    "You may kiss your spouse",
    "Write your own...",
  ],
},
```

#### order
The purpose of the order array is to keep track of the order that the *sections* will be displayed in the *template*.  The order array can hold multiple arrays inside of it that have two elements:
1. string -> section *varname*, which is the variable named used in the database
2. number -> the index of which script the user has chosen for their ceremony.

example:
```
order = [
  ["giving_away", 0],
  ["openingRemarks1", 2],
  ["opening_remarks2", 1],
  ["declaration", 1],
  ["charge", 1],
  ["vows_symbolism", 2],
  ["vows_content", 0],
  ["ring_content", 5],
  ["ring_exchange", 0],
  ["pronouncement", 1],
  ["kiss", 1],
  ["introduction", 0]
]
```

The order should correspond with the sections that are in the template, so when a section is removed or added to the template, the order should either remove or add an array for that corresponding template.  

If a new section is added, the index number will be populated by the 'start_pos' found in that section.  However, when a template is loaded, the index number will have already been set and display the user's choice.

Please note that the order array can be empty.  That means that no sections are chosen for the template yet.


#### Template
The template is an object that can hold multiple *sections* and only one *order* array.  The keys are variable name of the *section* and the values are the *section* object, except for the *order* key which will provide the *order* array.

example:
```
const quickWeddingTemplate = {
  openingRemarks1:    { --section data-- },
  declaration:        { --section data-- },
  vows_symbolism:     { --section data-- },
  vows_content:       { --section data-- },
  ring_exchange:      { --section data-- },
  pronouncement:      { --section data-- },
  kiss:               { --section data-- },
  order: [
    ["openingRemarks1", 2],
    ["declaration", 1],
    ["vows_symbolism", 2],
    ["vows_content", 0],
    ["ring_exchange", 0],
    ["pronouncement", 1],
    ["kiss", 1],
  ]
};
```

#### Templates
The *templates* object hold multiple *template* objects.

example:
const templates = {
  quickWeddingTemplate: { --template data-- },
  longWeddingTemplate:  { --template data-- },
  traditionalWedding:   { --template data-- },
  warmWeddingCeremony:  { --template data-- }
}
  


## useReducer Cases (updating state with dispatch)
At the heart of the *reducer* is a switch case. The reducer is expecting an object that looks like this:
```{type: string, payload: any}```
Depending on what string is in the type property, the reducer will have different expectations for the payload.  Here is a look at the different cases:

## addSEC (REMOVED)
This case will add a new section from the database or cache.  This is initialized when a user initiates the load by selecting a *section* from the *sectionSelector*.

The payload is expected to be an object with two properties:
 1. varname: string -> holds the variable name of the section that can be found in the database.
 2. index: number -> holds the spot where this section will be added to the current template.

example: 
```
const action = {
  type: 'addSEC',
  payload: {varname: 'giving_away', index: 6}
}
```

When this case is entered, two functions will run:
 1. setSelectorSec -> which will set the state to remove the sectionSelector.
 2. fetchSectionFromDatabase -> which is an async function that retrieves the corresponding *section*


## loadFetch
This case will load a section and is only called after the async function of 'fetchSectionFromDatabase', which was called by the previous case (addSEC).

The payload is expected to be an object with three properties:
 1. varname: string -> holds the variable name of the section that can be found in the database.
 2. sec: object -> the *section* object received from cache/database
 3. index: number -> holds the spot where this section will be added to the current template.

example: 
```
const action = {
  type: 'loadFetch',
  payload: {
    varname: 'giving_away',
    sec: { --section object-- } 
    index: 6
  }
}
```

When this case is entered, two functions will run:
 1. addSectionToTemplate -> takes the current state and adds the section to the current template being used.


## deleteSEC
This case will delete a *section* from the current template

The payload is expected to be an object with one property:
 1. index: number -> holds the index reference for the *order* array for which section needs to be deleted.

example: 
```
const action = {
  type: 'deleteSEC',
  payload: {
    index: 6
  }
}
```

When this case is entered, the following occurs:
 1. removeSection -> which removes the section from the *order* array.
 2. a copy of templates is made
 3. the new *order* is placed into the copy.
 4. the section is removed from the template.



## updateSEC
This case will update which script is being displayed on a specific section.

The payload is expected to be an object with 4 properties:
 1. cardIndex: number -> holds the index reference for the *order* array for which section script needs to be updated
 2. numOfCards: number -> holds the total number of scripts inside that section.
 3. index: number -> the current index found inside the inner order array that signifies which current script is being displayed.
 4. add: 1 | -1 -> either increment to the next card or decrement to the previous card.

example: 
```
const action = {
  type: 'updateSEC',
  payload: {
    cardIndex: 4,
    numOfCards: 15,
    index: 3,
    add: 1
  }
}
```

When this case is entered, the following occurs:
 1. a newOrder is created with the the changes.
 2. a copy of templates is made
 3. the new *order* is placed into the copy.


## updateWords
updates the script text with the user inputed content

The payload is expected to be an object with 3 properties:
 1. textContent: string -> the text of the section
 2. sectionName: string -> the variable name of the section that holds the edited script.
 3. cardIndex: number -> holds the index reference for the *order* array for which section script needs to be updated


example: 
```
const action = {
  type: 'updateWords',
  payload: {
    textContent: 'You may kiss the bride',
    sectionName: 'the_kiss',
    cardIndex: 4,
  }
}
```

When this case is entered, the following occurs:
 1. a new copy of Templates is made
 2. the specific script is updated
 

## moveSEC
This case will update the order in which the sections are displayed.

The payload is expected to be an object with 2 properties:
 1. sourceIndex: number -> the index in the order of the section that is being moved.
 2. destIndex: number -> the location in the array where the section will be placed.

example: 
```
const action = {
  type: 'moveSEC',
  payload: {
    sourceIndex: 7,
    destIndex: 3
  }
}
```

When this case is entered, the following occurs:
 1. a newOrder is created with the the changes.
 2. a copy of templates is made
 3. the new *order* is placed into the copy.


## selectSEC (REMOVED)
This case will insert the *sectionSelector* into the viewport in the spot that the user clicks.  The sectionSelector lists all the available sections that can be downloaded.

The payload is expected to be an object with 2 properties:
 1. index: number -> the index in the *order* array where sectionSelector will be placed

example: 
```
const action = {
  type: 'selectSEC',
  payload: {
    index: 4
  }
}
```

When this case is entered, the following occurs:
 1. creates an object to update the selectorSec state
 2. updates selectorSec state with the index to insert the sectionSelector




## saveTemplateToDatabase (REMOVED)
This case save the current template to the database.  

There is no payload

When this case is entered, the following occurs:
 1. saveTemplateToDatabase function is run grabbing the currUser, metaData, setMetaData, and state and then making an async call.


## loadUserTemplates
This case will load all of the user *templates* into state. 

The payload is expected to be an object with 1 property:
 1. userTemplates: object of templates -> all the user templates.

example: 
```
const action = {
  type: 'loadUserTemplates',
  payload: {
    userTemplates: { --templates-- }
  }
}
```

When this case is entered, the following occurs:
 1. adds the user templates to the default templates already there.


## loadTEMPLATE (REMOVED)
This case will replace the current *template* being displayed with another one, selected by the user..

The payload is expected to be an object with 2 properties:
 1. key: string -> this is the name of the template that corresponds to one of the keys in the *templates* object

example: 
```
const action = {
  type: 'selectSEC',
  payload: {
    key: 'traditionalCeremony'
  }
}
```

When this case is entered, the following occurs:
 1. the state 'templateTitle' is set to the template name.


## addTEMPLATE
This case add a new blank template to the *templates* and update the current template being displayed.

There is no payload.

example: 
```
const action = {
  type: 'addTemplate',
}
```

When this case is entered, the following occurs:
 1. a copy of *templates* is made.
 2. a new template variable name is created
 3. the *order* array is added to the template (it is empty)
 4. metaData is updated wtih the new info.


## renameTEMPLATE
This case will rename a *template*.

The payload is expected to be an object with 3 properties:
 1. oldName: string -> the original name of the *template*
 2. newName: string -> the new name of the *template*
 3. currTemplate: string -> the variable name of the current template being displayed

example: 
```
const action = {
  type: 'selectSEC',
  payload: {
    oldName: 'funCeremony',
    newName: 'seriousCeremony',
    currTemplate: 'funCeremony',
  }
}
```

When this case is entered, the following occurs:
 1. a copy of the *templates* is made.
 2. a new key with the new name is created and filled with the object from the old variable name
 3. the old key is deleted.
 4. the metaData is updated
 5. If the currTemplate is the one being changed then the currTemplate is updated with the new name.


## deleteTEMPLATE
This case will delete a template

The payload is expected to be an object with 2 properties:
 1. currTitle: string -> this is the variable name of the template that will be deleted

example: 
```
const action = {
  type: 'selectSEC',
  payload: {
    currTitle: 'traditionalCeremony'
  }
}
```

When this case is entered, the following occurs:
 1. the template is deleted in the database.
 2. metaData is updated.
 3. a copy of templates is created.
 3. the template is deleted from the copy


## reset
This case signs the user out, removes the templates and restores default templates.

example:
```
const action = {
  type: 'reset',
}
```

When this case is entered, the following occurs:
 1. the user is signed out
 2. the default state is updated.




#### useTemplates Hook
The *useTemplates* hook is used to acess the template from any component.

You can deconstruct the useTemplate hook to access any of the following data:

 1. templates --> the state
 2. dispatch --> update state with dispatch
 3. templateTitle --> current template title
 4. setTemplateTitle --> setter for current template title
 5. fetchedData --> holds data that was fetched
 6. setFetchedData --> setter for fetchedData
 7. selectorTitles --> all section titles that are used in the sectionSelector
 8. setSelectorTitles --> setter for selectorTitles
 9. names --> the names that the user inputs for the ceremony
10. setNames --> setter for the names.
11. metaData --> meta data for the templates
12. setMetaData --> setter for metaData
13. currTemplate --> The current template being used
14. allT --> the default/reset templates state
15. selectorSec --> state for adding selector
16. setSelectorSec --> setter for selectorSet
17. resetTemplates --> function to reset Templates
18. removeSelectorSec --> function to remove Selector from page
