# Lit Functional components
Aims to provide a cool wrapper around lit-components. That's not a goal to introduce every React like syntax and feature.

## Install

### Yarn
`yarn add lit-functions`

### Npm
`npm install lit-functions`

## Usage

### Component and props
`useProp` is like `useState` in React, but in Lit there are props and attributes only and there is no point to have a `useState` here. Instead let's define `lit` properties and whenever a property changes the component rerenders. 
The intellisense will figure out the type of the props from the `type`. 

The `component` method will create the custom web component and the name is generated from the function name.

```ts
import { html, css } from "lit";
import litLogo from './assets/lit.svg'
import viteLogo from '/vite.svg'
import component, { Props } from "../../src";

const style = css``

function myElement({ useProp }: Props) {
  const [count, setCount] = useProp('count', {type: Number}, 0);
  const [docs, _] = useProp('docs', {type: String}, 'This is some test docs');

  return html`
    <div>
      <a href="https://vitejs.dev" target="_blank">
        <img src=${viteLogo} class="logo" alt="Vite logo" />
      </a>
      <a href="https://lit.dev" target="_blank">
        <img src=${litLogo} class="logo lit" alt="Lit logo" />
      </a>
    </div>
    <slot></slot>
    <div class="card">
      <button part="button" @click="${() => setCount(count + 1)}">
        count is ${count}
      </button>
    </div>
    <p class="read-the-docs">${docs}</p>
  `
}

component(myElement, [style]);

```

### Lifecycle

#### onMount and onUnMount
This is the `connectedCallback` and `disconnectedCallback`, these are high order functions.

```ts
function myElement({onMount, onUnMount}: Props) {
  onMount(() => {
    console.log('connectedCallback');
  });

  onUnMount(() => {
    console.log('disconnectedCallback');
  });
}
```

#### updated and attributeChangedCallback
I did not change the method names.

```ts
function myElement({updated, attributeChangedCallback}: Props) {
  updated((changedProperties: PropertyValues) => {
    console.log('updated props', changedProperties);
  });
}
```

#### meta
If you need anything else from Lit, you have the `meta` property that exposes the created lit instance.

```ts
function myElement({meta}: { meta: LitElement }) {}
```

### Handling events
You can manage events with the `dispatchEvent` from the props. It dispatches an event on the current `lit-element`. 

```ts
import { html, css } from "lit";
import litLogo from './assets/lit.svg'
import viteLogo from '/vite.svg'
import component, { Props } from "../../src";

const style = css``

function myElement({dispatchEvent}: Props) {
  function dispatchMyCustomEvent() {
    dispatchEvent(new CustomEvent('foo-event', { detail: { foo: 'foo' }}));
  }

  return html`
    <button part="button" @click="${() => dispatchMyCustomEvent()}">
      dispatch an event
    </button>
  `
}

component(myElement, [style]);

```

## Contributing

Add some test and document what you've done. That's it :D

### Install

Add `"private": true` to the package.json to support `yarn workspaces`.

`yarn install`

### Start

You can try out ur changes with the command `yarn start:app:ts` or you can test how it works with js either `yarn start:app:js`. Before runninf the JS app, do not forget to create a new version locally with `yarn build && yarn pack` command.

### Test

It uses `vitest` and `jsdom` for now.

`yarn test:unit`
