import React from "react";
import "./App.css";
import MainDisplay from './Components/MainDisplay';


function App() {
  return (
    <div className="App">
      <Header />
      <TemplateBtn />
      <MainDisplay />
      <PrintBtn />
    </div>
  );
}


function Header(){
  return (
    <div>
      <h1>Ceremony Builder</h1>
      <h4>construct your wedding script</h4>
    </div>
  );
}

function TemplateBtn(){
  return(
    <div>
      <button>Template</button>
      <button>Saved</button>
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



export default App;