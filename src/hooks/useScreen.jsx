import React, {useContext} from 'react';
import { ScreenContext } from "../context/ScreenProvider";

export const useScreen = () => {
  const context = useContext(ScreenContext);
  if (!context) {
    throw new Error('useScreen must be used within a ScreenProvider');
  }

  return context
}