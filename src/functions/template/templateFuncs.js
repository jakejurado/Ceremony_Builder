function addToTemplate(template, varname, data) {
  const templateCopy = [...template];
  templateCopy[varname] = data;
  return templateCopy;
}

export { addToTemplate };
