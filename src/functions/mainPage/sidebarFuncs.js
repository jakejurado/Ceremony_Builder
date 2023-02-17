import { setStyle } from "./styleFuncs";

function createSidebarToggle() {
  const storage = [];
  return (isOpen) => {
    //dom elements for the sidebar.
    const sidebar = document.getElementById("sideBar");
    const sidebarButton = document.getElementById("sidebarButton");
    const main = document.getElementById("mainDisplay");

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
      setStyle(main, "opacity", 1);

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
      setStyle(main, "opacity", "0.25");

      //open the sidebar
      setStyle(sidebar, "width", "30%");

      //populate sidebar with content
      function populateSidebar() {
        storage.push(...Object.values(sidebar.children));
        const intervalId = setInterval(() => {
          const curr = storage.shift();
          setStyle(curr, "display", "block");
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

// function openCloseSidebar(isOpen) {
//   //dom elements for the sidebar.
//   const sidebar = document.getElementById("sideBar");
//   const sidebarButton = document.getElementById("sidebarButton");
//   const main = document.getElementById("mainDisplay");

//   //animation transition time.
//   const fullTime = 1500;
//   const partialTime = fullTime - 500;
//   const intervalTime = 100;

//   //Close the sidebar.
//   if (!isOpen) {
//     //close the sidebar
//     setStyle(sidebar, "width", "0");

//     //show the button
//     setTimeout(() => {
//       setStyle(sidebarButton, "display", "block");
//     }, fullTime);

//     //main page opacity back to normal
//     setStyle(main, "opacity", 1);

//     //remove sidebar content one at a time.
//     const allChildren = Object.values(sidebar.children);
//     const intervalId = setInterval(() => {
//       const curr = allChildren.pop();
//       setStyle(curr, "display", "none");
//       if (!allChildren.length) {
//         clearInterval(intervalId);
//       }
//     }, intervalTime);
//   } else {
//     //open the sidebar

//     //make sidebarButton dissapear.
//     setStyle(sidebarButton, "display", "none");

//     //main page opacity decrease
//     setStyle(main, "opacity", "0.25");

//     //open the sidebar
//     setStyle(sidebar, "width", "30%");

//     //populate sidebar with content
//     function populateSidebar() {
//       const allChildren = Object.values(sidebar.children);
//       const intervalId = setInterval(() => {
//         const curr = allChildren.shift();
//         setStyle(curr, "display", "block");
//         if (!allChildren.length) clearInterval(intervalId);
//       }, 300);
//     }
//     setTimeout(() => {
//       populateSidebar();
//     }, partialTime);
//   }
// }

export { toggleSidebar };
