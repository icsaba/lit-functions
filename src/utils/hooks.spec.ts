import { expect, describe, it, beforeEach } from 'vitest'
import { FunctionalLitComponent, Hooks } from './hooks';
import { LitElement } from 'lit';

describe('hooks', () => {
  let hooks: Hooks;

  beforeEach(() => {
    hooks = new Hooks();
    hooks.litElement = {} as FunctionalLitComponent;
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
});