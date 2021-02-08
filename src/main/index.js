import React from "react";
import "./styles.scss";
import { getStoreData } from "../utility/store";
import components from "../keys/components";

function AppContainer() {
  const { global } = getStoreData();
  const { template } = global;

  const Component = components[template];

  if (!Component) {
    return (
      <div>
        No component with template "<code>{template}</code>".
      </div>
    );
  }

  return (
    <div>
      <Component />
    </div>
  );
}

export default AppContainer;
