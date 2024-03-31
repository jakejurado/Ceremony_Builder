import React from 'react';
import close from "../../../public/assets/close.png"

function ButtonClose({classNames, clickFunc}){

  return(
    <div className={`cButton ${classNames}`}>
      <img className={`cButtonImg ${classNames}`} src={close} alt='close button image' onClick={clickFunc}/>
    </div>
  )
}

export default ButtonClose;