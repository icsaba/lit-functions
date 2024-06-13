import { LitElement, PropertyDeclaration } from "lit";
import BaseElement from "./base-element";

export type FunctionalLitComponent = BaseElement & { [key: string]: unknown };

export class Hooks {
  LitClass: typeof LitElement | null;
  litElement: FunctionalLitComponent | null;

  constructor() {
    this.LitClass = null;
    this.litElement = null;
  }

  useProp(propertyName: string, descriptor: PropertyDeclaration, defaultValue: any = undefined): [any, (value: any) => void] {
    if (!this.LitClass) {
      throw new Error('LitClass is not set previously');
    }

    if (!this.litElement) {
      throw new Error('lit instance is not set previously');
    }

    if (!(this.LitClass.elementProperties.has(propertyName))) {
      this.LitClass.createProperty(propertyName, descriptor);
    }

    if (defaultValue !== undefined && this.litElement[propertyName] === undefined) {
      this.litElement[propertyName] = defaultValue;
    }

    const propertyValueSetter = (value: any) => {
      if (!this.litElement) {
        return;
      }

      this.litElement[propertyName] = value;
    }

    return [this.litElement[propertyName], propertyValueSetter];
  }

  onMount(fn: () => void) {
    if (!this.litElement) {
      throw new Error('cannot find litelement');
    }

    if (this.litElement.isConnected && !this.litElement.mounted) {
      this.litElement.mounted = true;
      // wait the first render to be finished
      setTimeout(() => fn())
    }
  }

  onUnMount(fn: () => void) {
    if (!this.litElement) {
      throw new Error('cannot find litelement');
    }

    this.litElement.onUnMount = fn.bind(this.litElement);
  }

  updated(fn: LitElement['updated']) {
    this.litElement?.setUpdatedHook(fn);
  }

  attributeChangedCallback(fn: LitElement['attributeChangedCallback']) {
    this.litElement?.setAttrChangedHook(fn);
  }
}