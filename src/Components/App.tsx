import React, { useState, useEffect, useReducer, createContext } from "react";
import MainDisplay from "./MainDisplay";
import Sidebar from "./Sidebar";
import SidebarButton from "./SidebarButton";
import AccountBox from "./AccountBox";
import Popup from "../Components/Popup";
import PopupPrint from "./PopupPrint";
import { toggleSidebar } from "../functions/mainPage/sidebarFuncs";
import { templateWed, templateWed2 } from "../server/files/serverDB2";
import templateElope from "../server/files/serverDB";

import "../styles/main.scss";

//global context
export const GlobalContext = createContext(null);

function App() {
  //keeps track of sidebar state
  const [sidebarOpen, setSidebarOpen] = useState(true);

  //stores the templates
  const [templates, setTemplates] = useState({
    wedding: templateWed2,
    elope: templateElope,
  });

  //determines which template to be displayed.
  const [templateTitle, setTemplateTitle] = useState("wedding");

  //holds the names of the two getting married.
  const [names, setNames] = useState({
    person1: "JACOB",
    person2: "COURTNEY",
  });

  //Controls the state of popup for printing and account
  const [popupState, popDispatch] = useReducer(popReducer, {
    display: false,
  });

  function popReducer(state, action) {
    console.log(action);
    switch (action.type) {
      case "print":
        console.log(templates[templateTitle].order);
        return { display: <PopupPrint /> };
      case "account":
        return { display: <AccountBox /> };
      case "signin":
        return { display: "signin" };
      case "signup":
        return { display: "signup" };
      case "initialLoad":
        return { display: false };

      case "close":
        return { display: false };
      default:
        console.log("error case");
    }
  }

  //watches for sideBarOpen state change to open and close the sidebar
  useEffect(() => {
    //adds the ability to close the sidebar.  The timeout allows time for transition to occur.
    if (sidebarOpen) {
      console.log("here???");
      setTimeout(
        () => {
          document.getElementById("cover").addEventListener(
            "mousedown",
            () => {
              console.log("pre");
              setSidebarOpen(false);
              console.log("post");
            },
            {
              once: true,
            }
          );
        },
        2500,
        { once: true }
      );
    }

    toggleSidebar(sidebarOpen);
    console.log("aftertoggle");
  }, [sidebarOpen]);

  return (
    <div className="App">
      <GlobalContext.Provider
        value={{
          templates,
          setTemplates,
          templateTitle,
          currTemplate: templates[templateTitle],
          setTemplateTitle,
          names,
          setNames,
          popDispatch,
          popupState,
        }}
      >
        {popupState.display && <Popup />}

        <SidebarButton
          toggleSidebarState={() => setSidebarOpen(!sidebarOpen)}
        />
        <Sidebar />
        <MainDisplay />
      </GlobalContext.Provider>
    </div>
  );
}

export default App;
