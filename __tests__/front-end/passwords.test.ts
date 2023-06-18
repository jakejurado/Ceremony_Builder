import {validateEmail, passwordCriteria, checkSubmitButtonCriteria, passwordMatch, passwordLength} from '../../src/functions/account/password';


describe('Password validation tests', () => {

  it('should validate if an email is correctly formatted', () => {
    expect(validateEmail('login@me.com')).toBeTruthy();
    expect(validateEmail('login@me')).toBeTruthy();
    expect(validateEmail('login')).toBeFalsy();
    expect(validateEmail('login@')).toBeFalsy();
  })

  it('should validate if a password length is greater than 5', () => {
    expect(passwordLength('123456')).toBeTruthy();
    expect(passwordLength('12345')).toBeFalsy();
    expect(passwordLength('1234')).toBeFalsy();
    expect(passwordLength('123')).toBeFalsy();
    expect(passwordLength('12')).toBeFalsy();
  })

  it('should validate if two passwords match', () => {
    expect(passwordMatch('12345', '12345')).toBeTruthy();
    expect(passwordMatch('1234', '12345')).toBeFalsy();
    expect(passwordMatch('1', '1')).toBeTruthy();
  })

  it('should validate if a password length is greater than 5 and passwords match', () => {
    expect(passwordCriteria('12345', '12345')).toBeFalsy();
    expect(passwordCriteria('12345', '12346')).toBeFalsy();
    expect(passwordCriteria('1', '1')).toBeFalsy();
    expect(passwordCriteria('123456', '123456')).toBeTruthy();
  })

  it('should validate the signup criteria', () => {
    const validUserInfo = {title: 'signup', email: 'j@j.com', passCurr: undefined, passNew1: '123456', passNew2: '123456', code: undefined};
    const invalidEmailUserInfo = {title: 'signup', email: 'j@', passCurr: undefined, passNew1: '123456', passNew2: '123456', code: undefined};
    const nonMatchingPasswordsUserInfo = {title: 'signup', email: 'j@me.com', passCurr: undefined, passNew1: '1234566', passNew2: '123456', code: undefined};

    expect(checkSubmitButtonCriteria(validUserInfo)).toBeTruthy();
    expect(checkSubmitButtonCriteria(invalidEmailUserInfo)).toBeFalsy();
    expect(checkSubmitButtonCriteria(nonMatchingPasswordsUserInfo)).toBeFalsy();
  })

})