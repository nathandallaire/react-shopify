import React, { Suspense } from "react";
//import { Snippet } from "./util/liquid";
//import { formatMoney } from "./util/shopify";
import "./styles.scss";

const OtherComponent = React.lazy(() => import("./OtherComponent"));
const AnotherComponent = React.lazy(() => import("./OtherComponent2"));

function MyComponent() {
  return (
    <div>
      <h1>Tewwes?ewfwewet!!</h1>
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
