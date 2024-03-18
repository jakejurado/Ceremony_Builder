import React, {useContext} from 'react';
import { PopupContext } from '../context/PopupProvider';


export const usePopup = () => {
  const context = useContext(PopupContext);
  if (!context) {
    throw new Error('usePopup must be used within a PopupContext');
  }

  return context
}