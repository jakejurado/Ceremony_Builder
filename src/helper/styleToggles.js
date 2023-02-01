import { createToggle } from "../helper_closures/closure";

const toggleDisplay = createToggle("display", "block", "none");
const toggleOpacity = createToggle("opacity", 1, 0);
const toggleOpacityPartial = createToggle("opacity", 1, 0.25);
const toggleWidth = createToggle("width", "30%", "0px");

export { toggleDisplay, toggleOpacity, toggleOpacityPartial, toggleWidth };
