# Contributing

## Git hook

Please add the following git hook that reinforces the use of [conventional commit messages](https://www.conventionalcommits.org/).

## MacOS

```
brew install pre-commit
git config --local init.templateDir $(pwd)/.github
pre-commit install --hook-type commit-msg
```
