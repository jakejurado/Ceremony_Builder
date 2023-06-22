

import { determineTemplateTitle} from "../../src/functions/template/determineTemplateTitle"
import { Templates } from '../../src/types/types';

describe('determineTemplateTitle Function', () => {

  it('should return "myTemplate" when state is an empty object', () => {
    const state: Templates = {};
    const expected: string = 'myTemplate';
    const result: string = determineTemplateTitle(state);
    expect(result).toBe(expected);
  });

  it('should return "myTemplate1" when state has "myTemplate" as a property', () => {
    const state: Templates = { myTemplate: { order: [] }};
    const expected: string = 'myTemplate1';
    const result: string = determineTemplateTitle(state);
    expect(result).toBe(expected);
  });

  it('should return "myTemplate2" when state has "myTemplate" and "myTemplate1" as properties', () => {
    const state: Templates = { 
      myTemplate: { order: [] },
      myTemplate1: { order: [] }
    };
    const expected: string = 'myTemplate2';
    const result: string = determineTemplateTitle(state);
    expect(result).toBe(expected);
  });

  it('should return "myTemplate3" when state has "myTemplate", "myTemplate1" and "myTemplate2" as properties', () => {
    const state: Templates = { 
      myTemplate: { order: [] },
      myTemplate1: { order: [] },
      myTemplate2: { order: [] }
    };
    const expected: string = 'myTemplate3';
    const result: string = determineTemplateTitle(state);
    expect(result).toBe(expected);
  });
});
