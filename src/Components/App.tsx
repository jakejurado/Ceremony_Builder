import React, { useState, useEffect, useContext, createContext } from "react";
import MainDisplay from "./MainDisplay";
import Sidebar from "./Sidebar";
import SidebarButton from "./SidebarButton";
import AccountBox from "./AccountBox";
import { toggleSidebar } from "../functions/mainPage/sidebarFuncs";
import { templateWed, templateWed2 } from "../server/files/serverDB2";
import templateElope from "../server/files/serverDB";

import "../styles/main.scss";

//global context
export const GlobalContext = createContext(null);

function App() {
  //keeps track of sidebar state
  const [sidebarOpen, setSidebarOpen] = useState(true);

  //keeps track of accountBox state
  const [isAcctBox, setAcctBox] = useState(false);

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
            .getElementById("mainDisplay")
            .addEventListener("click", () => setSidebarOpen(false), {
              once: true,
            });
        },
        3000,
        { once: true }
      );
    }

    toggleSidebar(sidebarOpen);
  }, [sidebarOpen]);

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
        }}
      >
        {isAcctBox && <AccountBox />}

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
