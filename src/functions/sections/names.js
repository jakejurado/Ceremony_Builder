function enterNames(names, words) {
  let string = words;
  if (names.person1)
    string = string.replaceAll("PERSON_1", names.person1.toUpperCase());
  if (names.person2)
    string = string.replaceAll("PERSON_2", names.person2.toUpperCase());
  return string;
}

export { enterNames };
