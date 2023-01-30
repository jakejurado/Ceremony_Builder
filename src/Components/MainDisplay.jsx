import React, { Component } from "react";
import Sections from "./Sections";
import wording from "../files/db-words";
import CeremonyImport from "./CeremonyImport";
import SaveBtn from "./SaveBtn";
import cbImage from "../../public/assets/ceremonybuilder.png";
//mongosh "mongodb+srv://codesmith.dzpwbsj.mongodb.net/scriptBuilderDatabase" --apiVersion 1 --username jakejurado

class MainDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      templates: {
        Wedding: [
          ["giving_away", "00"],
          ["opening_remarksC", "00"],
          ["declaration_of_intent", "00"],
          ["vows", "00"],
          ["pronouncement", "00"],
        ],
        Elopement: [
          ["opening_remarksC", "01"],
          ["vows", "01"],
          ["pronouncement", "00"],
        ],
      },
      saved: [],
      load: [
        ["giving_away", "00"],
        ["opening_remarksC", "00"],
        ["declaration_of_intent", "00"],
        ["vows", "00"],
        ["pronouncement", "00"],
      ],
    };
    this.updateCardIndex = this.updateCardIndex.bind(this);
    //this.updateCardIndex.bind(this)
    this.handleSavedFetch = this.handleSavedFetch.bind(this);
    this.updateCurrentScriptFromSaved =
    this.updateCurrentScriptFromSaved.bind(this);
    this.addToSave = this.addToSave.bind(this);
    this.removeSection = this.removeSection.bind(this);
  }

  componentDidMount() {
    this.callBackendAPI()
      .then((res) => this.setState({ data: res.express }))
      .catch((err) => console.log(err));
  }

  callBackendAPI = async () => {
    const response = await fetch("/express_backend");
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  };

  handleSavedFetch(arr) {
    this.setState({ saved: arr });
  }

  updateCurrentScriptFromSaved(index) {
    this.setState({ load: this.state.saved[index] });
  }

  //INPUT: name of section to update 'string' & newIndex "string"
  //OUTPUT: updated state
  //receives the section name and the new index to update state
  updateCardIndex(varName, newIndex) {
    const oldLoad = [...this.state.load];
    let findI = oldLoad.findIndex((el) => {
      //find where in the index is varName
      return el[0] === varName;
    });
    oldLoad[findI][1] = newIndex;
    this.setState({ load: oldLoad });
  }

  addToSave(input) {
    let passInfo;
    if (this.state.saved.length)
      passInfo = [...this.state.saved, this.state.load];
    else passInfo = this.state.load;
    console.log({ passInfo });

    console.log("got here");
    fetch("http://localhost:3000/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(passInfo),
    }).then((data) => {
      console.log("here is what we got back", data);
    });

    this.handleSavedFetch(passInfo);
  }

  removeSection(input) {
    let replaceState = [];
    this.state.load.forEach((el) => {
      console.log(el[0] === input);
      if (el[0] !== input) replaceState.push(el);
    });
    this.setState({ load: replaceState });
  }

  render() {
    let loadSections = [];
    this.state.load.forEach((item, index) => {
      loadSections.push(
        <Sections
          key={item[0]}
          id={item[0]}
          title={wording[item[0]].title}
          cardContent={wording[item[0]].words}
          description={wording[item[0]].description}
          varName={item[0]}
          cardIndex={[item[1]]}
          updateCardIndex={this.updateCardIndex}
          removeSection={this.removeSection}
        />
      );
    });
    return (
      <div>
        <Header />

        <CeremonyImport
          handleSavedFetch={this.handleSavedFetch}
          savedCeremonies={this.state.saved}
          updateCurrentScriptFromSaved={this.updateCurrentScriptFromSaved}
        />
        <div className="allSections">
          {this.state.data}
          {loadSections}
        </div>
        <SaveBtn addToSave={this.addToSave} />
      </div>
    );
  }
}

function Header() {
  return (
    <div className="titleS">
      <h1>
        <img id="h1Image" src={cbImage} />
      </h1>
    </div>
  );
}

function TemplateBtn() {
  return (
    <div className="template">
      Template:
      <button>Wedding</button>
      <button>Elopement</button>
    </div>
  );
}

export default MainDisplay;
