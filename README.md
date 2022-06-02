# Wrapping Micro frontends in Web Components

This is a demo application outlining how web components and the shadow DOM can be utilised in tandem with React to encapsulate a micro frontend.

## What is solves

- Style clashes between micro frontend app components and global styles of the app where the micro frontend it mounted
- Differing versions of JS libs between multiple micro frontends (ie. React)

## Challenges

1. Styles are not applied to slotted elements
2. Global styles are not applied to component elements
3. Multiple versions of JS libs on the same page (potentially large load times)
4. Path management - if your application uses a router, you can't rely on having control of the route, as you don't necessarily know where in the application your micro frontend will be mounted
5. Session management - managing logins between micro frontends and monolith

## Solutions

### Styles are not applied to slotted elements

Entire app is mounted in the shadow DOM of the web component, including styles, to fully encapsulate the app in web component and its shadow DOM.

### Global styles are not applied to component elements

Anything you want to be styled by the parent application need to be slotted, so that they have access to these styles, but they will not receive the styles from your shadow DOM.
All styles which the micro fronted control need to be injected into the shadow DOM.

### Multiple versions of JS libs

No way to solve the multiple versions, if they aren't aligned, there will always be two packaged versions of React (for example), otherwise either app may break.
Use of module federation between the two in order to reduce the potential for this to occur.
