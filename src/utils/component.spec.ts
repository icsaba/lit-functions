import { expect, describe, it } from 'vitest';
import { elementUpdated, fixture, html } from '@open-wc/testing';
import component, { Props } from '../';

describe('component', () => {
  describe('rendering', () => {
    function MyTestComponent() {
      return html`<div>foo</div>`;
    }

    component(MyTestComponent);

    it('should create custom web component in the element registry', () => { 
      expect(customElements.get('my-test-component')).toBeTruthy();
    });
  
    it('should render a <div> with text foo', async () => {
      const element = await fixture(html`<my-test-component></my-test-component>`);
  
      expect(element?.shadowRoot?.querySelector('div')?.textContent).toBe('foo');
    });
  });

  describe('properties', () => {
    function MyTestComponent2({useProp}: Props) {
      const [counter, setCounter] = useProp('counter', {type: Number}, 12);

      return html`<div>
        <span class="counter">${counter}</span>
        <button @click=${() => setCounter(counter + 1)}>increase</button>
      </div>
      `;
    }

    component(MyTestComponent2);

    it('should define counter property with a default value', async () => {
      const element = await fixture(html`<my-test-component2></my-test-component2>`);

      const counter = element.shadowRoot?.querySelector('.counter');
      expect(counter?.textContent).toBe('12');
    });

    it('should increase the value of the counter property using the setter', async () => {
      const element = await fixture(html`<my-test-component2></my-test-component2>`);
      const btn = element.shadowRoot?.querySelector('button');

      btn?.click();
      await elementUpdated(element);

      const counter = element.shadowRoot?.querySelector('.counter');
      expect(counter?.textContent).toBe('13');
    });
  });

  describe('lifecycle', () => {
    function MyTestComponent3({useProp, onMount}: Props) {
      const [refreshCounter, refresh] = useProp('counter', {type: Number}, 0);
      
      onMount(() => {
        refresh(refreshCounter + 1);
      });

      return html`<div>
        <span class="counter">${refreshCounter}</span>
      </div>
      `;
    }

    component(MyTestComponent3);

    it('should run the mount method only once', async () => {
      const element = await fixture(html`<my-test-component3></my-test-component3>`);

      await elementUpdated(element);

      const counter = element.shadowRoot?.querySelector('.counter');
      expect(counter?.textContent).toBe('1');
    });
  });
});
