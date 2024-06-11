import { CSSResult, LitElement } from "lit";
import { toDashedString } from "./utils";
import { FunctionalLitComponent, Hooks } from "./hooks";


export type Props = {
  useProps: Hooks['useProps']
} 

export default function component(fn: Function, styles: CSSResult[]) {
  const componentName = toDashedString(fn.name);

  if (customElements.get(componentName)) {
    return;
  }

  const hooks: Hooks = new Hooks();
  const props: Props = { useProps: hooks.useProps.bind(hooks) }

  class ComponentClass extends LitElement {
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