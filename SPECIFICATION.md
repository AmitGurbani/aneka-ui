# Aneka UI - Complete Project Specification

> **Version:** 1.0.0
> **Last Updated:** October 2025
> **Status:** Master Specification Document

This document serves as the comprehensive specification for the Aneka UI project - a framework-agnostic component library providing authentic Material Design, Apple HIG, and Samsung One UI patterns that adapt to user's brand colors.

---

## 📚 Table of Contents

1. [Overview & Philosophy](./docs/spec/overview.md)
2. [Architecture & Project Structure](./docs/spec/architecture.md)
3. [Technology Stack](./docs/spec/technology-stack.md)
4. [Design Tokens](./docs/spec/design-tokens.md)
5. [Component Specifications](./docs/spec/components.md)
6. [CLI Specification](./docs/spec/cli-specification.md)
7. [File & Naming Conventions](./docs/spec/file-conventions.md)
8. [Testing Requirements](./docs/spec/testing-requirements.md)
9. [CI/CD Requirements](./docs/spec/ci-cd-requirements.md)
10. [Critical Requirements](./docs/spec/critical-requirements.md)

---

## 🎯 Quick Reference

### Project Identity

- **Name:** Aneka UI
- **Tagline:** "Design system patterns with YOUR brand colors"
- **Approach:** CLI-based copy-paste (like Shadcn UI)
- **Frameworks:** React, Vue, Angular
- **Styling:** Tailwind CSS (direct colors, no CSS variables)
- **Language:** TypeScript only (strict mode)

### Core Principles

1. **Design System PATTERNS, Not Colors**
   - Provide Material/HIG/OneUI spacing, typography, motion
   - Users provide their own brand colors via Tailwind config
   - Components adapt to user's colors

2. **Copy-Paste Ownership**
   - Not an npm package dependency
   - Components copied to user's project
   - User owns and modifies code

3. **Framework-Native**
   - React components are true React (with forwardRef)
   - Vue components are true Vue SFCs (Composition API)
   - Angular components are standalone Angular components

### Launch Deliverables

- **5 Components:** Button, Card, Badge, Dialog, Tooltip
- **3 Design Systems:** Material Design, Apple HIG, Samsung One UI
- **3 Frameworks:** React, Vue, Angular
- **Total Component Files:** 45 (5 × 3 × 3)
- **6 CLI Commands:** init, add, list, diff, update, doctor

---

## 📋 Specification Documents

### 1. [Overview & Philosophy](./docs/spec/overview.md)

Detailed explanation of project goals, core philosophy, design approach, and target audience.

**Key Topics:**

- Project mission and vision
- Design system patterns vs. implementation
- Copy-paste ownership model
- Framework-agnostic approach

### 2. [Architecture & Project Structure](./docs/spec/architecture.md)

Complete monorepo structure, package organization, and directory layout.

**Key Topics:**

- Monorepo workspace configuration
- Package structure (cli, tokens)
- Registry organization
- Documentation and examples setup
- Build system architecture

### 3. [Technology Stack](./docs/spec/technology-stack.md)

All technology decisions, version requirements, and tooling specifications.

**Key Topics:**

- Build & tooling (pnpm, Turborepo, TypeScript)
- Styling (Tailwind CSS, CVA, clsx, tailwind-merge)
- Accessibility (Radix UI, radix-vue, Angular CDK)
- CLI tools (Commander, Inquirer, Ora)
- Quality tools (ESLint, Prettier, Husky, Vitest)
- Documentation (Astro, Storybook)

### 4. [Design Tokens](./docs/spec/design-tokens.md)

Complete design token specifications for Material Design, Apple HIG, and Samsung One UI.

**Key Topics:**

- Material Design tokens (spacing, radius, shadows, typography, motion)
- Apple HIG tokens (subtle shadows, spring-like motion)
- Samsung One UI tokens (generous spacing, prominent shadows)
- Token structure and TypeScript implementation

### 5. [Component Specifications](./docs/spec/components.md)

Detailed specifications for all 5 launch components with code examples.

**Key Topics:**

