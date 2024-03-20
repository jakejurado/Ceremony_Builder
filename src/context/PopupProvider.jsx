import React, {createContext, useReducer, useCallback,} from 'react';
import { popupReducer } from '../reducers/popupReducer';

export const PopupContext = createContext(null);


export const PopupProvider = ({ children }) => {
  const [popupState, popupDispatch] = useReducer(popupReducer, {box: null, subAct: null});

  const closePopup = useCallback(() =>{
    popupDispatch();
  }, [])


  return (
    <PopupContext.Provider value={{ popupState, popupDispatch, box: popupState.box, subAct: popupState.subAct, closePopup }}>
      {children}
    </PopupContext.Provider>
  );
}