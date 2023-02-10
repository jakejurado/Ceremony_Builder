function createToggle(style, isOn, isOff) {
  return (dom, isOpen) => {
    dom.style[style] = isOpen ? isOn : isOff;
  };
}

//DELETE UNUSED
function createCardIndexUpdater() {
  const cache = {};
  return (title, dir, currState, template) => {
    //access cached data if available.
    let stateCopy = cache.hasOwnProperty(title)
      ? cache[title]
      : new Map(currState);
    //number of cards
    const len = template[title].script.length - 1;
    //adds/subtracts from the current position
    let pos = stateCopy.get(title) + dir;
    //loops the cards when you reach the end or beginning
    pos = pos > len ? 0 : pos < 0 ? len : pos;
    //updates state
    stateCopy.set(title, pos);
    //update the cache if first time accessing this card
    if (!cache.hasOwnProperty(title)) cache[title] = new Map(stateCopy);
    //return the new display array.
    return stateCopy;
  };
}

export { createToggle, createCardIndexUpdater };
