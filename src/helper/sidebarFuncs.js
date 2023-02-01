import {
  toggleDisplay,
  toggleOpacity,
  toggleOpacityPartial,
  toggleWidth,
} from "../helper/styleToggles";

function openCloseSidebar(isOpen) {
  const sidebar = document.getElementById("sideBar");
  const sidebarButton = document.getElementById("sidebarButton");
  const main = document.getElementById("mainDisplay");

  if (!isOpen) {
    function closeSidebar() {
      //remove sidebar
      toggleWidth(sidebar, false);
      setTimeout(() => {
        toggleDisplay(sidebar, false);
      }, 2000);
    }
    //make sidebarButton appear
    setTimeout(() => {
      toggleOpacity(sidebarButton, true);
    }, 2000);

    //main opacity to normal
    toggleOpacityPartial(main, true);

    //remove sidebar content
    const allChildren = Object.values(sidebar.children);
    const intervalId = setInterval(() => {
      const curr = allChildren.pop();
      toggleDisplay(curr, false);
      if (!allChildren.length) {
        clearInterval(intervalId);
        closeSidebar();
      }
    }, 300);
  } else {
    //make sidebarButton appear
    toggleOpacity(sidebarButton, false);

    //main opacity to half
    toggleOpacityPartial(main, false);

    //open the sidebar
    toggleDisplay(sidebar, true);
    toggleWidth(sidebar, false);
    setTimeout(() => {
      toggleWidth(sidebar, true);
    }, 50);

    //populate sidebar with content
    function populateSidebar() {
      const allChildren = Object.values(sidebar.children);
      const intervalId = setInterval(() => {
        const curr = allChildren.shift();
        toggleDisplay(curr, true);
        // curr.style.display = "block";
        if (!allChildren.length) clearInterval(intervalId);
      }, 300);
    }
    setTimeout(() => {
      populateSidebar();
    }, 1500);
  }
}

export { openCloseSidebar };
