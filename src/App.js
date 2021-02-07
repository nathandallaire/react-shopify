import React, { Suspense } from "react";
//import { Snippet } from "./util/liquid";
//import { formatMoney } from "./util/shopify";
import "core-js/stable";
import "regenerator-runtime/runtime";
import "./styles.scss";
import ContactForm from "./components/Form/Contact";

const OtherComponent = React.lazy(() => import("./OtherComponent"));
const AnotherComponent = React.lazy(() => import("./OtherComponent2"));

function MyComponent() {
  return (
    <div>
      <h1>Tewwes?ewfwewet!!</h1>
      <ContactForm />
      <Suspense fallback={<div>Loae!erwewdwewweingew</div>}>
        <section>
          <div style={{ width: 40 }}>{/* <Snippet snippet="arrow" /> */}</div>
          <OtherComponent />
          <AnotherComponent />
        </section>
      </Suspense>
    </div>
  );
}

export default MyComponent;
