import { LitElement, PropertyValues } from "lit";

export type ObservedAttribute = { dependencies: string[], callback: Function };

export default abstract class BaseElement extends LitElement {
  mounted: boolean = false;
  observedProperties: Map<string, ObservedAttribute> = new Map();
  updatedCallback: LitElement['updated'] | null = null;

  onUnMount() {}

  disconnectedCallback() {
    super.disconnectedCallback();

    this.onUnMount();
  }

  updated(changedProperties: PropertyValues) {
    super.updated(changedProperties);
    
    this.observedProperties.forEach(
      ({dependencies, callback}) => {
        if (dependencies.every( dep => changedProperties.has(dep) && changedProperties.get(dep) !== undefined )) {
          callback();
        }
      }
    )

    if (this.updatedCallback) {
      this.updatedCallback(changedProperties);
    }
  }

  usePropChanged(callback: Function, dependencies: string[]) {
    const cacheKey = dependencies.join('-');
    
    // we should set it every time
    // otherwise the callback's closure is gonna be a snapshot
    this.observedProperties.set(cacheKey, {dependencies, callback});
  }

  setUpdatedHook(fn: LitElement['updated']) {
    this.updatedCallback = fn.bind(this);
  }

  setAttrChangedHook(fn: LitElement['attributeChangedCallback']) {
    this.attributeChangedCallback = fn.bind(this);
  }
}