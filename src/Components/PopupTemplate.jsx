import React, {useContext, useState} from 'react';
import { GlobalContext } from './App';
import pencil from '../../public/assets/pencil_grey.svg';
import close from '../../public/assets/close.png';
import check from '../../public/assets/check2.svg'
import { nameValidator } from '../functions/template/nameTemplate';


function PopupTemplate(){
  const {templates, dispatch, templateTitle} = useContext(GlobalContext);

  //keeps track of which title is being edited.
  const [editableTitle, setEditableTitle] = useState(null);
  
  //test
  const [editedTitle, setEditedTitle] = useState(null);

  //deletes a template from templates
  function handleCloseButton(e){ //x button
    const currTitle = e.currentTarget.dataset.templatetitle;
    console.log({currTitle})

    dispatch({type: 'deleteTEMPLATE', payload: {currTitle}})
  }

  //saves the template and then makes title editable
  function handleEditButton(e){ //pencil button
    const currTitle = e.currentTarget.dataset.templatetitle;
    setEditableTitle(currTitle); 
    setEditedTitle(currTitle);
  }

  const handleInputChange = (e) => { //input
    setEditedTitle(e.target.value);
  };

  const handleSaveButton = (e) => { //check button
    // save the edited title
    const name = nameValidator(Object.keys(templates), editedTitle);
    dispatch({type: 'renameTEMPLATE', payload: {oldName: editableTitle, newName: name, currTemplate: templateTitle === editableTitle}})
    setEditableTitle(null);
    setEditableTitle(null);
  };

  const allTemplateTitles = Object.keys(templates).map((el, index) => {
   
    return (
      <li
        className='titleList'
        key={index}
        data-title={el}
        data-index={index}
      >
        <div className='titleDiv'>
          {editableTitle === el ? (
            <>
              <input
                type='text'
                value={editedTitle}
                onChange={handleInputChange}
              />
              <img src={check} onClick={handleSaveButton} />
            </>
          ) : (
            <>
              {el}
              <img
                src={pencil}
                data-templatetitle={el}
                onClick={handleEditButton}
              />
              <img
                src={close}
                style={{ width: '2vw' }}
                data-templatetitle={el}
                onClick={handleCloseButton}
              />
            </>
          )}
        </div>
      </li>
    );
  });

  return (
      <div id='templateBox'>
        <h3>Your Templates</h3>
        <ul id='templateBoxUL'>
          {allTemplateTitles}
        </ul>
      </div>
  )

}

export default PopupTemplate