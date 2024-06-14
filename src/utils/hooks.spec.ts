import { expect, describe, it, beforeEach, vi } from 'vitest'
import { FunctionalLitComponent, Hooks } from './hooks';
import { LitElement } from 'lit';

describe('hooks', () => {
  let hooks: Hooks;

  beforeEach(() => {
    hooks = new Hooks();
    hooks.litElement = {
      dispatchEvent: vi.fn(),
    } as unknown as FunctionalLitComponent;
    hooks.LitClass = {
      elementProperties: new Map(),
      createProperty: () => {},
    } as unknown as typeof LitElement;
  });

  describe('useProps', () => {
    it('should return with a tuple', () => {
      const [propValue, setter] = hooks.useProp('propertyName', { type: Number }, 2);
      
      expect(propValue).toBe(2);
      expect(setter).toBeTypeOf('function');
    });

    it('should set the value of the component', () => {
      const [propValue, setter] = hooks.useProp('propertyName', { type: Number }, 2);
      
      expect(propValue).toBe(2);
      
      setter(5);

      expect(hooks.litElement?.propertyName).toBe(5);
    });
  });

  describe('dispatchEvent', () => {
    it('should dispatch new event', () => {
      const event = new CustomEvent('foo');
      hooks.dispatchEvent(event);

      expect(hooks.litElement?.dispatchEvent).toHaveBeenCalledWith(event);
    });
  });
});