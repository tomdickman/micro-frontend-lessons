declare module "*.scss";
declare module "*.css";

// Declarations for custom web components.
declare namespace JSX {
  interface IntrinsicElements {
    "encapsulated-micro-frontend": AppHTMLElement;
  }
}