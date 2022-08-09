import React, { Component } from 'react';
import WordCards from './WordCards';

class Sections extends Component{
  constructor(props){
    super(props); 
        //this.changePlayer = this.changePlayer.bind(this); 
      }
     
      //method to update whice symbol is in state.text
    //   changePlayer(){this.state.text === 'X' ? this.setState({text: 'O' }) : this.setState({text: 'X'}); }

  render(){
    // let loadWordCards = [];
    // for(let item of this.props.load){
    //     loadWordCards.push(<Sections title={ wording[item].title} allWords={ wording[item].words } />);
    // }  

    return(
      <div>
        <div className='deleteMove'>
          <button>M</button>
          <h3> {this.props.title}</h3>
          <button>X</button>
        </div>
        <div className='OuterBox'>
          <button>left</button>
          <div>
            <WordCards title = {this.props.title}/>
          </div>
          <button>right</button>
        </div>
      </div>
    )
  }
}


export default Sections