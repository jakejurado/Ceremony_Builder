// Import the function to be tested
import { createSidebarToggle } from "../src/functions/mainPage/sidebarClass"
import {setStyle} from "../src/functions/mainPage/styleFuncs"

jest.mock("../src/functions/mainPage/styleFuncs", () => ({
  setStyle: jest.fn(),
}));

describe("createSidebarToggle", () => {
  let sidebarToggle;

  beforeEach(() => {
    document.body.innerHTML = `
      <div id="sidebar">
        <div class="sidebar-item">Item 1</div>
        <div class="sidebar-item">Item 2</div>
        <div class="sidebar-item">Item 3</div>
      </div>
      <button id="sidebarButton">Toggle Sidebar</button>
      <div id="cover"></div>
    `;

    sidebarToggle = new createSidebarToggle();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("populate should set display style to flex for each sidebar item", () => {
    sidebarToggle.populate();

    expect(setStyle).toHaveBeenCalledTimes(3);
    expect(setStyle).toHaveBeenCalledWith(
      expect.any(HTMLDivElement),
      "display",
      "flex"
    );
  });

  test("depopulate should set display style to none for each sidebar item", () => {
    sidebarToggle.depopulate();

    expect(setStyle).toHaveBeenCalledTimes(3);
    expect(setStyle).toHaveBeenCalledWith(
      expect.any(HTMLDivElement),
      "display",
      "none"
    );
  });

  test("activate should update styles and attach event listener", () => {
    sidebarToggle.activate();

    expect(setStyle).toHaveBeenCalledWith(
      expect.any(HTMLDivElement),
      "display",
      "block"
    );
    expect(setStyle).toHaveBeenCalledWith(
      expect.any(HTMLDivElement),
      "width",
      "30%"
    );
    expect(setStyle).toHaveBeenCalledWith(
      expect.any(HTMLDivElement),
      "display",
      "flex"
    );

    expect(sidebarToggle.cover.addEventListener).toHaveBeenCalledTimes(1);
    expect(sidebarToggle.cover.addEventListener).toHaveBeenCalledWith(
      "mousedown",
      expect.any(Function),
      { once: true }
    );
  });

  test("deactivate should update styles and attach event listener", () => {
    sidebarToggle.deactivate();

    expect(setStyle).toHaveBeenCalledWith(
      expect.any(HTMLDivElement),
      "width",
      0
    );
    expect(setStyle).toHaveBeenCalledWith(
      expect.any(HTMLDivElement),
      "display",
      "none"
    );

    expect(setStyle).toHaveBeenCalledWith(
      expect.any(HTMLDivElement),
      "display",
      "flex"
    );

    expect(sidebarToggle.sidebar.addEventListener).toHaveBeenCalledTimes(1);
    expect(sidebarToggle.sidebar.addEventListener).toHaveBeenCalledWith(
      "mousedown",
      expect.any(Function),
      { once: true }
    );
  });

  test("toggle should activate sidebar when display is false", () => {
    sidebarToggle.display = false;
    sidebarToggle.activate();

    expect(setStyle).toHaveBeenCalledWith(
      expect.any(HTMLDivElement),
      "display",
      "block"
    );
    expect(setStyle).toHaveBeenCalledWith(
      expect.any(HTMLDivElement),
      "width",
      "30%"
    );
    expect(setStyle).toHaveBeenCalledWith(
      expect.any(HTMLDivElement),
      "display",
      "flex"
    );
  });

  test("toggle should deactivate sidebar when display is true", () => {
    sidebarToggle.display = true;
    sidebarToggle.deactivate();

    expect(setStyle).toHaveBeenCalledWith(
      expect.any(HTMLDivElement),
      "width",
      0
    );
    expect(setStyle).toHaveBeenCalledWith(
      expect.any(HTMLDivElement),
      "display",
      "none"
    );
  });
});


