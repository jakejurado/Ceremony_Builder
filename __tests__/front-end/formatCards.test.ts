import {formatCards} from "../../src/functions/wordCards/formatCards";
import { PersonState } from '../../src/types/types';

describe('formatCards Function', () => {
  const personObj: PersonState = {
    person1: 'ALICE',
    person2: 'BOB'
  }

  it('should remove all HTML tags and replace names with placeholders', () => {
    const str = '<p>Hello ALICE and BOB!<br>How are you today?<br></p>';
    const expected = 'Hello PERSON_1 and PERSON_2!\nHow are you today?\n';
    const result = formatCards(str, personObj);
    expect(result).toBe(expected);
  });

  it('should convert consecutive <p> tags to a single newline', () => {
    const str = '<p>Hello ALICE</p><p>Hello BOB</p>';
    const expected = 'Hello PERSON_1\nHello PERSON_2';
    const result = formatCards(str, personObj);
    expect(result).toBe(expected);
  });

  it('should handle empty input strings', () => {
    const str = '';
    const expected = '';
    const result = formatCards(str, personObj);
    expect(result).toBe(expected);
  });

  it('should return string as is if no names or tags are present', () => {
    const str = 'This is a test string';
    const expected = 'This is a test string';
    const result = formatCards(str, personObj);
    expect(result).toBe(expected);
  });
});
