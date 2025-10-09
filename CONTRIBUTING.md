# Contributing to Aneka UI

Thank you for your interest in contributing to Aneka UI! This guide will help you get started.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Project Structure](#project-structure)
- [Adding Components](#adding-components)
- [Testing](#testing)
- [Documentation](#documentation)
- [Pull Request Process](#pull-request-process)
- [Coding Guidelines](#coding-guidelines)

## Code of Conduct

This project adheres to a Code of Conduct. By participating, you are expected to uphold this code. Please read [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/aneka-ui.git`
3. Create a new branch: `git checkout -b feature/my-new-feature`
4. Make your changes
5. Run tests: `pnpm test`
6. Commit your changes: `git commit -am 'Add some feature'`
7. Push to the branch: `git push origin feature/my-new-feature`
8. Create a Pull Request

## Development Setup

### Prerequisites

- Node.js 18.0.0+
- pnpm 8.0.0+
- Git

### Installation

```bash
# Clone repository
git clone https://github.com/yourusername/aneka-ui.git
cd aneka-ui

# Install dependencies
pnpm install

# Build packages
pnpm build

# Run tests
pnpm test

# Start development
pnpm dev
```

### Available Scripts

- `pnpm build` - Build all packages
- `pnpm dev` - Start development mode
- `pnpm test` - Run tests
- `pnpm lint` - Lint code
- `pnpm format` - Format code with Prettier
- `pnpm typecheck` - Type check TypeScript

## Project Structure

```
aneka-ui/
├── packages/
│   ├── cli/              # CLI tool
│   └── tokens/           # Design tokens
├── registry/             # Component registry
│   ├── react/           # React components
│   ├── vue/             # Vue components
│   └── angular/         # Angular components
├── docs/                # Documentation site
├── storybook/           # Component playground
├── examples/            # Example applications
├── scripts/             # Build scripts
└── tests/               # Test files
```

## Adding Components

### 1. Generate Component Template

```bash
pnpm generate:component <component-name>
```

This will create component files for all frameworks and styles.

### 2. Implement Component Logic

Follow framework-specific conventions:

#### React
- Use `React.forwardRef`
- Add `displayName`
- Use lowercase file names (e.g., `button.tsx`)
- Export both component and variants

#### Vue
- Use Composition API
- Use PascalCase file names (e.g., `Button.vue`)
- Export props interface

#### Angular
- Use standalone components
- Use lowercase + suffix (e.g., `button.component.ts`)
- Use Angular CDK for complex interactions

### 3. Apply Design System Styles

Use design tokens from `@aneka-ui/tokens`:

**Material Design:**
- Uppercase text (`uppercase`)
- 4px radius (`rounded-[4px]`)
- 200ms transitions
- Elevation shadows

**Apple HIG:**
- Sentence case
- 6px radius (`rounded-md`)
- 150ms transitions
- Scale on press (`active:scale-[0.98]`)
- Subtle shadows

**Samsung One UI:**
- Bold text (`font-semibold`)
- 16px radius (`rounded-2xl`)
- 250ms transitions
- Prominent shadows

### 4. Add Dependencies

Update `COMPONENT_DEPENDENCIES` in `scripts/build-registry.ts`:

```typescript
const COMPONENT_DEPENDENCIES = {
  mycomponent: {
    deps: ["@radix-ui/react-*", "class-variance-authority"],
  },
};
```

### 5. Update Registry Index

Add to `registry/index.json`:

```json
{
  "name": "mycomponent",
  "type": "component",
  "description": "Component description",
  "frameworks": ["react", "vue", "angular"],
  "styles": ["material", "hig", "oneui"]
}
```

### 6. Build and Validate

```bash
# Build registry
pnpm build:registry

# Validate registry
pnpm validate:registry
```

## Testing

### Unit Tests

Write tests using Vitest:

```typescript
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Button } from './button';

describe('Button', () => {
  it('renders correctly', () => {
    const { getByText } = render(<Button>Click me</Button>);
    expect(getByText('Click me')).toBeInTheDocument();
  });
});
```

Run tests:

```bash
pnpm test
```

### Visual Regression Tests

Visual tests use Playwright:

```bash
pnpm test:visual
```

## Documentation

### Component Documentation

Each component should have:

1. **Description**: What the component does
2. **Props/API**: All available props and their types
3. **Examples**: Basic and advanced usage examples
4. **Accessibility**: ARIA attributes and keyboard support
5. **Styling**: Customization options

### Writing Docs

Documentation is in `docs/src/pages/components/`:

```mdx
---
title: Button
description: Button component with multiple variants
---

## Installation

\`\`\`bash
aneka-ui add button
\`\`\`

## Usage

\`\`\`tsx
import { Button } from '@/components/ui/button';

<Button variant="default">Click me</Button>
\`\`\`

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | string | "default" | Button variant |
```

## Pull Request Process

1. **Update Documentation**: Ensure docs are updated
2. **Add Tests**: All new features must have tests
3. **Follow Code Style**: Run `pnpm lint` and `pnpm format`
4. **Update Changelog**: Add entry to `.changeset/`
5. **Describe Changes**: Provide clear PR description

### PR Checklist

- [ ] Tests added/updated
- [ ] Documentation updated
- [ ] Changelog entry added
- [ ] Code formatted and linted
- [ ] All checks passing
- [ ] Screenshots added (for UI changes)

## Coding Guidelines

### TypeScript

- Use strict mode
- Avoid `any` types
- Export types/interfaces
- Use const assertions

### React

- Use functional components
- Use `forwardRef` for components
- Add `displayName`
- Use hooks correctly

### CSS

- Use Tailwind CSS utilities
- Follow design token values
- Avoid custom CSS
- Use `cn()` utility for class merging

### Naming Conventions

- **Files**: lowercase (React), PascalCase (Vue), lowercase+suffix (Angular)
- **Components**: PascalCase
- **Variables**: camelCase
- **Constants**: UPPER_SNAKE_CASE
- **Types**: PascalCase

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
type(scope): subject

body

footer
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Formatting
- `refactor`: Code refactoring
- `test`: Tests
- `chore`: Maintenance

Examples:
```
feat(button): add loading state
fix(dialog): fix focus trap on close
docs(readme): update installation steps
```

## Questions?

- Check existing issues
- Join our Discord
- Open a discussion

Thank you for contributing! 🎉
