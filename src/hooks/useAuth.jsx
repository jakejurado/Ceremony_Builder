import { useContext } from 'react';
import { AuthContext } from '../context/AuthProvider';

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }

  return context
}


