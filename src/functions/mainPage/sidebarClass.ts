import { setStyle } from "./styleFuncs";

interface SidebarToggleTime {
  full: number;
  partial: number;
  interval: number;
}

class createSidebarToggle {
  sidebar: HTMLElement | undefined;
  cover: HTMLElement | undefined;
  display: boolean;
  storage: HTMLElement[];
  time: SidebarToggleTime;

  constructor(sidebar: HTMLElement | undefined, cover: HTMLElement | undefined){
    this.sidebar = sidebar;
    this.cover = cover;
    this.display = true;
    this.storage = [];
    this.time =  {
      full: 1500,
      partial: 1000,
      interval: 100,
    };
  }

  populate() {
    if (!this.sidebar) return;

    this.storage.push(...Array.from(this.sidebar.children) as HTMLElement[]);
    const intervalId = setInterval(() => {
      const curr = this.storage.shift();
      if (curr) setStyle(curr, "display", "flex");
      if (!this.storage.length) clearInterval(intervalId);
    }, this.time.interval);
  }

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

  activate() {
    if (!this.sidebar) this.sidebar = document.getElementById("sidebar") as HTMLElement;
    if (!this.cover) this.cover = document.getElementById("cover") as HTMLElement;

    setStyle(this.cover, "display", "block");

    setStyle(this.sidebar, "width", "30%");

    setTimeout(() => {
      this.populate();
    }, this.time.partial);

    setTimeout(() => {
      this.cover?.addEventListener("mousedown", () => {
        this.toggle();
      }, { once: true });
    }, this.time.full);

    this.display = true;
  }

  deactivate() {
    if (!this.sidebar) return;

    setStyle(this.sidebar, "width", "0");

    setTimeout(() => {
      // setStyle(this.sidebarButton, "display", "flex");
    }, this.time.full);

    if (!this.cover) return;

    setStyle(this.cover, "display", "none");

    this.depopulate();

    setTimeout(() => {
      this.attachListenerSidebar();
    }, this.time.full);

    this.display = false;
  }

  toggle() {
    if (!this.sidebar) this.sidebar = document.getElementById("sideBar") as HTMLElement;
    if (!this.cover) this.cover = document.getElementById("cover") as HTMLElement;

    if (this.display === false) {
      this.activate();
    } else {
      this.deactivate();
    }
  }

  attachListener() {
    if (!this.cover) return;

    this.cover.addEventListener(
      "mousedown",
      () => {
        this.toggle();
      },
      {
        once: true,
      }
    );
  }

  attachListenerSidebar() {
    if (!this.sidebar) return;

    this.sidebar.addEventListener(
      "mousedown",
      () => {
        this.toggle();
      },
      {
        once: true,
      }
    );
  }
}

export { createSidebarToggle };
