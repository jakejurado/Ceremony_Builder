# metaData

## Overview
metaData was created in order to keep track of the template and its reference in the database.  

## Structure
The metaData holds a Map data structure with 2 items.  The first is the current name of the template.  The second is an object that has two properties:
 1. number: number -> is the unique identifier for the template in the database.
 2. title: 'string -> is the original name of the template that is saved in the database.

example:
``
metaData = [
["wedding", {number: 1, title: "wedding"}],
["elope", {number: 2, title: "elope"}]
["newTry", {number: 3, title: "myTemplate"}]
["Weird Ass Template", {number: null, title: "Weird Ass Template"}]
``

Take note of a few things.  The first index of the Map is the current name of a template.  It can be different than the name of the template in the database.  This happens when a user changes the name, but doesn't save the changes, so the metaData keeps track of this and updates after it is saved to the database.  If the number is null, that means that the template was created, but not saved yet.