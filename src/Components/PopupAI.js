import React, { useContext } from 'react'
import { GlobalContext } from './App'
import PopupAISubmitScreen from './PopupAISubmitScreen'
import PopupAIResultsScreen from './PopupAIResultsScreen'


function PopupAI({ subAct }) {
  const { templates, templateTitle} = GlobalContext
  const { dataVarname, dataIndex, dataCardContent, dataCardIndex } = subAct

  return (
    <div id='aiCover'>
      <div id='aiInnerBox'>
        <PopupAISubmitScreen cardContent={dataCardContent} />
      </div>
    </div>
  )
}

export default PopupAI