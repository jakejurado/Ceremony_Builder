import { setStyle } from "./styleFuncs";

function createSidebarToggle() {
  const storage = [];
  return (isOpen) => {
    //dom elements for the sidebar.
    const sidebar = document.getElementById("sideBar");
    const sidebarButton = document.getElementById("sidebarButton");
    const main = document.getElementById("cover");

    //animation transition time.
    const fullTime = 1500;
    const partialTime = fullTime - 500;
    const intervalTime = 100;

    //Close the sidebar.
    if (!isOpen) {
      //close the sidebar
      setStyle(sidebar, "width", "0");

      //show the button
      setTimeout(() => {
        setStyle(sidebarButton, "display", "flex");
      }, fullTime);

      //main page opacity back to normal
      setStyle(main, "display", "none");

      //remove sidebar content one at a time.
      storage.push(...Object.values(sidebar.children));
      const intervalId = setInterval(() => {
        const curr = storage.pop();
        setStyle(curr, "display", "none");
        if (!storage.length) {
          clearInterval(intervalId);
        }
      }, intervalTime);
    } else {
      //open the sidebar

      //make sidebarButton dissapear.
      setStyle(sidebarButton, "display", "none");

      //main page opacity decrease
      setStyle(main, "display", "block");

      //open the sidebar
      setStyle(sidebar, "width", "30%");

      //populate sidebar with content
      function populateSidebar() {
        storage.push(...Object.values(sidebar.children));
        const intervalId = setInterval(() => {
          const curr = storage.shift();
          setStyle(curr, "display", "flex");
          if (!storage.length) clearInterval(intervalId);
        }, intervalTime);
      }
      setTimeout(() => {
        populateSidebar();
      }, partialTime);
    }
  };
}

const toggleSidebar = createSidebarToggle();

export { toggleSidebar };