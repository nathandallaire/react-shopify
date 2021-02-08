import React from "react";
import Form from "./Form";

const ContactForm = () => {
  return (
    <Form type="contact">
      <div className="five columns omega">
        <label htmlFor="contactFormEmail">
          Email <span className="red">*</span>
        </label>
        <input
          type="email"
          id="contactFormEmail"
          name="contact[email]"
          placeholder="Email"
          autoCorrect="off"
          autoCapitalize="off"
          required="required"
        />
      </div>

      <label htmlFor="contactFormMessage">
        Message <span className="red">*</span>
      </label>
      <textarea
        rows="5"
        id="contactFormMessage"
        name="contact[body]"
        placeholder="Message"
        required="required"
      ></textarea>

      <input
        type="submit"
        className="submit action_button add_to_cart"
        value="Send"
      />
    </Form>
  );
};

export default ContactForm;
