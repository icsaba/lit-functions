# Lit Functional components
Lit Functional Components aims to provide a simple wrapper around Lit components, offering a streamlined development experience without introducing every React-like syntax and feature.

## Installation

### Yarn
`yarn add lit-functions`

### Npm
`npm install lit-functions`

## Usage

### Component and props
The `useProp` function is similar to `useState` in React. In Lit, properties and attributes are used, eliminating the need for a separate `useState`. Instead, define Lit properties, and whenever a property changes, the component re-renders. The type of the properties is inferred from the type argument.

If you would like to react on property change, you can either use `updated` or `usePropChanged` hook. It's very similar to `useEffect`, you should provide a callback and the list of dependencies in string format.

The component function creates a custom web component, with the name generated from the function name.

```ts
import { html, css } from "lit";
import litLogo from './assets/lit.svg'
import viteLogo from '/vite.svg'
import component, { Props } from "../../src";

const style = css``

function myElement({ useProp, usePropChanged }: Props) {
  const [count, setCount] = useProp('count', {type: Number}, 0);
  const [docs, _] = useProp('docs', {type: String}, 'This is some test docs');

  usePropChanged(() => { console.log('count value changed')}, ['count']);

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

### Lifecycle Methods

#### onMount and onUnMount
These functions correspond to connectedCallback and disconnectedCallback, respectively, and are high-order functions.

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
The method names remain the same for clarity.

```ts
function myElement({updated, attributeChangedCallback}: Props) {
  updated((changedProperties: PropertyValues) => {
    console.log('updated props', changedProperties);
  });
}
```

#### meta
If you need direct access to the Lit instance, use the `meta` property.

```ts
function myElement({meta}: { meta: LitElement }) {}
```

### Handling Events
Manage events with `dispatchEvent` from the `props`, which dispatches an event on the current Lit element.

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

Please see `CONTRIBUTING.md` for the contribution guidelines
