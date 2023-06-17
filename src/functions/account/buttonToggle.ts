
export class createButtonToggle {
  dom: HTMLElement | undefined;
  func: () => void | undefined;
  clss: string;

  constructor(dom: HTMLElement | undefined, func: () => void | undefined, clss: string) {
    this.dom = dom;
    this.func = func;
    this.clss = clss;
  }

  activate() {
    this.deactivate();
    if(this.dom && this.func){
      this.dom.addEventListener("click", this.func);
      this.dom.classList.add(this.clss);
    }
  }

  deactivate() {
    if (this.dom && this.func) {
      this.dom.removeEventListener("click", this.func);
      this.dom.classList.remove(this.clss);
    }
  }

  toggle(bool: boolean) {
    if (bool) {
      this.activate();
    } else {
      this.deactivate();
    }
  }
}



//class to toggle style and event listener to dom.
// function createButtonToggle(dom : HTMLElement | undefined, func: () => void | undefined, clss: string) {
//   this.dom = dom;
//   this.func = func;
//   this.clss = clss;
// }

//   //class to toggle style and event listener to dom.
// createButtonToggle.prototype.activate = function() {
//   this.deactivate();
//   this.dom.addEventListener("click", this.func);
//   this.dom.classList.add('buttonActive');
// };

//   //removes style and event listener from dom
// createButtonToggle.prototype.deactivate = function() {
//   if (!this.dom) return;
//   this.dom.removeEventListener("click", this.func);
//   this.dom.classList.remove('buttonActive');
// };

//   //toggles style and event listener depending on boolean
// createButtonToggle.prototype.toggle = function(bool) {
//   if (bool) {
//     this.activate();
//   } else {
//     this.deactivate();
//   }
// };




// export {createButtonToggle}