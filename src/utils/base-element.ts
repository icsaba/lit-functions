import { LitElement } from "lit";

export default abstract class BaseElement extends LitElement {
  mounted: boolean = false;

  onUnMount() {}

  disconnectedCallback() {
    super.disconnectedCallback();

    this.onUnMount();
  }
}