import emailAddresses from "email-addresses";


//takes an email and returns a boolean
function validateEmail(emailString: string | undefined): boolean{
  if(!emailString) return false
  if(emailAddresses({simple: true, input: emailString})) return true;
  else return false;
}

//used when signing up.  Makes sure password is long enough and that they entered same password twice.
function passwordCriteria(pass1: string | undefined, pass2: string | undefined): boolean{
  if(!pass1 || !pass2) return false;
  const samePass: boolean = pass1 === pass2
  const passLengh: boolean = pass1?.length > 5 ? true : false;
  return samePass && passLengh
}

function passwordLength(pass1: string | undefined): boolean {
  return pass1.length > 5 ? true : false;
}

function passwordMatch(pass1: string | undefined, pass2: string | undefined): boolean {
  return pass1 === pass2
}

interface userInfoType {
  title: string,
  email: string,
  passCurr: string | undefined,
  passNew1: string | undefined,
  passNew2: string | undefined
  code: string | undefined,



}

function checkSubmitButtonCriteria(userInfo: userInfoType): boolean{
  let validEmail: boolean = validateEmail(userInfo.email)
  let validNewPassword: boolean = passwordCriteria(userInfo.passNew1, userInfo.passNew2)
  let validCurrPassword: boolean = passwordCriteria(userInfo.passCurr, userInfo.passCurr)
  let validCode: boolean = userInfo.code ? true: false;
  let validPasswordLength: boolean = parseInt(userInfo.passCurr) > 4;

  let res = false;
  switch(userInfo.title){
    case 'signup':
      if(validEmail && validNewPassword) res = true;
      break;
    case 'login':
      console.log(validEmail, userInfo.passCurr.length > 4)
      if(validEmail && userInfo.passCurr.length > 4) res = true;
      break;
    case 'forgot':
      if(validEmail) res = true;
      break;
    case 'verify':
      if(validEmail && validNewPassword && validCode) res = true;
      break;
    case 'reset':
      console.log(validEmail && validCurrPassword && validCode)
      if(validEmail && validCurrPassword && validNewPassword) res = true;
      break;
    case 'delete':
      if(validEmail && validCurrPassword) res = true
      break;
    case 'signout':
      res = true;
      break;
    default:
      console.log('error in checkSubmitButtonCriteria');
  }
  
  console.log({res})
  return res;
}

export {validateEmail, passwordCriteria, checkSubmitButtonCriteria, passwordMatch, passwordLength}