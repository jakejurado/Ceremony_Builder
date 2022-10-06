import React, { Component } from 'react';
import wording from '../db-words';

class CeremonyImport extends Component{
  constructor(props){
    super(props);
    this.handleLoadSavedBtn = this.handleLoadSavedBtn.bind(this);
    this.handleSavedBtn = this.handleSavedBtn.bind(this);
  }
  
  handleLoadSavedBtn(varName, newIndex){
    let result = []
    fetch('http://localhost:3000/save', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        }
      }).then( data => {
        result.push(data);
      })

      console.log({result})
      console.log(typeof result)
    const loadArr = [...wording.saved.ceremonies];
    //console.log({loadArr})
    this.props.handleSavedFetch(loadArr); 
  }

  handleSavedBtn(event){
    console.log('ready to load the page')
    const index = parseInt(event.target.innerText.split(" ")[1]);
    this.props.updateCurrentScriptFromSaved(index);
  }


  render(){
    let loadSavedArr = [];
    const currSaved = this.props.savedCeremonies
    if(currSaved.length){
      currSaved.forEach((el, index)=>{
        loadSavedArr.push(
          <li key={`load-${index}`} called={`hi{index}`}><button onClick={this.handleSavedBtn}>Ceremony {index}</button></li>
        )
      })
    }


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