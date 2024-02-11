# The Pop up Feature (thePopup)

## Overview
thePopup controlls all popups and uses React's useReducer.  When a dispatch is recieved, the following popup will occur depending on which case is matched.  The popup controlls:
 - the login/signup popup
 - the template popup
 - the print page popup.

## Contents
thePopup relys on the dispatch function within useReducer to send an object to the reducer.  The reducer receives an action object with two properties:

 1. **type**: string -> can either be 
   - 'myAuth' --> opens the signin/logup/account popup
   - 'myTemplates' --> opens the edit templates metadata popup.
   - 'myPrint' --> opens the print screen.
   - null --> closes the popup screen

 2. **subAct**: string -> can either be:
   - 'signup' -> opens the signup popup
   - 'login' -> opens the login popup
   - 'forgot' -> opens the forgot password popup
   - 'delete' -> opens the delete account popup.
   - 'reset' -> opens the reset password popup.
   - 'signout' -> opens the signout popup.


## Usage
import useContext hook and the instance of state we made called 'GlobalContext':
```import {useContext} from 'react ```
```import { GlobalContext} from "./App```

extract dispatch from *GlobalContext*:
```const {dispatch} = useContext(GlobalContext)```

to open a popup, send a dispatch like this one used to open the delete account popup:
```popupDispatch({type:'myAuth', subAct: 'delete'})```

or the following to close the popup box:
```popupDispatch({type: null, subAct: null})```


## Functionality
In the JSX of the App.jsx page, we have some conditional rendoring:
```{thePopup.box &&  <Popup box={thePopup.box} subAct={thePopup.subAct}/> }```

When the box is not null, the <Popup> component is rendored.  The component Popup checks what the value of the 'box' is and then returns the following component.
 - myAuth returns <PopupAuth>
 - myPrint returns <PopupPrint>
 - myTemplates returns <PopupTemplate>

*PopupPrint & PopupTemplate are pretty standard components, but there is more complexity to the PopupAuth component.  The PopupAuth looks at the *subAct* of the thePopup state and returns the following components based on the corresponding string:
  - signup -> <PopupAuthSignup>
  - login -> <PopupAuthLogin>
  - forgot -> <PopupAuthForgot>
  - delete -> <PopupAuthDelete>
  - reset ->  <PopupAuthReset>
  - signout -><PopupAuthSignout> 