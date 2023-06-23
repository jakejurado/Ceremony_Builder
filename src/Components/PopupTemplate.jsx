import React, {useContext, useState, useCallback} from 'react';
import { GlobalContext } from './App';
import pencil from '../../public/assets/pencil_grey.svg';
import close from '../../public/assets/close.png';
import check from '../../public/assets/check2.svg'
import { nameValidator } from '../functions/template/nameTemplate';

  //Template info popup.
function PopupTemplate(){
  const {templates, dispatch, templateTitle} = useContext(GlobalContext);

    //keeps track of which title is being edited.
  const [editableTitle, setEditableTitle] = useState(null);
  
    //keeps track of the new title
  const [editedTitle, setEditedTitle] = useState(null);

    //deletes a template from templates
  const handleCloseButton = useCallback((e) =>{
    const currTitle = e.currentTarget.dataset.templatetitle;
    dispatch({type: 'deleteTEMPLATE', payload: {currTitle}})
  }, [dispatch])

    //saves the template and then makes title editable
  const handleEditButton = useCallback((e) => {
    const currTitle = e.currentTarget.dataset.templatetitle;
    setEditableTitle(currTitle); 
    setEditedTitle(currTitle);
  }, [setEditableTitle, setEditedTitle])

    //saves the new title to state.
  const handleInputChange = useCallback((e) => {
    setEditedTitle(e.target.value);
  }, [setEditedTitle]);

    //saves  edited title as the  new title 
  const handleSaveButton = useCallback((e) => { //check button
    const name = nameValidator(Object.keys(templates), editedTitle);
    dispatch({type: 'renameTEMPLATE', payload: {oldName: editableTitle, newName: name, currTemplate: templateTitle === editableTitle}})
    setEditedTitle(null);
    setEditableTitle(null);
  }, [dispatch, setEditedTitle, setEditableTitle, templates, editedTitle]);

    //maps all template titles and if a title is an editedTitle, puts it in an input filed to edit.
  const allTemplateTitles = Object.keys(templates).map((title) =>{
    if(title === editableTitle){
      return(
        <li key={title}>
          <div className='templateTitleRows'>
            <div className='rowsImg rowsPencilSelected'></div>
            <div className='rowsTitle'> <input placeholder={title} onChange={handleInputChange}></input></div>
            <div className='rowsImg rowsSave'><img src={check} onClick={handleSaveButton} data-templatetitle={title} alt='save button'/></div>
          </div>
        </li>
      )
    } else{
      return(
        <li key={title}>
          <div className='templateTitleRows'>
            <div className='rowsImg rowsPencil'><img src={pencil} onClick={handleEditButton} data-templatetitle={title} alt='edit template title button'/></div>
            <div className='rowsTitle'>{title}</div>
            <div className='rowsImg rowsClose'><img src={close} data-templatetitle={title} onClick={handleCloseButton}  alt='delete template button'/></div>
          </div>
        </li>
      )
    }
  })

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