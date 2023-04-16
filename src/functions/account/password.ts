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
  pass1: string | undefined,
  pass2: string | undefined,
  code1: string | undefined,

}

function checkSubmitButtonCriteria(userInfo: userInfoType): boolean{
  let validEmail: boolean = validateEmail(userInfo.email)
  let validPassword: boolean = passwordCriteria(userInfo.pass1, userInfo.pass2)
  let validCode: boolean = userInfo.code1 ? true: false;
  
  let res = false;
  switch(userInfo.title){
    case 'signup':
      if(validEmail && validPassword) res = true;
      break;
    case 'login':
      if(validEmail && userInfo.pass1) res = true;
      break;
    case 'forgot':
      if(validEmail) res = true;
      break;
    case 'verify':
      if(validEmail && validPassword && validCode) res = true;
      break;
    default:
      console.log('error in checkSubmitButtonCriteria');
  }

  return res;
}

export {validateEmail, passwordCriteria, checkSubmitButtonCriteria, passwordMatch, passwordLength}