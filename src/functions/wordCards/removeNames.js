

function removeNames(content, person1, person2){
  return content.replaceAll(person1, 'PERSON_1')
                .replaceAll(person2, 'PERSON_2')
}

export {removeNames}