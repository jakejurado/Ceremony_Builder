import {MutableRefObject} from 'react';

  //sets the timing for when the sidebar expands and populates
function openSidebarEffects(sidebarRef: MutableRefObject<HTMLDivElement>, coverRef: MutableRefObject<HTMLDivElement>, closeSidebar: ()=>void): void {
  setTimeout(()=>{
    populate(sidebarRef);
  }, 500)
  openSidebarCss(sidebarRef, coverRef);
  coverRef.current.removeEventListener("mousedown", closeSidebar);
  coverRef.current.addEventListener("mousedown", closeSidebar, { once: true});
}

  //Sets the timing for when the sidebar should shrink and when it should depopulate
function closeSidebarEffects(sidebarRef: MutableRefObject<HTMLDivElement>, coverRef: MutableRefObject<HTMLDivElement>, openSidebar: ()=>void): void {
  setTimeout(()=>{
    closeSidebarCss(sidebarRef, coverRef);
  }, 500)
  depopulate(sidebarRef);
  sidebarRef.current.removeEventListener("mousedown", openSidebar);
  sidebarRef.current.addEventListener("mousedown", openSidebar, { once: true});
}

  //adds css to the dom to make it appear or display
function openSidebarCss(sidebarRef: MutableRefObject<HTMLDivElement>, cover: MutableRefObject<HTMLDivElement>): void {
  if (sidebarRef.current) {
    sidebarRef.current.classList.remove('sidebar-shrink');
  }
  if (cover.current) {
    cover.current.style.display = 'block';
  }
}

  //adds css to the dom to make it shrink or dissapear
function closeSidebarCss(sidebarRef: MutableRefObject<HTMLDivElement>, cover: MutableRefObject<HTMLDivElement>): void {
  if (sidebarRef.current) {
    sidebarRef.current.classList.add('sidebar-shrink');
  }
  if (cover.current) {
    cover.current.style.display = 'none';
  }
}

  //adds flex to all the elements in the dom
function populate(sidebarRef: MutableRefObject<HTMLDivElement>){
  const storage = [];
  storage.push(...Array.from(sidebarRef.current.children) as HTMLElement[]);
  const intervalId = setInterval(() => {
    const curr = storage.shift();
    if(curr) curr.style.display = 'flex';
    if(!storage.length){
      clearInterval(intervalId)
    }
  }, 200)

}

  //removes display from all elements in the dom.
function depopulate(sidebarRef: MutableRefObject<HTMLDivElement>){
  const storage = [];
  storage.push(...Array.from(sidebarRef.current.children) as HTMLElement[]);
  const intervalId = setInterval(() => {
    const curr = storage.pop();
    if(curr) curr.style.display = 'none';
    if(!storage.length){
      clearInterval(intervalId)
    }
  }, 200)
}


export {openSidebarEffects, closeSidebarEffects}