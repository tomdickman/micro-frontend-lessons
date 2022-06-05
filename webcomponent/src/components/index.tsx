import * as React from "react";
import * as ReactDOM from "react-dom";

import "./encapsulated-micro-frontend";

const mountPoint = document.getElementById("webcomponent-mount");

if (mountPoint !== null) {
  ReactDOM.render(<encapsulated-micro-frontend />, mountPoint);
}
