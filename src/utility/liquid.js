import React from "react";

export const getSnippetHtmlString = (snippetName) => {
  return window.snippetHtml[snippetName];
};

export const htmlDecode = (htmlString) => {
  var e = document.createElement("textarea");
  e.innerHTML = htmlString;
  // handle case of empty htmlString
  return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
};

export const AsHtml = ({ html }) => {
  const decoded = htmlDecode(html);

  return <div dangerouslySetInnerHTML={{ __html: decoded }}></div>;
};

export const Snippet = ({ snippet }) => {
  const snippetHtml = getSnippetHtmlString(snippet);
  if (!snippetHtml) {
    console.error(`No global snippet reference with name ${snippet} exists.`);
    return <></>;
  }

  return <AsHtml html={snippetHtml} />;
};
