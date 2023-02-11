import { setStyle } from "./styleFuncs";

function openCloseSidebar(isOpen) {
  //dom elements for the sidebar.
  const sidebar = document.getElementById("sideBar");
  const sidebarButton = document.getElementById("sidebarButton");
  const main = document.getElementById("mainDisplay");

  //animation transition time.
  const fullTime = 2000;
  const partialTime = fullTime - 500;
  const intervalTime = 300;

  //If the sidebar should be closed
  if (!isOpen) {
    function closeSidebar() {
      //set width to 0 before changing the display otherwise transition won't work
      setStyle(sidebar, "width", "0");
      setTimeout(() => {
        setStyle(sidebar, "display", "none");
      }, fullTime);
    }

    //reset sidebarButton opacity for when it pops out again.
    setTimeout(() => {
      setStyle(sidebarButton, "opacity", "1");
    }, fullTime);

    //main page opacity back to normal
    setStyle(main, "opacity", 1);

    //remove sidebar content one at a time.
    const allChildren = Object.values(sidebar.children);
    const intervalId = setInterval(() => {
      const curr = allChildren.pop();
      setStyle(curr, "display", "none");
      if (!allChildren.length) {
        clearInterval(intervalId);
        closeSidebar();
      }
    }, intervalTime);
    //activate the sidebar
  } else {
    //make sidebarButton dissapear.
    setStyle(sidebarButton, "opacity", 0);

    //main page opacity to half
    setStyle(main, "opacity", "0.25");

    //open the sidebar, first display it and make with to 0, so that transition will show
    setStyle(sidebar, "display", "block");
    setStyle(sidebar, "width", "0");

    setTimeout(() => {
      setStyle(sidebar, "width", "30%");
    }, 50);

    //populate sidebar with content
    function populateSidebar() {
      const allChildren = Object.values(sidebar.children);
      const intervalId = setInterval(() => {
        const curr = allChildren.shift();
        setStyle(curr, "display", "block");
        if (!allChildren.length) clearInterval(intervalId);
      }, 300);
    }
    setTimeout(() => {
      populateSidebar();
    }, partialTime);
  }
}

export { openCloseSidebar };
