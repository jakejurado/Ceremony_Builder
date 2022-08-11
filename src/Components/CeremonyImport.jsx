import React, { Component } from 'react';
import wording from '../db-words';

class CeremonyImport extends Component{
  constructor(props){
    super(props);
    this.handleLoadSavedBtn = this.handleLoadSavedBtn.bind(this);
    this.handleSavedBtn = this.handleSavedBtn.bind(this);
  }
  
  handleLoadSavedBtn(varName, newIndex){
    const loadArr = [...wording.saved.ceremonies];
    this.props.handleSavedFetch(loadArr); 
  }

  handleSavedBtn(event){
    console.log('ready to load the page')
    const index = parseInt(event.target.innerText.split(" ")[1]);
    this.props.updateCurrentScriptFromSaved(index);
  }

    
  
  render(){
    let loadSavedArr = [];
    this.props.savedCeremonies.forEach((el, index)=>{
      loadSavedArr.push(
        <li key={`load-${index}`} called={`hi{index}`}><button onClick={this.handleSavedBtn}>Ceremony {index}</button></li>
      )
    });


    return(
      <div className='importCeremonies'>
        <button onClick={this.handleLoadSavedBtn}>
            saved scripts
        </button>
        <ul>
          {loadSavedArr}
        </ul>
      </div>
    )
  }
}

export default CeremonyImport