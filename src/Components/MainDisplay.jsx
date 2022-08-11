import React, { Component } from 'react';
import Sections from './Sections';
import wording from '../db-words'
import CeremonyImport from './CeremonyImport'


class MainDisplay extends Component{
  constructor(props){
    super(props); 
    this.state = {
        data: null,
        templates: {
          Wedding: [['giving_away', '00'], ['opening_remarksC', '00'], ['declaration_of_intent', '00'], ['vows', '00'], ['pronouncement', '00']],
          Elopement: [["opening_remarksC", '01'], ['vows', '01'], ['pronouncement', '00']]
        },
        saved: [],
        load: [['giving_away', '00'], ['opening_remarksC', '00'], ['declaration_of_intent', '00'], ['vows', '00'], ['pronouncement', '00']],
    }; 
    this.updateCardIndex = this.updateCardIndex.bind(this);
    //this.updateCardIndex.bind(this)
    this.handleSavedFetch = this.handleSavedFetch.bind(this);
    this.updateCurrentScriptFromSaved = this.updateCurrentScriptFromSaved.bind(this);
  }

  componentDidMount() {
    this.callBackendAPI()
      .then(res => this.setState({ data: res.express }))
      .catch(err => console.log(err));
  }
  callBackendAPI = async () => {
    const response = await fetch('/express_backend');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message) 
    }
    return body;
  };

  handleSavedFetch(arr){
    console.log('handleSavedFetch');
    this.setState({saved: arr})
  }

  updateCurrentScriptFromSaved(index){
    console.log('hi there');
    console.log(this.state.saved[0])
    console.log(this.state.load);
    this.setState({load: this.state.saved[index]})
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
    this.setState({load: oldLoad})
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
        />,
        <div className='addButton'>
          <button>add</button>
        </div>
      );
    })
    return(
      <div>
        <Header />
        <TemplateBtn />
        <CeremonyImport 
          handleSavedFetch={this.handleSavedFetch}
          savedCeremonies={this.state.saved}
          updateCurrentScriptFromSaved = {this.updateCurrentScriptFromSaved}
        />
        <div className='allSections'> 
          {this.state.data}
          {loadSections}
        </div>
        <PrintBtn />
      </div>
    )
  }
}





function Header(){
  return (
    <div className='titleS'>
      <h1>Ceremony Builder</h1>
    </div>
  );
}

function TemplateBtn(){
  return(
      <div className='template'>
        Template: 
        <button>Wedding</button>
        <button>Elopement</button>
      </div>
  )
}

function SavedBtn(){
  return(
    <div>
      <button>saved scripts</button>
    </div>
  )
}

function PrintBtn(){
  return(
    <div>
      <div>
        <input id='person1'></input>
        <input id='person2'></input>
      </div>
      <button>Print</button><button>Save</button>
    </div>
  )
}





export default MainDisplay