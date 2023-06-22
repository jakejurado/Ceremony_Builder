import { removeNames } from "../../src/functions/wordCards/removeNames"

describe('removeNames Function', () => {
  it('should replace person1 and person2 with placeholders', () => {
    const content = 'Hello Alice and Bob!';
    const person1 = 'Alice';
    const person2 = 'Bob';
    const expected = 'Hello PERSON_1 and PERSON_2!';
    const result = removeNames(content, person1, person2);
    expect(result).toBe(expected);
  });

  it('should replace person1 and person2 with placeholders (case insensitive)', () => {
    const content = 'Hello ALICE and BOB!';
    const person1 = 'ALICE';
    const person2 = 'BOB';
    const expected = 'Hello PERSON_1 and PERSON_2!';
    const result = removeNames(content, person1, person2);
    expect(result).toBe(expected);
  });

  it('should return content as is if names are not present', () => {
    const content = 'Hello there!';
    const person1 = 'Alice';
    const person2 = 'Bob';
    const expected = 'Hello there!';
    const result = removeNames(content, person1, person2);
    expect(result).toBe(expected);
  });

  it('should handle multiple replacements', () => {
    const content = 'Alice and Bob went to the park. Alice and Bob had fun.';
    const person1 = 'Alice';
    const person2 = 'Bob';
    const expected = 'PERSON_1 and PERSON_2 went to the park. PERSON_1 and PERSON_2 had fun.';
    const result = removeNames(content, person1, person2);
    expect(result).toBe(expected);
  });
});