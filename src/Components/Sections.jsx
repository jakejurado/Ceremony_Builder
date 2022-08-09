import React, { Component } from 'react';
import WordCards from './WordCards';

// class Sections extends Component{
//   constructor(props){
//     super(props); 
//   }
//   render(){
//     return(
//       <div>
//         <div className='deleteMove'>
//           <button>M</button>
//           <h3> {this.props.title}</h3>
//           <button>X</button>
//         </div>
//         <div className='OuterBox'>
//           <button>left</button>
//           <div>
//             <WordCards title = {this.props.title}/>
//           </div>
//           <button>right</button>
//         </div>
//       </div>
//     )
//   }
// }

const Sections = props => {
  const allWords = [];
  for(const [key, value] of Object.entries(props.words)){
    allWords.push(<WordCards key={`${props.called}-${key}`} id={`${props.called}-${key}`} content={value} />);
  }

  return(
    <div>
      <div className='deleteMove'>
        <button>M</button>
        <h3> {props.title}</h3>
        <h4> {props.description}</h4>
        <button>X</button>
      </div>
      <div className='OuterBox'>
        <button>left</button>
        <div>
          {allWords}
        </div>
        <button>right</button>
      </div>
    </div>
  )
}






export default Sections