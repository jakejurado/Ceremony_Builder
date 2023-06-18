import {addSelectorSection} from "../../src/functions/sections/selectorSec";
import {selectorSec} from "../../src/types/types"

describe('addSelectorSection Function', () => {

  it('should return a visible selector section with correct position from string number', () => {
    const position: string = '5';
    const expected: selectorSec = { isVisible: true, position: 5 };
    const result: selectorSec = addSelectorSection(position);
    expect(result).toEqual(expected);
  });

  it('should return a visible selector section with correct position from string number with leading zeroes', () => {
    const position: string = '0007';
    const expected: selectorSec = { isVisible: true, position: 7 };
    const result: selectorSec = addSelectorSection(position);
    expect(result).toEqual(expected);
  });
});
