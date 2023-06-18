import { nameValidator } from "../../src/functions/template/nameTemplate";
import { Templates } from '../../src/types/types';


describe('nameValidator Function', () => {
  it('should return "name" when allNames is an empty array', () => {
    const allNames: Array<string> = [];
    const newName: string = 'name';
    const expected: string = 'name';
    const result: string = nameValidator(allNames, newName);
    expect(result).toBe(expected);
  });

  it('should return "name" when allNames does not include "name"', () => {
    const allNames: Array<string> = ['different', 'test'];
    const newName: string = 'name';
    const expected: string = 'name';
    const result: string = nameValidator(allNames, newName);
    expect(result).toBe(expected);
  });

  it('should return "name2" when allNames includes "name" once', () => {
    const allNames: Array<string> = ['name'];
    const newName: string = 'name';
    const expected: string = 'name2';
    const result: string = nameValidator(allNames, newName);
    expect(result).toBe(expected);
  });

  it('should return "name3" when allNames includes "name" twice', () => {
    const allNames: Array<string> = ['name', 'name2'];
    const newName: string = 'name';
    const expected: string = 'name3';
    const result: string = nameValidator(allNames, newName);
    expect(result).toBe(expected);
  });
});
