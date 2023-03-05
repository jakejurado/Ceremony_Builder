function sanatize(str: string): string {
  const regex = /[^A-Za-z0-9!\-\.\(\)\/\:\?\ ]/g;
  return str.replace(regex, "");
}

export { sanatize };
