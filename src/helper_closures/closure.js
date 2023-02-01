function createToggle(style, isOn, isOff) {
  return (dom, isOpen) => {
    dom.style[style] = isOpen ? isOn : isOff;
  };
}

export { createToggle };
