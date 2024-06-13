import { LitElement } from "lit";

export default abstract class BaseElement extends LitElement {
  mounted: boolean = false;

  onUnMount() {}

  disconnectedCallback() {
    super.disconnectedCallback();

    this.onUnMount();
  }

  setUpdatedHook(fn: LitElement['updated']) {
    this.updated = fn.bind(this);
  }

  setAttrChangedHook(fn: LitElement['attributeChangedCallback']) {
    this.attributeChangedCallback = fn.bind(this);
  }
}