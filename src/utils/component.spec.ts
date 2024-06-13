import { expect, describe, it, vi } from 'vitest';
import { elementUpdated, fixture, html, waitUntil } from '@open-wc/testing';
import component, { Props } from '../';
import { PropertyValues } from 'lit';

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
    const updatedMock = vi.fn();

    function MyTestComponent3({useProp, onMount, updated}: Props) {
      const [counter, setCounter] = useProp('counter', {type: Number}, 0);
      const [refreshCounter, refresh] = useProp('refreshCounter', {type: Number}, 0);
      
      onMount(() => {
        refresh(refreshCounter + 1);
      });

      updated((props: PropertyValues) => {
        updatedMock(props);
      })

      return html`<div>
        <span class="counter">${counter}</span>
        <span class="refreshCounter">${refreshCounter}</span>
        <button @click=${() => setCounter(counter + 1)}>${counter}</button>
      </div>
      `;
    }

    component(MyTestComponent3);

    describe('mount', () => {
      it('should run the mount method initially', async () => {
        const element = await fixture(html`<my-test-component3></my-test-component3>`);
  
        await waitUntil(() => element.shadowRoot?.querySelector('.refreshCounter')?.textContent === '1')
        const refreshCounter = element.shadowRoot?.querySelector('.refreshCounter');
  
        expect(refreshCounter?.textContent).toBe('1');
      });
  
      it('should run the mount method only once', async () => {
        const element = await fixture(html`<my-test-component3></my-test-component3>`);
        const btn = element.shadowRoot?.querySelector('button');
  
        btn?.click();
        await elementUpdated(element);
        btn?.click();
        await elementUpdated(element);
        btn?.click();
        await elementUpdated(element);
  
        await waitUntil(() => element.shadowRoot?.querySelector('.refreshCounter')?.textContent === '1')
  
        const counter = element.shadowRoot?.querySelector('.counter');
        const refreshCounter = element.shadowRoot?.querySelector('.refreshCounter');
        expect(counter?.textContent).toBe('3');
        expect(refreshCounter?.textContent).toBe('1');
      });
    });

    describe('updated', () => {
      it('should be called on prop change', async () => {
        const expectedMap = new Map();
        expectedMap.set('counter', undefined);
        expectedMap.set('refreshCounter', undefined);

        await fixture(html`<my-test-component3></my-test-component3>`);
        expect(updatedMock).toHaveBeenCalledWith(expectedMap);
      })
    });

  });
});
