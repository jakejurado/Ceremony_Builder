import React, { useState, useEffect, useReducer, createContext } from "react";
import MainDisplay from "./MainDisplay";
import Sidebar from "./Sidebar";
import SidebarButton from "./SidebarButton";
import AccountBox from "./AccountBox";
import Popup from "../Components/Popup";
import { toggleSidebar } from "../functions/mainPage/sidebarFuncs";
import { templateWed, templateWed2 } from "../server/files/serverDB2";
import templateElope from "../server/files/serverDB";

import "../styles/main.scss";

//global context
export const GlobalContext = createContext(null);

function App() {
  //keeps track of sidebar state
  const [sidebarOpen, setSidebarOpen] = useState(true);

  //state determines if popup should be displayed
  const [isPopup, setIsPopup] = useState(false);

  const [popupState, popDispatch] = useReducer(reducer, {
    display: false,
  });

  function reducer(state, action) {
    console.log(action);
    switch (action.type) {
      case "print":
        return { display: "print" };
      case "account":
        return { display: "account" };
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

  //stores the templates
  const [templates, setTemplates] = useState({
    wedding: templateWed2,
    elope: templateElope,
  });

  //determines which template to be displayed.
  const [templateTitle, setTemplateTitle] = useState("wedding");

  //holds the names of the two getting married.
  const [names, setNames] = useState({
    person1: undefined,
    person2: undefined,
  });

  //watches for sideBarOpen state change to open and close the sidebar
  useEffect(() => {
    //adds the ability to close the sidebar.  The timeout allows time for transition to occur.
    if (sidebarOpen) {
      setTimeout(
        () => {
          document
            .getElementById("cover")
            .addEventListener("mousedown", () => setSidebarOpen(false), {
              once: true,
            });
        },
        3000,
        { once: true }
      );
    }

    toggleSidebar(sidebarOpen);
  }, [sidebarOpen]);

  function runPrint() {
    setIsPopup(true);
  }

  return (
    <div className="App">
      <GlobalContext.Provider
        value={{
          templates,
          templateTitle,
          currTemplate: templates[templateTitle],
          setTemplateTitle,
          names,
          setNames,
          setIsPopup,
          runPrint,
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
