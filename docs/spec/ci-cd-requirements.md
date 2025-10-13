# CI/CD Requirements

> **Specification Section:** Continuous Integration & Deployment
> **Last Updated:** October 2025

This document defines all CI/CD workflows, automation requirements, and deployment processes for the Aneka UI project.

---

## 🎯 CI/CD Goals

1. **Quality Assurance:** Catch issues before they reach main branch
2. **Automation:** Reduce manual work through automation
3. **Fast Feedback:** Developers get quick feedback on changes
4. **Reliable Releases:** Consistent, predictable releases
5. **Documentation:** Auto-deploy documentation on changes

---

## 🔄 GitHub Actions Workflows

### Required Workflows

| Workflow            | Trigger           | Purpose                |
| ------------------- | ----------------- | ---------------------- |
| **ci.yml**          | Push, PR          | Lint, typecheck, build |
| **test.yml**        | Push, PR          | Unit + visual tests    |
| **deploy-docs.yml** | Push to main      | Deploy documentation   |
| **release.yml**     | Workflow dispatch | Publish packages       |

---

## 1️⃣ CI Workflow (ci.yml)

### Purpose

Run linting, type checking, and builds on every push and PR.

### Complete Workflow

```yaml
name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true

jobs:
  lint:
    name: Lint
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 9

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: "pnpm"

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Run ESLint
        run: pnpm lint

      - name: Check formatting
        run: pnpm format:check

  typecheck:
    name: Type Check
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 9

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: "pnpm"

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Run TypeScript
        run: pnpm typecheck

  build:
    name: Build
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 9

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: "pnpm"

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Build packages
        run: pnpm build

      - name: Upload build artifacts
        uses: actions/upload-artifact@v3
        with:
          name: dist
          path: |
            packages/*/dist
            registry/dist
```

---

## 2️⃣ Test Workflow (test.yml)

### Purpose

Run unit tests and visual regression tests.

### Complete Workflow

```yaml
name: Tests

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true

jobs:
  unit-tests:
    name: Unit Tests
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [18, 20]
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 9

      - name: Setup Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node-version }}
          cache: "pnpm"

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Run unit tests
        run: pnpm test:coverage

      - name: Upload coverage to Codecov
        if: matrix.node-version == 20
        uses: codecov/codecov-action@v3
        with:
          files: ./coverage/lcov.info
          flags: unittests
          name: codecov-unit

  visual-tests:
    name: Visual Regression Tests
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 9

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: "pnpm"

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Install Playwright browsers
        run: pnpm exec playwright install --with-deps

      - name: Run visual tests
        run: pnpm test:visual

      - name: Upload test results
        if: always()
        uses: actions/upload-artifact@v3
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 30

      - name: Upload failed screenshots
        if: failure()
        uses: actions/upload-artifact@v3
        with:
          name: playwright-screenshots
          path: test-results/
          retention-days: 7
```

---

## 3️⃣ Deploy Docs Workflow (deploy-docs.yml)

### Purpose

Deploy documentation site to GitHub Pages on every push to main.

### Complete Workflow

```yaml
name: Deploy Documentation

on:
  push:
    branches: [main]
    paths:
      - "docs/**"
      - "registry/**"
      - ".github/workflows/deploy-docs.yml"
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    name: Build Documentation
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 9

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: "pnpm"

      - name: Setup Pages
        uses: actions/configure-pages@v3

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Build documentation
        run: pnpm --filter @aneka-ui/docs build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v2
        with:
          path: docs/.vitepress/dist

  deploy:
    name: Deploy to GitHub Pages
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v2
```

---

## 4️⃣ Release Workflow (release.yml)

### Purpose

Publish packages to npm using Changesets.

### Complete Workflow

```yaml
name: Release

on:
  push:
    branches: [main]
  workflow_dispatch:

concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: false

jobs:
  release:
    name: Release
    runs-on: ubuntu-latest
    permissions:
      contents: write
      pull-requests: write
      id-token: write
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Setup pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 9

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: "pnpm"
          registry-url: "https://registry.npmjs.org"

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Build packages
        run: pnpm build

      - name: Create Release Pull Request or Publish
        id: changesets
        uses: changesets/action@v1
        with:
          publish: pnpm release
          version: pnpm changeset version
          commit: "chore: version packages"
          title: "chore: version packages"
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          NPM_TOKEN: ${{ secrets.NPM_TOKEN }}
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}

      - name: Send Slack notification
        if: steps.changesets.outputs.published == 'true'
        uses: slackapi/slack-github-action@v1
        with:
          payload: |
            {
              "text": "New Aneka UI packages published!",
              "blocks": [
                {
                  "type": "section",
                  "text": {
                    "type": "mrkdwn",
                    "text": "📦 *Aneka UI Release*\n${{ steps.changesets.outputs.publishedPackages }}"
                  }
                }
              ]
            }
        env:
          SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK_URL }}
```

---

## 🔐 Required Secrets

### GitHub Secrets to Configure

| Secret              | Purpose               | How to Get                                            |
| ------------------- | --------------------- | ----------------------------------------------------- |
| `NPM_TOKEN`         | Publish to npm        | Generate at npmjs.com → Settings → Access Tokens      |
| `CODECOV_TOKEN`     | Upload coverage       | Generate at codecov.io → Settings → Upload Token      |
| `SLACK_WEBHOOK_URL` | Release notifications | Create at api.slack.com/messaging/webhooks (optional) |

---

## 🚨 Branch Protection Rules

### Main Branch Protection

```yaml
Protection Rules for 'main':
  ✓ Require pull request before merging
    ✓ Require approvals: 1
    ✓ Dismiss stale reviews when new commits are pushed
    ✓ Require review from Code Owners
  ✓ Require status checks to pass before merging
    Required checks:
      - lint
      - typecheck
      - build
      - unit-tests (Node 18)
      - unit-tests (Node 20)
      - visual-tests
  ✓ Require conversation resolution before merging
  ✓ Require signed commits
  ✓ Require linear history
  ✓ Do not allow bypassing the above settings
```

---

## 📊 Status Badges

### README Badges

```markdown
[![CI](https://github.com/username/aneka-ui/actions/workflows/ci.yml/badge.svg)](https://github.com/username/aneka-ui/actions/workflows/ci.yml)
[![Tests](https://github.com/username/aneka-ui/actions/workflows/test.yml/badge.svg)](https://github.com/username/aneka-ui/actions/workflows/test.yml)
[![codecov](https://codecov.io/gh/username/aneka-ui/branch/main/graph/badge.svg)](https://codecov.io/gh/username/aneka-ui)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
```

---

## 🔄 Release Process

### Using Changesets

**1. Developer adds changeset:**

```bash
pnpm changeset

# Follow prompts:
# - Which packages changed? (select with space)
# - What kind of change? (patch/minor/major)
# - Write summary
```

**2. CI creates version PR:**

- Changesets bot detects changeset files
- Opens PR titled "chore: version packages"
- Updates package.json versions
- Updates CHANGELOG.md files

**3. Maintainer reviews and merges:**

- Review version bumps
- Review changelogs
- Merge PR to main

**4. CI publishes to npm:**

- Release workflow triggers
- Builds packages
- Publishes to npm
- Creates GitHub releases
- Sends notifications

---

## 📚 Related Specifications

- [Testing Requirements](./testing-requirements.md) - Tests run in CI
- [Architecture](./architecture.md) - Build system
- [Critical Requirements](./critical-requirements.md) - Quality gates

---

**Robust CI/CD ensures consistent quality and reliable releases for Aneka UI.**
