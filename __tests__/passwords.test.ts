import { password } from 'pg/lib/defaults';
import emailAddresses from "email-addresses";
import {validateEmail, passwordCriteria, checkSubmitButtonCriteria, passwordMatch, passwordLength} from '../src/functions/account/password';

describe('passwords test', () =>{

  xit('validates email', ()=> {
    const checkEmail = validateEmail('login@me.com')
    const checkEmail2 = validateEmail('login@me')
    const checkEmail3 = validateEmail('login')
    const checkEmail4 = validateEmail('login@')

    expect(checkEmail).toBe(true);
    expect(checkEmail2).toBe(true);
    expect(checkEmail3).toBe(false);
    expect(checkEmail4).toBe(false);
  })

  it('validates password length if larger than 5', () => {
    const passwordLengh = passwordLength('123456');
    const passwordLength2 = passwordLength('12345');
    const passwordLength3 = passwordLength('1234');
    const passwordLength4 = passwordLength('123');
    const passwordLength5 = passwordLength('12');

    expect(passwordLengh).toBe(true);
    expect(passwordLength2).toBe(false);
    expect(passwordLength3).toBe(false);
    expect(passwordLength4).toBe(false);
    expect(passwordLength5).toBe(false);

  })

  it('validates passwords that match', () => {
    const checkMatch = passwordMatch('12345', '12345');
    const checkMatch1 = passwordMatch('1234', '12345');
    const checkMatch2 = passwordMatch('1', '1')

    expect(checkMatch).toBe(true);
    expect(checkMatch1).toBe(false);
    expect(checkMatch2).toBe(true)

  })
  it('validates password length & Match', ()=> {
    const checkPassword2 = passwordCriteria('12345', '12345');
    const checkPassword3 = passwordCriteria('12345', '12346');
    const checkPassword4 = passwordCriteria('1', '1')
    const checkPassword5 = passwordCriteria('123456', '123456')

    expect(checkPassword2).toBe(false);
    expect(checkPassword3).toBe(false);
    expect(checkPassword4).toBe(false);
    expect(checkPassword5).toBe(true);

  })

  it('validates signup case', () => {
    const userInfo = 
      {
        title: 'signup',
        email: 'j@j.com',
        passCurr: undefined,
        passNew1: '123456',
        passNew2: '123456',
        code: undefined
      }

      const userInfo2 = 
      {
        title: 'signup',
        email: 'j@',
        passCurr: undefined,
        passNew1: '123456',
        passNew2: '123456',
        code: undefined
      }

      const userInfo3 = 
      {
        title: 'signup',
        email: 'j@me.com',
        passCurr: undefined,
        passNew1: '1234566',
        passNew2: '123456',
        code: undefined
      }

      const userInfo4 = 
      {
        title: 'signup',
        email: 'j@me.com',
        passCurr: undefined,
        passNew1: '123456',
        passNew2: '1234567',
        code: undefined
      }
      const signup = checkSubmitButtonCriteria(userInfo)
      const signup2 = checkSubmitButtonCriteria(userInfo2)
      const signup3 = checkSubmitButtonCriteria(userInfo3)
      const signup4 = checkSubmitButtonCriteria(userInfo3)

      expect(signup).toBe(true);
      expect(signup2).toBe(false)
      expect(signup3).toBe(false)
      expect(signup4).toBe(false)
  })

  it('validates login case', () => {
    const userInfo = 
      {
        title: 'login',
        email: 'j@j.com',
        passCurr: '123456',
        passNew1: undefined,
        passNew2: undefined,
        code: undefined
      }

      const userInfo2 = 
      {
        title: 'login',
        email: 'j@',
        passCurr: '12345',
        passNew1: undefined,
        passNew2: undefined,
        code: undefined
      }

      const userInfo3 = 
      {
        title: 'login',
        email: 'j@me.com',
        passCurr: '1234',
        passNew1: undefined,
        passNew2: undefined,
        code: undefined
      }

      const userInfo4 = 
      {
        title: 'login',
        email: 'j@me.',
        passCurr: '123456',
        passNew1: undefined,
        passNew2: undefined,
        code: undefined
      }
      const signup = checkSubmitButtonCriteria(userInfo)
      const signup2 = checkSubmitButtonCriteria(userInfo2)
      const signup3 = checkSubmitButtonCriteria(userInfo3)
      const signup4 = checkSubmitButtonCriteria(userInfo3)

      expect(signup).toBe(true);
      expect(signup2).toBe(false)
      expect(signup3).toBe(false)
      expect(signup4).toBe(false)
  })

  xit('validates forgot case', () => {
    const userInfo = {
      title: 'login',
      email: 'j@j.com',
      passCurr: undefined,
      passNew1: '123456',
      passNew2: '123456',
      code: '1234'
    }

    const userInfo2 = {
      title: 'login',
      email: 'j@',
      passCurr: undefined,
      passNew1: '123456',
      passNew2: '12345',
      code: '1234'
    }

    const userInfo3 = {
      title: 'login',
      email: 'j@me.com',
      passCurr: undefined,
      passNew1: '12345',
      passNew2: '123456',
      code: '123'
    }

    const userInfo4 = {
      title: 'login',
      email: 'j@me.',
      passCurr: undefined,
      passNew1: '12345',
      passNew2: '12345',
      code: '1234'
    }

    const signup = checkSubmitButtonCriteria(userInfo)
    const signup2 = checkSubmitButtonCriteria(userInfo2)
    const signup3 = checkSubmitButtonCriteria(userInfo3)
    const signup4 = checkSubmitButtonCriteria(userInfo4)

    expect(signup).toBe(true);
    expect(signup2).toBe(false)
    expect(signup3).toBe(false)
    expect(signup4).toBe(false)
  })

  xit('validates verify case', () => {

  })

  xit('validates delete case', () => {

  })

  xit('validates reset case', () => {

  })

  xit('validates signup case', () => {

  })

  xit('validates logout case', () => {

  })
  
})