import React, { createContext, useState, useEffect } from 'react';
import { fetchCall } from '../functions/fetches/api';

export const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
  const [currUser, setCurrUser] = useState(null);

  useEffect(() => {
    if(!currUser){
      fetchCall.get('signout');
    }
  }, [currUser]);
  
  return (
    <AuthContext.Provider value={{currUser, setCurrUser}}>
      {children}
    </AuthContext.Provider>
  );
}
