

function removeNames(content: string, person1: string, person2: string): string{
  return content.replaceAll(person1, 'PERSON_1')
                .replaceAll(person2, 'PERSON_2')
}

export {removeNames}