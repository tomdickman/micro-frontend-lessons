import React from "react";
import ReactDOM from "react-dom";

import { App } from "./App";

class AppHTMLElement extends HTMLElement {
  connectedCallback(): void {
    if (this.shadowRoot === null) {
      // You can load fonts required for the micro frontend into the light DOM here
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "https://fonts.googleapis.com/css2?family=Kdam+Thmor+Pro&display=swap";
      document.head.appendChild(link);

      const mountPoint = document.createElement("div");
      const shadowRoot = this.attachShadow({ mode: "open" });

      shadowRoot.append(mountPoint);

      ReactDOM.render(
        <App userName="Developer" lang="TypeScript" />,
        mountPoint
      );
    }
  }
}

customElements.get("encapsulated-micro-frontend") ??
  customElements.define("encapsulated-micro-frontend", AppHTMLElement);
