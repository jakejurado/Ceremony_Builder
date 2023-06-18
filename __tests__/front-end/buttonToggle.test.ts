// Import the createButtonToggle class
import { createButtonToggle } from '../../src/functions/account/buttonToggle'

describe('createButtonToggle', () => {
  let dom: HTMLElement;
  let func: jest.Mock;
  let buttonToggle: createButtonToggle 

  beforeEach(() => {
    // Mock DOM element
    dom = document.createElement('div');
    // Mock function
    func = jest.fn();
    // Instantiate createButtonToggle
    buttonToggle = new createButtonToggle(dom, func, 'buttonActive');
  });

  test('activate', () => {
    buttonToggle.activate();
    expect(dom.classList.contains('buttonActive')).toBe(true);

    // Simulate a click event
    dom.click();
    // Check if the click event handler was called
    expect(func).toHaveBeenCalled();
  });

  test('deactivate', () => {
    buttonToggle.activate();
    buttonToggle.deactivate();
    expect(dom.classList.contains('buttonActive')).toBe(false);

    // Simulate a click event
    dom.click();
    // Check if the click event handler was not called
    expect(func).not.toHaveBeenCalled();
  });

  test('toggle', () => {
    buttonToggle.toggle(true);
    expect(dom.classList.contains('buttonActive')).toBe(true);

    buttonToggle.toggle(false);
    expect(dom.classList.contains('buttonActive')).toBe(false);
  });
});
