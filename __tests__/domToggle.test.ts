// Import the createDomToggle class
import { createDomToggle } from '../src/functions/account/domToggle'

// Example test case
describe('createDomToggle', () => {
  let domToggle;

  beforeEach(() => {
    // Create a mock DOM element and function
    const mockDom = document.createElement('button');
    const mockFunc = jest.fn();
    const mockClass = 'buttonClass';

    // Create a new instance of createDomToggle
    domToggle = new createDomToggle(mockDom, mockFunc, mockClass);
  });

  afterEach(() => {
    // Clean up the event listener and reset mock function
    domToggle.deactivate();
    domToggle.func.mockClear();
  });

  it('should activate the event listener and add class when activate() is called', () => {
    // Call the activate method
    domToggle.activate();

    // Check if the event listener is added
    expect(domToggle.dom.addEventListener).toHaveBeenCalledTimes(1);
    expect(domToggle.dom.addEventListener).toHaveBeenCalledWith('click', domToggle.func);

    // Check if the class is added
    expect(domToggle.dom.classList.contains('buttonActive')).toBe(true);
  });

  it('should deactivate the event listener and remove class when deactivate() is called', () => {
    // Call the activate method
    domToggle.activate();

    // Call the deactivate method
    domToggle.deactivate();

    // Check if the event listener is removed
    expect(domToggle.dom.removeEventListener).toHaveBeenCalledTimes(1);
    expect(domToggle.dom.removeEventListener).toHaveBeenCalledWith('click', domToggle.func);

    // Check if the class is removed
    expect(domToggle.dom.classList.contains('buttonActive')).toBe(false);
  });

  it('should activate or deactivate based on the provided boolean value when toggle() is called', () => {
    // Call toggle with true
    domToggle.toggle(true);

    // Check if the event listener is added
    expect(domToggle.dom.addEventListener).toHaveBeenCalledTimes(1);
    expect(domToggle.dom.addEventListener).toHaveBeenCalledWith('click', domToggle.func);

    // Check if the class is added
    expect(domToggle.dom.classList.contains('buttonActive')).toBe(true);

    // Reset the event listener and class
    domToggle.deactivate();
    domToggle.dom.classList.remove('buttonActive');

    // Call toggle with false
    domToggle.toggle(false);

    // Check if the event listener is removed
    expect(domToggle.dom.removeEventListener).toHaveBeenCalledTimes(1);
    expect(domToggle.dom.removeEventListener).toHaveBeenCalledWith('click', domToggle.func);

    // Check if the class is removed
    expect(domToggle.dom.classList.contains('buttonActive')).toBe(false);
  });
});
