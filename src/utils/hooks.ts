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

  useProp<Type, TypeHint>(propertyName: string, descriptor: PropertyDeclaration<Type, TypeHint>, defaultValue: Type): [Type, (value: Type) => void] {
    if (!this.LitClass) {
      throw new Error('LitClass is not set previously');
    }

    if (!this.litElement) {
      throw new Error('lit instance is not set previously');
    }

    if (!(this.LitClass.elementProperties.has(propertyName))) {
      this.LitClass.createProperty(propertyName, descriptor as PropertyDeclaration);
    }

    if (defaultValue !== undefined && this.litElement[propertyName] === undefined) {
      this.litElement[propertyName] = defaultValue;
    }

    const propertyValueSetter = (value: Type) => {
      if (!this.litElement) {
        return;
      }

      this.litElement[propertyName] = value;
    }

    return [this.litElement[propertyName] as Type, propertyValueSetter];
  }

  onMount(fn: LitElement['connectedCallback']) {
    if (!this.litElement) {
      throw new Error('cannot find litelement');
    }

    if (this.litElement.isConnected && !this.litElement.mounted) {
      this.litElement.mounted = true;
      // wait the first render to be finished
      setTimeout(() => fn())
    }
  }

  onUnMount(fn: LitElement['disconnectedCallback']) {
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

  dispatchEvent<T>(event: CustomEvent<T>) {
    this.litElement?.dispatchEvent(event);
  }

  usePropChanged(callback: Function, dependencies: string[]) {
    this.litElement?.usePropChanged(callback, dependencies);
  }
}