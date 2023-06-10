import { fetchCall } from "./api"

  //check if there is a cookie for auto signin.
async function checkCookieForAccess(setCurrUser){
  const cookie = await fetchCall.get('access')
  if(cookie.authorized) setCurrUser(cookie.userId)
}

export {checkCookieForAccess}