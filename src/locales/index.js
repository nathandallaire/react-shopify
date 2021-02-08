import React from "react";

const LanguageFile = window.store.lang;
const variableSyntax = ["${", "}"];

export default function Locales(localesKey = "", interpolatedValues = {}) {
  const value = LanguageFile[localesKey];

  if (value === undefined) {
    console.error(`${localesKey} not an existing locale.`);
    return "";
  }

  return getInterpolatedString(value, interpolatedValues);
}

/* ============================================================
As HTML
============================================================ */

export function AsHtml(localesKey = "", interpolatedValues = {}, tag) {
  const Tag = tag ? tag : "span";
  const text = Locales(localesKey, interpolatedValues);

  return <Tag dangerouslySetInnerHTML={{ __html: text }} />;
}

/* ============================================================
Handle variables
Return array of new variables
============================================================ */
function handleVariable(variableString, interpolatedValues) {
  return interpolatedValues[variableString];
}

/* ============================================================
Get first instance of variable indexes in string
============================================================ */
function getVariableIndexes(str) {
  const startingIndexOfVar = str.indexOf(variableSyntax[0], 0);
  const endingIndexOfVar = str.indexOf(variableSyntax[1], startingIndexOfVar);

  return [startingIndexOfVar, endingIndexOfVar];
}

/* ============================================================
Get first instance of variable in string
============================================================ */
function getVariable(str) {
  const indexes = getVariableIndexes(str);

  //See below: add length of variable syntax so the variable returned does not contain variable syntax
  //ie instead of returning "${page.title" we want to return "page.title"
  const variable = str.slice(indexes[0] + variableSyntax[0].length, indexes[1]);

  return variable;
}

/* ============================================================
Return an array of all variables in string
============================================================ */
function getInterpolatedString(str, interpolatedValues) {
  const numberOfVariables = occurrences(str, variableSyntax[0]);

  if (numberOfVariables < 1) return str;

  let updatedText = str;
  for (let index = 1; index <= numberOfVariables; index++) {
    const variableIndexes = getVariableIndexes(updatedText);
    const variable = getVariable(updatedText);

    //Remove this variable from the updatedText and loop over again
    //Adjust index by +1 to account for white space
    updatedText = updatedText.replace(
      updatedText.substring(variableIndexes[0], variableIndexes[1] + 1),
      handleVariable(variable, interpolatedValues)
    );
  }

  return updatedText;
}

/* ============================================================
Get number of variable occurences in the string
https://stackoverflow.com/questions/4009756/how-to-count-string-occurrence-in-string
============================================================ */
function occurrences(string, subString, allowOverlapping) {
  string += "";
  subString += "";
  if (subString.length <= 0) return string.length + 1;

  var n = 0,
    pos = 0,
    step = allowOverlapping ? 1 : subString.length;

  while (true) {
    pos = string.indexOf(subString, pos);
    if (pos >= 0) {
      ++n;
      pos += step;
    } else break;
  }
  return n;
}
