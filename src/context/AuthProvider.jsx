import React, { createContext, useState } from 'react';

export const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
  const [currUser, setCurrUser] = useState(null);
  
  return (
    <AuthContext.Provider value={{currUser, setCurrUser}}>
      {children}
    </AuthContext.Provider>
  );
}
