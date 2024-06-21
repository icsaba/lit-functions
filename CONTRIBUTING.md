# Contributing

## Git hook

Please add the following git hook that reinforces the use of [conventional commit messages](https://www.conventionalcommits.org/).

## MacOS

```
brew install pre-commit
git config --local init.templateDir $(pwd)/.github
pre-commit install --hook-type commit-msg
```

### Install

Add `"private": true` to the package.json to support `yarn workspaces`.

`yarn install`

### Start

Test your changes with the command:

`yarn start:app:ts`

Or test how it works with JavaScript:

`yarn start:app:js`

Before running the JavaScript app, create a new version locally with:

`yarn build && yarn pack`

### Test

We use vitest and jsdom for testing.

`yarn test:unit`
