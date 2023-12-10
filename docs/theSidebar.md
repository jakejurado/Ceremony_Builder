#The Sidebar

## Overview
The sidebar opens and closes from the left hand side whether you are on desktop or mobile.  When you close the sidebar, the elements inside the sidebar dissapear from the bottom up before the sidebar slowly goess off screen (for mobile) or shrinks to the side (for desktop).  The sidebar can be opened by swiping from left to right (on mobile) or clicking the sidebar (on desktop).  It closes by swiping from right to left or clicking the x (on mobile) or clicking outside the Sidebar on desktop.

## Code
### useState
The heart of the Sidebar is the useState variable mySidebar, which is a boolean.  If true, the sidebar should be open and then closed if false.  mySidebar is found in App.tsx. ``const [mySidebar, setMySidebar] = useState(false)``

Also, in the App.tsx are the functions 'closeSidebar' & 'openSidebar', which are used to change the state and open/close the sidebar
``function closeSidebar(){setMySidebar(false);}``

``function openSidebar(){setMySidebar(true);}``

### useEffect
Further down in the App.tsx is a useEffect hook that has 'mySidebar' as a dependency:

```
useEffect(()=>{  
      //changes the css of the dom and adds/removes event listeners
    if(mySidebar){
      openSidebarEffects(sidebarRef, coverRef, closeSidebar);
    } else{
      closeSidebarEffects(sidebarRef, coverRef, openSidebar);
    }

  }, [mySidebar, setMySidebar])
```

if 'mySidebar' is true then it runs an imported function called 'openSidebarEffects', otherwise it runs the imported function 'closeSidebarEffects'

### Helper functions
Here is what those functions do:

*openSidebarEffects* takes in a few arguements:
 1. sidebarRef: the ref for the sidebar
 2. coverRef: the ref for the white cover that hides the rest of the page when the sidebar is open
 3. closeSidebar: the function we mentioned earlier.

First, it removes the css class 'sidebar-shrink' from the sidebarRef and adds ``display: block`` to the coverRef.  Then, inside a setTimeout, which waits for the sidebar to expand, it iterates over all the elements within the sidebarRef and changes the display to 'flex'.  It does this in intervals so that the plop on the screen one at a time from the top down.

Lastly, it adds the function closeSidebar to the mousedown event listener, so that when a person clicks on the coverRef, the sidebar will close.

*closeSidebarEffects* takes in 3 arguements:
 1. sidebarRef: the ref for the sidebar
 2. coverRef: the ref for the white cover that hides the rest of the page when the sidebar is open
 3. openSidebar: the function we mentioned earlier.

 First, it iterates over the elements of the sidebarRef and adds 'display: none' to each element.  It does this in intervals, so they are removed one at a time from the bottom up.  Then inside a setTimeout, it adds the css class 'sidebar-shrink' to the sidebarREf and adds ``display: none`` to the coverRef.  This happens after the elements inside the display are removed. 

 Lastly, it adds the function openSidebar to the mousedown event listener on the sidebarRef, so that when clicked, it will open.


### SWIPE
Inside the AppMainDisplay.jsx component, we import the 'useSwipeable' package to listen for swipes left and right.  

### Close Button
Inside the Sidebar component is a close button that when clicked the closeButton function is invoked to close the Sidebar.


## The Sidebar Component.
The sidebar component holds a tools:
 - SidebarAccount Component: for authentication functionality.
 - SideBarTemplate Component: for selecting which Template to use for the wedding ceremony.
 - SidebarSave Component: for saving the current Template to the database.
 - SidebarPrint (desktop only): for printing the template
 - SidebarCopy (mobile only): for copying all the wording of the template to the clipboard.
 - ButtonClose component (mobile only) for closing the sidebar.
