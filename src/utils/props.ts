import { LitElement } from "lit";
import { Hooks } from "./hooks";

export type Props = {
  useProp: Hooks['useProp'];
  onMount: Hooks['onMount'];
  onUnMount: Hooks['onUnMount'];
  updated: Hooks['updated'];
  attributeChangedCallback: Hooks['attributeChangedCallback'];
  dispatchEvent: Hooks['dispatchEvent'],
  usePropChanged: Hooks['usePropChanged'],
  meta: LitElement,
}

export function generateProps(hooks: Hooks) {
  return { 
    useProp: hooks.useProp.bind(hooks),
    onUnMount: hooks.onUnMount.bind(hooks),
    onMount: hooks.onMount.bind(hooks),
    updated: hooks.updated.bind(hooks),
    attributeChangedCallback: hooks.attributeChangedCallback.bind(hooks),
    dispatchEvent: hooks.dispatchEvent.bind(hooks),
    usePropChanged: hooks.usePropChanged.bind(hooks),
    meta: hooks.litElement as LitElement
  }
}