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

  constructor(sidebarClass: string, coverClass: string){
    this.sidebarClass = sidebarClass;
    this.coverClass = coverClass
    this.sidebar = undefined;
    this.cover = undefined;
    this.display = true;
    this.storage = [];
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
    this.fillDomElementsIfEmpty();

    setStyle(this.cover, "display", "block");

    this.sidebar.classList.remove('sidebar-shrink');

    setTimeout(() => {
      this.populate();
    }, this.time.partial);

    setTimeout(() => {
      this.attachListenerCover();
    }, this.time.full);

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

    setTimeout(() => {
      this.attachListenerSidebar();
    }, this.time.full);

    this.display = false;
  }

    //toggles activate and deactivating the sidebar
  toggle() {
    if (!this.sidebar || !this.cover ) this.fillDomElementsIfEmpty();

    if (this.display === false) {
      this.activate();
    } else {
      this.deactivate();
    }
  }

  fillDomElementsIfEmpty(){
    this.sidebar = document.getElementById(this.sidebarClass) as HTMLElement;
    this.cover = document.getElementById(this.coverClass) as HTMLElement;
  }

  toggleFunc = () => {
    this.toggle();
  };

  attachListenerCover() {
    if (!this.cover) return;

    this.cover.addEventListener("mousedown", this.toggleFunc, { once: true });
  }

  attachListenerSidebar() {
    if (!this.sidebar) return;

    this.sidebar.addEventListener("mousedown", this.toggleFunc, { once: true });
  }

  removeEventListeners() {
    if (this.cover) {
      this.cover.removeEventListener("mousedown", this.toggleFunc);
    }

    if (this.sidebar) {
      this.sidebar.removeEventListener("mousedown", this.toggleFunc);
    }
  }
}


export { createSidebarToggle };
