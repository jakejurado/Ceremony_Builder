import React, {useContext, useState, useCallback} from 'react';
import pencil from '../../../../public/assets/pencil_grey.svg';
import close from '../../../../public/assets/close.png';
import check from '../../../../public/assets/check2.svg'
import { nameValidator } from '../../../functions/template/nameTemplate';
import { useTemplates } from '../../../hooks/useTemplates';
import { useAuth } from '../../../hooks/useAuth';
import { fetchCall } from '../../../functions/fetches/api';

  //Template info popup.
function PopupTemplate(){
  const {templates, dispatch, templateTitle, setTemplateTitle, metaData, setMetaData} = useTemplates();
  const {currUser} = useAuth();

    //keeps track of which title is being edited.
  const [editableTitle, setEditableTitle] = useState(null);
  
    //keeps track of the new title
  const [editedTitle, setEditedTitle] = useState(null);

    //deletes a template from templates
  const handleCloseButton = (e) => {
    const deleteTitle = e.currentTarget.dataset.templatetitle;

        //delete from database
    const templateId = metaData.get(deleteTitle)?.number
    try {
      if(templateId){
        fetchCall.delete('templates', {templateId, userId: currUser})
      }

          //remove from metaData
        const metaDataCopy = new Map(metaData);
        metaDataCopy.delete(deleteTitle)
        setMetaData(metaDataCopy);

          //remove from local templates
        dispatch({type: 'deleteTEMPLATE', payload: {deleteTitle, templates}})
        // const templatesCopy = templates;
        // delete templatesCopy[deleteTitle];

          //change templateTitle if it is current.
        if(templateTitle === deleteTitle){
          const templateCopy = {...templates}
          delete templateCopy[deleteTitle];

          const remainingTitles = Object.keys(templateCopy);
          if(remainingTitles.length){ 
            setTemplateTitle(remainingTitles[0])
          } else{
            const newTitle = deleteTitle === 'myTemplate' ? 'TryToDeleteMe' : 'myTemplate';
            setTemplateTitle(newTitle);
            dispatch({type: 'addTEMPLATE', payload: {newTitle}})
          }
        }
    } catch(err){
      console.error(err)
    }
  }

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

      //copy state
    const templatesCopy = JSON.parse(JSON.stringify(templates));
      //update the state with the new name for the template.
    templatesCopy[name] = templatesCopy[editableTitle];
      //delete oldName from template
    delete templatesCopy[editableTitle];
      //update metaData
    const metaDataCopy = new Map(metaData);
    const dataCopy = metaDataCopy.get(editableTitle);
    metaDataCopy.set(name, dataCopy);
    metaDataCopy.delete(editableTitle)
    setMetaData(new Map(metaDataCopy))
      //update the templateTitle if that was the template name changed
    if(templateTitle === editableTitle) setTemplateTitle(name);

    dispatch({type: 'renameTEMPLATE', payload: {newState: templatesCopy}})


    setEditedTitle(null);
    setEditableTitle(null);
  }, [dispatch, setEditedTitle, setEditableTitle, templates, editedTitle, dispatch, metaData, setMetaData, templateTitle, setTemplateTitle]);

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