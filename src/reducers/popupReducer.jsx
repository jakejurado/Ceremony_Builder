export function popupReducer(state, action){
  const {subAct, type} = action
  
  switch (type){
    case 'myAccount':
      return {box: 'myAccount', subAct}
    case 'myAuth':
      return {box: 'myAuth', subAct}
    case 'myTemplates':
      return {box: 'myTemplates', subAct}
    case 'myPrint':
      return {box: 'myPrint', subAct}
    case 'boxAI':
      return {box: 'boxAI', subAct}
    default:
      return {box: null, subAct: null}
  }
}