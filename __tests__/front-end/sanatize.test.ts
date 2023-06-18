import { sanatize } from "../../src/functions/wordCards/sanatize";

describe('sanatize Function', () => {
  it('should remove disallowed characters from string', () => {
    const str = 'Hello, Alice and Bob!';
    const expected = 'Hello Alice and Bob!';
    const result = sanatize(str);
    expect(result).toBe(expected);
  });

  it('should allow alphanumeric and selected special characters', () => {
    const str = 'abc123!-.()/:? ';
    const expected = 'abc123!-.()/:? ';
    const result = sanatize(str);
    expect(result).toBe(expected);
  });

  it('should remove all special characters if not allowed', () => {
    const str = '`~@#$%^&*=_+[]{};\'",<>\\|';
    const expected = '';
    const result = sanatize(str);
    expect(result).toBe(expected);
  });

  it('should handle empty string', () => {
    const str = '';
    const expected = '';
    const result = sanatize(str);
    expect(result).toBe(expected);
  });
});
