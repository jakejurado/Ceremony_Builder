import { setStyle } from "./styleFuncs";

interface SidebarToggleTime {
  full: number;
  partial: number;
  interval: number;
}

class createSidebarToggle {
  sidebarClass: string;
  coverClass: string;
  sidebar: HTMLElement | undefined;
  cover: HTMLElement | undefined;
  display: boolean;
  storage: HTMLElement[];
  time: SidebarToggleTime;
  isMobile: boolean;

  constructor(sidebarClass: string, coverClass: string, isMobile: boolean = false){
    this.sidebarClass = sidebarClass;
    this.coverClass = coverClass
    this.sidebar = undefined;
    this.cover = undefined;
    this.display = true;
    this.storage = [];
    this.isMobile = isMobile
    this.time =  {
      full: 1500,
      partial: 1000,
      interval: 100,
    };
  }

    // adds items to sidebar
  populate() {
    if (!this.sidebar) return;

    this.storage.push(...Array.from(this.sidebar.children) as HTMLElement[]);
    const intervalId = setInterval(() => {
      const curr = this.storage.shift();
      if (curr) setStyle(curr, "display", "flex");
      if (!this.storage.length) clearInterval(intervalId);
    }, this.time.interval);
  }


    // removes items from sidebar
  depopulate() {
    if (!this.sidebar) return;
   
    this.storage.push(...Array.from(this.sidebar.children) as HTMLElement[]);
    const intervalId = setInterval(() => {
      const curr = this.storage.pop();
      if (curr) setStyle(curr, "display", "none");
      if (!this.storage.length) {
        clearInterval(intervalId);
      }
    }, this.time.interval);
  }

    //populates sidebar and adds event listener
  activate() {
    console.log('enter activate')
    this.fillDomElementsIfEmpty();

    setStyle(this.cover, "display", "block");

    this.sidebar.classList.remove('sidebar-shrink');

    setTimeout(() => {
      this.populate();
    }, this.time.partial);

    if(!this.isMobile) {
      setTimeout(() => {
        this.attachListenerCover();
      }, this.time.full);
    }
    
    this.display = true;
  }

    //depopulates sidebar and removes event listener
  deactivate() {
    this.fillDomElementsIfEmpty();
    // if (!this.sidebar) return;
    this.sidebar.classList.add('sidebar-shrink')

    if (!this.cover) return;
    setStyle(this.cover, "display", "none");

    this.depopulate();

    if(!this.isMobile) {
      setTimeout(() => {
        this.attachListenerSidebar();
      }, this.time.full);
    }
    
    this.display = false;
  }

  

  fillDomElementsIfEmpty(){
    this.sidebar = document.getElementById(this.sidebarClass) as HTMLElement;
    this.cover = document.getElementById(this.coverClass) as HTMLElement;
  }


  toggleFunc = () => {
    this.deactivate();
  };

  activateFunc = () => {
    this.activate()
  }

  attachListenerCover() {
    if (!this.cover) return;
    this.cover.addEventListener("mousedown", this.toggleFunc, { once: true });
  }

  attachListenerSidebar() {
    if (!this.sidebar) return;
    this.sidebar.addEventListener("mousedown", this.activateFunc, { once: true });
  }

  removeEventListeners() {
    if (this.cover) {
      this.cover.removeEventListener("mousedown", this.toggleFunc);
    }

    if (this.sidebar) {
      this.sidebar.removeEventListener("mousedown", this.activateFunc);
    }
  }
}


export { createSidebarToggle };
