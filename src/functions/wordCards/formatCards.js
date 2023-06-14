// let htmlString = '<p>Who gives this woman to be married to this man?<br><br>FATHER/MOTHER/BOTH: I do!<br></p>'

  //makes content ready to store.
function formatCards(str, personObj) {
  const {person1, person2} = personObj;
  const content = removeDomTags(str);
  return removeNames(content, person1, person2);
}

  //removes the <p>, </p>, and <br> and adds /n for the line break.
function removeDomTags(str){
  return str.replaceAll('<br>', '\n')
            .replaceAll('<\/p><p>', '\n')
            .replace(/<\/?p>/g, '');
}

  //removes the state names with the placeholders.
function removeNames(content, person1, person2){
  return content.replaceAll(person1, 'PERSON_1')
                .replaceAll(person2, 'PERSON_2')
}

export { formatCards }