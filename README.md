# Lit Functional components
Aims to provide a cool wrapper around lit-components.

TBD later;

```ts
import { html, css } from "lit";
import litLogo from './assets/lit.svg'
import viteLogo from '/vite.svg'
import component, { Props } from "../../src";

const style = css``

function myElement({useProps, onMount, updated}: Props) {
  const [count, setCount] = useProps('count', {type: Number}, 0);
  const [docs, _] = useProps('docs', {type: String}, 'This is some test docs');
  
  onMount(() => {
    console.log('connectedCallback');
  });

  updated((changedProperties: PropertyValues) => {
    console.log('updated props', changedProperties);
  });

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