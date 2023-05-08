import React, {useContext, useState} from 'react';
import { GlobalContext } from './App';
import pencil from '../../public/assets/pencil_grey.svg';
import close from '../../public/assets/close.png';
import check from '../../public/assets/check2.svg'


function MainTemplate(){
  const {templates, dispatch} = useContext(GlobalContext);
  const [editableTitle, setEditableTitle] = useState(null);

  function handleCloseButton(e){
    const currTitle = e.currentTarget.dataset.templatetitle;
    console.log(currTitle)
    //delete Title from database
    //delete title from Templates using dispatch
  }

  function handleEditButton(e){
    const currTitle = e.currentTarget.dataset.templatetitle;
    console.log(currTitle)
    setEditableTitle(currTitle);
    
  }

  const allTemplateTitles = Object.keys(templates).map((el, index) => {
    const [editedTitle, setEditedTitle] = useState(el);

    const handleInputChange = (e) => {
      setEditedTitle(e.target.value);
    };

    const handleSaveButton = (e) => {
      // save the edited title
      console.log(`Save title: ${editedTitle}`);
      console.log(editableTitle)
      dispatch({type: 'renameTEMPLATE', payload: {oldName: editableTitle, newName: editedTitle}})

      setEditableTitle(null);
    };

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
              {/* <button onClick={handleSaveButton}>Save</button> */}
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

  
  console.log({allTemplateTitles})

  return (
      <div id='templateBox'>
        <h3>Your Templates</h3>
        <ul id='templateBoxUL'>
          {allTemplateTitles}
        </ul>
      </div>
  )

}

export default MainTemplate