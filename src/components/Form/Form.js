import React, { useEffect, useState, useRef, useCallback } from "react";
import PropTypes from "prop-types";
import { submitForm } from "./helper";

const Form = ({ type, children }) => {
  const [hiddenForm, setHiddenForm] = useState("<div></div>");
  const [formAttributes, setFormAttributes] = useState(null);
  const hiddenFormWrapperRef = useRef();
  const formRef = useRef();

  useEffect(() => {
    const form = window.store.forms[type];
    setHiddenForm(form);
  }, [type, setHiddenForm]);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (!formRef?.current) return;

      const form = formRef.current;
      const action = form.getAttribute("action");
      const inputs = form.querySelectorAll("[name]");

      try {
        const response = await submitForm(action, inputs);
        console.log(response);
      } catch (err) {
        console.log(err);
      }
    },
    [formRef]
  );

  useEffect(() => {
    if (!hiddenFormWrapperRef?.current) return;

    new MutationObserver(() => {
      const form = hiddenFormWrapperRef.current.querySelector("form");

      function camelize(str) {
        return str
          .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
            return index === 0 ? word.toLowerCase() : word.toUpperCase();
          })
          .replace(/\s+/g, "")
          .replace("-", "");
      }

      if (form) {
        let attributes = {};
        const attributesAsArr = [...form.attributes];
        attributesAsArr.forEach((attribute) => {
          if (attribute.nodeName === "class") return;
          attributes[camelize(attribute.nodeName)] = attribute.nodeValue;
        });
        setFormAttributes(attributes);
      }
    }).observe(hiddenFormWrapperRef.current, { childList: true });
  }, [hiddenFormWrapperRef, setFormAttributes]);

  return (
    <div>
      {!formAttributes && (
        <div>
          <div
            ref={hiddenFormWrapperRef}
            dangerouslySetInnerHTML={{ __html: hiddenForm }}
          ></div>
        </div>
      )}

      <form ref={formRef} onSubmit={handleSubmit} {...formAttributes}>
        {children}
      </form>
    </div>
  );
};

Form.propTypes = {
  type: PropTypes.string.isRequired,
  children: PropTypes.array,
};

export default Form;
