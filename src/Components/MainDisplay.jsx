import React, { Component } from 'react';
import WordCards from './WordCards';
import Sections from './Sections';
import wording from '../db-words'


class MainDisplay extends Component{
  constructor(props){
    super(props); 
    this.state = {
        other: 'hi',
        load: [['giving_away', '00'], ['opening_remarksC', '00'], ['declaration_of_intent', '00'], ['vows', '00'], ['pronouncement', '00']],
    }; 
    this.updateCardIndex = this.updateCardIndex.bind(this);
    //this.updateCardIndex.bind(this)
  }
  
  //INPUT: name of section to update 'string' & newIndex "string"
  //OUTPUT: updated state
  //receives the section name and the new index to update state
  updateCardIndex(varName, newIndex){
    const oldLoad = [...this.state.load];
    let findI = oldLoad.findIndex(el=>{  //find where in the index is varName
      return el[0] === varName;
    })
    oldLoad[findI][1] = newIndex;
    this.setState({...this.state, load: oldLoad})
  }

  render(){
    let loadSections = [];
    this.state.load.forEach((item, index) => {
      console.log(wording[item[0]].title)
        loadSections.push(
        <Sections 
          key={item[0]} 
          id={item[0]} 
          title={ wording[item[0]].title} 
          cardContent={ wording[item[0]].words} 
          description={ wording[item[0]].description} 
          varName={item[0]}
          cardIndex={[item[1]]} 
          updateCardIndex = {this.updateCardIndex}
        /> );
    })
    return(
      <div> 
        {loadSections}
      </div>
    )
  }
}


export default MainDisplay