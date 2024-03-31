export function popupReducer(state, action){
  
  switch (action?.type){
    case 'myAccount':
      return {box: 'myAccount', subAct: action.subAct}
    case 'myAuth':
      return {box: 'myAuth', subAct: action.subAct}
    case 'myTemplates':
      return {box: 'myTemplates', subAct: action.subAct}
    case 'myPrint':
      return {box: 'myPrint', subAct: action.subAct}
    case 'boxAI':
      return {box: 'boxAI', subAct: action.subAct}
    default:
      return {box: null, subAct: null}
  }
}