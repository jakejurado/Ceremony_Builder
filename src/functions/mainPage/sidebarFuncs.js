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

// function animateSidebar(sidebar, time, interval) {
//   return new Promise((resolve) => {
//     const elements = Array.from(sidebar.children).reverse();
//     let currentIndex = 0;
//     const intervalId = setInterval(() => {
//       const element = elements[currentIndex++];
//       if (element) {
//         setStyle(element, "display", "none");
//       } else {
//         clearInterval(intervalId);
//         resolve();
//       }
//     }, interval);
//     setTimeout(() => {
//       elements.forEach((element) => {
//         setStyle(element, "display", "flex");
//       });
//     }, time - interval);
//   });
// }

// function openSidebar(sidebar, button, main, time, interval) {
//   setStyle(button, "display", "none");
//   setStyle(main, "display", "block");
//   setStyle(sidebar, "width", "30%");
//   return animateSidebar(sidebar, time, interval);
// }

// function closeSidebar(sidebar, button, main, time, interval) {
//   setStyle(sidebar, "width", "0");
//   setStyle(main, "display", "none");
//   const elements = Array.from(sidebar.children);
//   return animateSidebar(sidebar, time, interval).then(() => {
//     setStyle(button, "display", "flex");
//     elements.forEach((element) => {
//       setStyle(element, "display", "none");
//     });
//   });
// }

// function toggleSidebar() {
//   const sidebar = document.getElementById("sideBar");
//   const button = document.getElementById("sidebarButton");
//   const main = document.getElementById("cover");
//   const fullTime = 1500;
//   const partialTime = fullTime - 500;
//   const intervalTime = 100;
//   let isOpen = false;
//   return () => {
//     if (isOpen) {
//       closeSidebar(sidebar, button, main, fullTime, intervalTime).then(() => {
//         isOpen = false;
//       });
//     } else {
//       openSidebar(sidebar, button, main, fullTime, intervalTime).then(() => {
//         isOpen = true;
//       });
//     }
//   };
// }

// export { toggleSidebar };
