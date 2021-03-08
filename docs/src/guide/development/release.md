# Release

It is important to follow the [conventional commits](/guide/development/release.html#conventional-commits) rules of the sematic versioning.

::: tip
Note that the lerna release uses the commit messages to determine the type of changes in the codebase.
The changelog gets generated out of the commit messages.
:::

## Process

1. Create a new git branch.
2. Create a pull request and follow the [conventional commits](/guide/development/release.html#conventional-commits) rules.
3. After merging the github action `.github/release.yml` will release the changes immediately.
   - First it determines the new version out of the git commit messages
   - Then it releases is on npm
   - The changelog is generated out of the git commit messages aswell.

## Conventional Commits

We are following the [Karam Git Message guideliness](http://karma-runner.github.io/5.2/dev/git-commit-msg.html).

Here are some examples of the release type that will be done based on a commit messages:

| Commit message                                                                                                                                                                                   | Release type               |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------- |
| `fix(pencil): stop graphite breaking when too much pressure applied`                                                                                                                             | Patch Release              |
| `feat(pencil): add 'graphiteWidth' option`                                                                                                                                                       | ~~Minor~~ Feature Release  |
| `perf(pencil): remove graphiteWidth option`<br><br>`BREAKING CHANGE: The graphiteWidth option has been removed.`<br>`The default graphite width of 10mm is always used for performance reasons.` | ~~Major~~ Breaking Release |
