import { displaySet, displayU } from "../../types/types_copy";

//changes the order of the sections after drag and drop
function updateSectionOrder(order, payload) {
  const { sourceIndex, destIndex } = payload;
  //if the section wasn't moved then return the current order
  if (sourceIndex === destIndex) return order;
  //otherwise, iterate over the order and insert the section at the proper index
  const newOrder = [];
  for (let i = 0; i < order.length; i++) {
    if (i === destIndex && sourceIndex > destIndex) {
      newOrder.push(order[sourceIndex]);
    }
    if (i !== sourceIndex) newOrder.push(order[i]);
    if (i === destIndex && sourceIndex < destIndex)
      newOrder.push(order[sourceIndex]);
  }
  return newOrder;
}

export { updateSectionOrder };

// function updateSectionOrder(order, payload){
//   const {sourceIndex, destIndex} = payload
//   //if the section wasn't moved then return the current order
//   if (sourceIndex === destIndex) return order;
//   //otherwise, iterate over the order and insert the section at the proper index
//   const newOrder = [];
//   for (let i = 0; i < order.length; i++) {
//     if (i === destIndex && sourceIndex > destIndex){
//       newOrder.push( order[sourceIndex] );
//     }
//     if (i !== sourceIndex) newOrder.push(order[i]);
//     if (i === destIndex && sourceIndex < destIndex)
//       newOrder.push(order[sourceIndex]);
//   }
//   return newOrder;
// }
