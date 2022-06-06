# Wrapping Micro frontends in Web Components

This is a demo application outlining how web components and the shadow DOM can be utilised in tandem with React to encapsulate a micro frontend.

## What it solves

- Style clashes between micro frontend app components and global styles of the app where the micro frontend is mounted
- Unexpected differences in relative values (ie. remove the uncertainty of `em` values)
- Changes to styles in micro frontend effecting the monolith where the app is mounted and possibly breaking functionality

## Challenges

1. Global styles are not applied to component elements
2. Multiple versions of JS libs on the same page (potentially large load times)
3. Path management - if your application uses a router, you can't rely on having control of the route, as you don't necessarily know where in the application your micro frontend will be mounted
4. Session management - managing logins between micro frontends and monolith

## Solutions

### Global styles are not applied to component elements

Anything you want to be styled by the parent application need to be slotted, so that they have access to these styles, but they will not receive the styles from your shadow DOM.
All styles which the micro fronted control need to be injected into the shadow DOM.

### Multiple versions of JS libs

No way to solve the multiple versions, if they aren't aligned, there will always be two packaged versions of React (for example), otherwise either app may break.
Using a correctly configured mono-repo with webpack module federation can reduce the potential for this to occur. If you are not using a mono-repo, or don't have control access over the monolith, the best option is to align React versions.

### Path management


### Session management

Often a mounted micro frontend won't have access to the cookies of the monolith, this is because of CORS issues and the fact that the micro frontend will be coming from a conflicting domain. This is potentially the hardest issue to solve, and the solutions are multiple:\

- use a non HTTP-only session cookie (or local storage), to prevent Javascript not being granted access to cookies. This subjects the cookie to injection, but this can be handled via use of a shared JWT between the monolith and the micro frontend, which can be validated on request.

- proxy all requests through a service
