import { CSSResult, LitElement } from "lit";
import { toDashedString } from "./utils";
import { FunctionalLitComponent, Hooks } from "./hooks";
import BaseElement from "./base-element";


export type Props = {
  useProp: Hooks['useProp'],
  onMount: Hooks['onMount'],
  onUnMount: Hooks['onUnMount'],
  meta: LitElement,
}

export default function component(fn: Function, styles: CSSResult[] = []) {
  const componentName = toDashedString(fn.name);

  if (customElements.get(componentName)) {
    return;
  }

  const hooks: Hooks = new Hooks();
  const props: Props = { 
    useProp: hooks.useProp.bind(hooks),
    onUnMount: hooks.onUnMount.bind(hooks),
    onMount: hooks.onMount.bind(hooks),
    meta: hooks.litElement as LitElement
  }

  class ComponentClass extends BaseElement {
    constructor() {
      super();

      hooks.litElement = this as unknown as FunctionalLitComponent;
    }

    render() {
      return fn.call(this, props);
    }

    static get styles() {
      return styles
    }
  }

  hooks.LitClass = ComponentClass;

  customElements.define(componentName, ComponentClass);

  return ComponentClass;
}