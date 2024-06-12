import StringList from "./string.json";

export const getString = (key, crrLang) => {
  const trm = StringList[crrLang][key];
  return trm;
};
