import emailAddresses from "email-addresses";

function validateEmail(emailString: string): boolean{
  if(emailAddresses({simple: true, input: emailString})) return true;
  else return false;
}

function passwordCriteria(pass1: string, pass2: string): boolean{
  const samePass: boolean = pass1 === pass2
  const passLengh: boolean = pass1?.length > 5 ? true : false;
  return samePass && passLengh
}

export {validateEmail, passwordCriteria}