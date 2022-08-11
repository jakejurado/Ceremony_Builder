import React, { Component } from 'react';


class SaveBtn extends Component{
  constructor(props){
  super(props);
  this.handleSaveScriptBtn = this.handleSaveScriptBtn.bind(this);
  }

  handleSaveScriptBtn(){
    this.props.addToSave();
  }

  render() {
    return(
      <div>
        <button onClick={this.handleSaveScriptBtn}>save script</button>
       </div>
    )
  }

}


export default SaveBtn;