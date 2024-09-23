import { expect, describe, test } from 'vitest'
import { toDashedString } from './utils';

describe('utils', () => {
  test.each([
    { componentName: 'MyComponent', expected: 'my-component' },
    { componentName: 'myComponent', expected: 'my-component' },
    { componentName: 'myComponentName', expected: 'my-component-name' },
    { componentName: 'FooBazBar', expected: 'foo-baz-bar' }
  ])('componentName $componentName should be dashed $expected', ({ componentName, expected }) => {
    const dashedName = toDashedString(componentName);

    expect(dashedName).toBe(expected)
  })
});