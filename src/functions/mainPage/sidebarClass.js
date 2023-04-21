import { setStyle } from "./styleFuncs";

function createSidebarToggle(){
  this.sidebar = undefined
  this.sidebarButton = undefined;
  this.cover = undefined;

  this.display = true;
  this.storage = [];
  this.time = {
    full: 1500, 
    partial: 1000, 
    interval: 100
  };
}

//displays sidebar content one at a time
createSidebarToggle.prototype.populate = function(){
  this.storage.push(...Object.values(this.sidebar.children));
  const intervalId = setInterval(() => {
    const curr = this.storage.shift();
    setStyle(curr, "display", "flex");
    if (!this.storage.length) clearInterval(intervalId);
  }, this.time.interval);
}

//remove sidebar content one at a time
createSidebarToggle.prototype.depopulate = function(){
  this.storage.push(...Object.values(this.sidebar.children));
  const intervalId = setInterval(() =>{
    const curr = this.storage.pop();
    setStyle(curr, "display", "none");
    if(!this.storage.length){
      clearInterval(intervalId);
    }
  }, this.time.interval);
}
  
//opens the sidebar
createSidebarToggle.prototype.activate = function(){
  if(!this.sidebar) this.sidebar = document.getElementById('sidebar');

  //make sidebarButton dissapear.
  setStyle(this.sidebarButton, "display", "none");

  //main page opacity decrease
  setStyle(cover, "display", "block");

  //open the sidebar
  setStyle(sideBar, "width", "30%");

  //populate sidebar with content
  setTimeout(()=>{
    this.populate();
  }, this.time.partial);

  //add event listener to close the sidebar.
  setTimeout(() =>{
    this.cover.addEventListener("mousedown", () =>{
      this.toggle();
    }, {once: true});
  }, this.time.full)

  this.display = true;
}

//closes the sidebar
createSidebarToggle.prototype.deactivate = function(){
  // close the sidebar
  setStyle(this.sidebar, 'width', 0);
  
  //show the button
  setTimeout(() => {
    setStyle(sidebarButton, "display", "flex");
  }, this.time.full);

  //main page opacity back to normal
  setStyle(cover, 'display', 'none');

  //remove sidebar content one at a time
  this.depopulate();

  this.display = false
}

createSidebarToggle.prototype.toggle = function(){
  if(!this.sidebar) this.sidebar = document.getElementById('sideBar');
  if(!this.sidebarButton) this.sidebarButton = document.getElementById('sidebarButton');
  if(!this.cover) this.cover = document.getElementById('cover')

  if(this.display === false){
    this.activate();
  }
  else {
    this.deactivate();
  }
}

createSidebarToggle.prototype.attachListener = function(){
  this.cover.addEventListener(
    "mousedown", () => {
      this.toggle();
    },
    {
      once: true,
    }
  );
}



export {createSidebarToggle}


