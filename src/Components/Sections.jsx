import React, { Component } from 'react';
import WordCards from './WordCards';
import leftArrow from '../../public/assets/arrowLft.png'
import addButton from '../../public/assets/add.png'



class Sections extends Component{
  constructor(props){
    super(props);
    this.handleLeftRightClick = this.handleLeftRightClick.bind(this);
    this.handleXbutton = this.handleXbutton.bind(this);
  }

  handleLeftRightClick(event){
    console.log('hi');
    //turn object into array, so that it can be iterated over.
    const contentArr = Object.entries(this.props.cardContent).sort(); //turn into array

    //find the current index that is being displayed on the page.
    const findI = contentArr.findIndex(el=>{  //find the current index that is being displayed
      return el[0] === this.props.cardIndex[0]
    });

    //depending on right or left click, change the state to the next content.
    let theIndex;
    console.log(event.target.id)
    switch(event.target.id){
      case 'rightClick':
        if(findI === contentArr.length-1) theIndex = 0;
        else theIndex = findI + 1;
        break;
      case 'leftClick':
        if(findI === 0) theIndex = contentArr.length - 1;
        else theIndex = findI - 1
        break;
      default:
        theIndex = findI;
    }
    const newIndex = contentArr[theIndex][0];
    this.props.updateCardIndex(this.props.varName, newIndex)
  }
  
  handleXbutton(event){
    const name = event.target.className;
    console.log(event);
    this.props.removeSection(name);
  }


  render(){
    return(
      <div className={this.props.varName}>
        <div className='sec'>
          <div className='deleteMove'>
            <button>M</button>
            <h3> {this.props.title}</h3>
            <button className={`${this.props.varName}`} onClick={this.handleXbutton}>X</button>
          </div>
          <div className='OuterBox'>
            <button id='leftClick' className={this.props.varName} onClick={this.handleLeftRightClick}>left</button>
              <WordCards 
                className={`${this.props.varName}`} 
                key={`${this.props.varName}`} 
                id={`${this.props.varName}`} 
                cardContent={this.props.cardContent[this.props.cardIndex]} 
                cardIndex={this.props.cardIndex} 
                class={`${this.props.varName}-${this.props.cardIndex}`}
              />
            <button id='rightClick' className={this.props.varName} onClick={this.handleLeftRightClick}>right</button>
          </div>
        </div>
        <div className='addButtonDiv'><img id='addButtonImg' src={addButton} /></div>
      </div>
    )
  }
}




const Section = props => {
  function handleLeftClick(event){

    const arr = Object.entries(props.cardContent); //[[a, 00], [b, 01]]
    const prevState = {...this.state};

    switch(event.target.innerText){
      case'left':
        if(props.cardIndex === '00'){

        }else{
          const newIndex = arr.findIndex(props.Index) - 1;
          this.setState()
        }
          //set state to end of array.
        //else set state to state - 1
      break;

      case 'right':
      break;
      
      default:
      break;
    }
    console.log(event.target.innerText);
    console.log(event.target.className);
  }

  return(
    <div className={`sec ${props.varName}`}>
      <div className='deleteMove'>
        <button>M</button>
        <h3> {props.title}</h3>
        <h4> {props.description}</h4>
        <h5> {props.cardIndex}</h5>
        <button>X</button>
      </div>
      <div className='OuterBox'>
        <button className={props.varName} onClick={handleLeftClick}>left</button>
        <div id='insetDiv'>
          <WordCards 
            className={`${props.varName}`} 
            key={`${props.varName}`} 
            id={`${props.varName}`} 
            cardContent={props.cardContent[props.cardIndex]} 
            cardIndex={props.cardIndex} 
            class={`${props.varName}-${props.cardIndex}`}
          />
        </div>
        <button>right</button>
      </div>
    </div>
  )
}






export default Sections