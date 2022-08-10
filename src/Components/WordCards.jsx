import React from 'react';

function WordCards(props){
  return(
    <div className={`cards ${props.class}`}>
      {props.cardContent}
    </div>
  )
}


export default WordCards