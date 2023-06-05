  //class to toggle style and event listener to dom.
function createDomToggle(dom, func, clss) {
  this.dom = dom;
  this.func = func;
  this.clss = clss;
}

  //class to toggle style and event listener to dom.
createDomToggle.prototype.activate = function() {
  this.deactivate();
  this.dom.addEventListener("click", this.func);
  this.dom.classList.add('buttonActive');
};

  //removes style and event listener from dom
createDomToggle.prototype.deactivate = function() {
  if (!this.dom) return;
  this.dom.removeEventListener("click", this.func);
  this.dom.classList.remove('buttonActive');
};

  //toggles style and event listener depending on boolean
createDomToggle.prototype.toggle = function(bool) {
  if (bool) {
    this.activate();
  } else {
    this.deactivate();
  }
};




export {createDomToggle}