- Button (variants, sizes, all 3 design systems)
- Card (compound components, sub-components)
- Badge (variants, design system differences)
- Dialog (Radix/CDK integration, accessibility)
- Tooltip (hover delay, keyboard support)
- Complete React/Vue/Angular code examples

### 6. [CLI Specification](./docs/spec/cli-specification.md)

Complete CLI command specifications with flows, prompts, and error handling.

**Key Topics:**

- init command (environment detection, config creation)
- add command (component installation, conflict handling)
- list command (available/installed status)
- diff command (version comparison, changelog)
- update command (component updates, dependency management)
- doctor command (diagnostics, auto-fix)
- Config file format (aneka-ui.json)

### 7. [File & Naming Conventions](./docs/spec/file-conventions.md)

Framework-specific file naming and code organization conventions.

**Key Topics:**

- React: lowercase files (button.tsx)
- Vue: PascalCase files (Button.vue)
- Angular: lowercase + suffix (button.component.ts)
- Directory structure conventions
- Import/export patterns

### 8. [Testing Requirements](./docs/spec/testing-requirements.md)

Testing strategy, coverage requirements, and testing tools.

**Key Topics:**

- Unit testing with Vitest (80%+ coverage)
- Visual regression with Playwright
- Component testing strategy
- Test organization
- CI/CD integration

### 9. [CI/CD Requirements](./docs/spec/ci-cd-requirements.md)

GitHub Actions workflow specifications and automation requirements.

**Key Topics:**

- CI workflow (lint, typecheck, test)
- Test workflow (unit + visual regression)
- Deploy docs workflow (GitHub Pages)
- Release workflow (Changesets)
- Automation requirements

### 10. [Critical Requirements](./docs/spec/critical-requirements.md)

Non-negotiable implementation rules and quality standards.

**Key Topics:**

- React forwardRef and displayName requirements
- Dark mode support (all components)
- File naming enforcement
- Monorepo detection requirements
- Dependency management rules
- TypeScript strict mode
- CVA usage for variants

---

## 🚀 Getting Started with the Specification

### For New Contributors

1. Start with [Overview & Philosophy](./docs/spec/overview.md) to understand the project's core principles
2. Review [Architecture](./docs/spec/architecture.md) to understand the codebase structure
3. Read [Critical Requirements](./docs/spec/critical-requirements.md) to understand non-negotiable rules
4. Dive into specific sections based on your area of contribution

### For Component Development

1. Review [Design Tokens](./docs/spec/design-tokens.md) for styling guidelines
2. Study [Component Specifications](./docs/spec/components.md) for implementation patterns
3. Follow [File & Naming Conventions](./docs/spec/file-conventions.md) strictly
4. Ensure [Testing Requirements](./docs/spec/testing-requirements.md) are met

### For CLI Development

1. Review [CLI Specification](./docs/spec/cli-specification.md) for command flows
2. Study [Technology Stack](./docs/spec/technology-stack.md) for tooling choices
3. Follow [Critical Requirements](./docs/spec/critical-requirements.md) for validation rules

---

## 📝 Specification Maintenance

This specification is a living document and should be updated as the project evolves:

- **Version Control:** All changes to specifications are tracked via Git
- **Review Process:** Specification changes require approval from maintainers
- **Breaking Changes:** Must be clearly documented with migration guides
- **Additions:** New features must be specified before implementation

### Updating the Specification

1. Make changes to relevant specification document(s)
2. Update this master document's Table of Contents if needed
3. Increment version number if making breaking changes
4. Submit PR with clear explanation of specification changes
5. Ensure implementation aligns with updated specification

---

## 🔗 Related Documentation

- [README.md](./README.md) - Project introduction and quick start
- [CONTRIBUTING.md](./CONTRIBUTING.md) - Contribution guidelines
- [PROJECT_STATUS.md](./PROJECT_STATUS.md) - Current implementation status
- [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md) - Community guidelines

---

## 📮 Questions or Feedback

If you have questions about the specification or suggestions for improvements:

1. Open an issue on GitHub with the `specification` label
2. Start a discussion in GitHub Discussions
3. Propose changes via pull request with clear rationale

---

**This specification document is the single source of truth for the Aneka UI project. All implementation must align with these specifications.**
