# Wedding Ceremony Builder

## Overview
Wedding Ceremony Builder (WCB) is a web application that allows users to create their own wedding ceremony script.  

## Structure
At the heart of WCB is the state *templates* served by the useReducer hook.  Templates is an object that hold multiple templates (or ceremony scripts).  Each ceremony script (template) is constructed with multiple *sections* (like vows, rings, the pronouncement, ect...).  There are a plethora of sections and the user can choose which ones to include/exclude.

Each section has multiple wording options.  So for the section, "The Kiss", the user can choose either of these script options:
  - 'You may kiss the bride'
  - 'You may kiss your beautiful bride'
  - 'Please celebrate your marriage with a kiss'.
  - 'write your own'

As you see with the last option, they can write their own or edit any of the other scripts.  

The web application keeps track of which sections they want in their ceremony, the order they appear, and which scripts they choose.

[You can read more about the *templates* state here](/docs/templates.md)

