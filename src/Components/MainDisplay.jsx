import React, { Component } from 'react';
import WordCards from './WordCards';
import Sections from './Sections';
import wording from '../db-words'


class MainDisplay extends Component{
  constructor(props){
    super(props); 
    this.state = {
        load: ['giving_away', 'opening_remarksC', 'declaration_of_intent', 'vows', 'pronouncement'],
    }; 
        //this.changePlayer = this.changePlayer.bind(this); 
      }
     
      //method to update whice symbol is in state.text
    //   changePlayer(){this.state.text === 'X' ? this.setState({text: 'O' }) : this.setState({text: 'X'}); }

  render(){
    let loadSections = [];
    this.state.load.forEach((item, index) => {
        loadSections.push(<Sections key={item} id={item} title={ wording[item].title} words={ wording[item].words} description={ wording[item].description} called={item}/> );
    })

    return(
      <div> 
        {loadSections}
      </div>
    )
  }
}


export default MainDisplay