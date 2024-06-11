import { LitElement, PropertyDeclaration } from "lit";

export type FunctionalLitComponent = LitElement & { [key: string]: unknown };

export class Hooks {
  LitClass: typeof LitElement | null;
  litElement: FunctionalLitComponent | null;

  constructor() {
    this.LitClass = null;
    this.litElement = null;
  }

  useProps(propertyName: string, descriptor: PropertyDeclaration, defaultValue: any = undefined): [any, (value: any) => void] {
    if (!this.LitClass) {
      throw new Error('LitClass is not set previously');
    }

    if(!this.litElement) {
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

  useStyle() {

  }
}