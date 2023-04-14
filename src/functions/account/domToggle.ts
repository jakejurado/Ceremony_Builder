

function createDomToggle(dom: HTMLElement, func: Function, clss: string){
  this.dom = dom;
  this.func = func;
  this.clss = clss;
}

createDomToggle.prototype.activate = function(): void{
  //adds event listener
  this.dom.addEventListener("click", this.func);
  //adds style
  this.dom.classList.add('buttonActive')
}

createDomToggle.prototype.deactivate = function(): void{
  //removes event listener
  this.dom.removeEventListener("click", this.func);
  //removes style
  this.dom.classList.remove('buttonActive')
}

export {createDomToggle}