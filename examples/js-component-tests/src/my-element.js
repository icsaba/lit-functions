import { html, css } from "lit";
import litLogo from './assets/lit.svg'
import viteLogo from '/vite.svg'
import component from "lit-functions";

const style = css`
:host {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.lit:hover {
  filter: drop-shadow(0 0 2em #325cffaa);
}

.card {
  padding: 2em;
}

.read-the-docs {
  color: #888;
}

a {
  font-weight: 500;
  color: #646cff;
  text-decoration: inherit;
}
a:hover {
  color: #535bf2;
}

::slotted(h1) {
  font-size: 3.2em;
  line-height: 1.1;
}

button {
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: #1a1a1a;
  cursor: pointer;
  transition: border-color 0.25s;
}
button:hover {
  border-color: #646cff;
}
button:focus,
button:focus-visible {
  outline: 4px auto -webkit-focus-ring-color;
}

@media (prefers-color-scheme: light) {
  a:hover {
    color: #747bff;
  }
  button {
    background-color: #f9f9f9;
  }
}
`

/**
 * 
 * @param {import('lit-functions').Props} param0 
 * @returns 
 */
function myElement({useProp, onMount, updated}) {
  const [count, setCount] = useProp('count', {type: Number}, 0);
  const [refreshCounter, refresh] = useProp('refreshCounter', {type: Number}, 2);
  const [docs, _] = useProp('docs', {type: String}, 'This is some test docs');

  onMount(() => {
    console.log('onMount');
    refresh(refreshCounter + 1)
  });

  updated(
    /**
     * 
     * @param {import('lit').PropertyDeclaration} changedProperties 
     */
    (changedProperties) => {
    console.log('changed', changedProperties);
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
    <p class="read-the-docs">${refreshCounter}</p>
    <p class="read-the-docs">${docs}</p>
  `
}

component(myElement, [style]);
