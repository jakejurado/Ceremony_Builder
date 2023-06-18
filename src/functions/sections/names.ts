import { personState } from "../../types/types_copy";

function enterNames(names: personState, words: string): string {
  let content = words;
  if (names.person1)
    content = content.replaceAll("PERSON_1", names.person1);
  if (names.person2)
    content = content.replaceAll("PERSON_2", names.person2);
  return content;
}

export { enterNames };
