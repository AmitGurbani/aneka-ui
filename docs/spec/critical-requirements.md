# Critical Requirements

> **Specification Section:** Non-Negotiable Implementation Rules
> **Last Updated:** October 2025

This document defines all **non-negotiable** requirements that MUST be followed in the Aneka UI project. These requirements ensure consistency, quality, and correctness.

---

## ⚠️ About This Document

**CRITICAL:** These requirements are **mandatory** and **non-negotiable**.

- ✅ **MUST** - Absolute requirement
- ⚠️ **MUST NOT** - Absolute prohibition
- 🔍 **Enforcement** - How it's validated (linting, tests, CI, code review)

**Violations:**

- CI will fail if critical requirements are violated
- Pull requests will be rejected
- Code reviews will catch violations

---

## 1️⃣ React Component Requirements

### 1.1 forwardRef is REQUIRED ✅

**Rule:** All React components that render HTML elements MUST use `React.forwardRef`.

**Rationale:** Users need ref access for DOM manipulation, focus management, and integration with other libraries.

```typescript
// ✅ CORRECT
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, ...props }, ref) => {
    return <button ref={ref} className={className} {...props} />
  }
)

// ❌ WRONG - No forwardRef
const Button = ({ className, ...props }: ButtonProps) => {
  return <button className={className} {...props} />
}
```

**Enforcement:**

- 🔍 Code review
- 🔍 Unit tests verify ref forwarding

### 1.2 displayName is REQUIRED ✅

**Rule:** All React components MUST have `displayName` set.

**Rationale:** Improves debugging in React DevTools and error messages.

```typescript
// ✅ CORRECT
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(...)
Button.displayName = "Button"

// ❌ WRONG - No displayName
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(...)
```

**Enforcement:**

- 🔍 ESLint rule: `react/display-name`
- 🔍 Code review

### 1.3 Named Exports Only ✅

**Rule:** Components MUST use named exports, NOT default exports.

```typescript
// ✅ CORRECT
export { Button, buttonVariants };

// ❌ WRONG - Default export
export default Button;
```

**Rationale:**

- Consistent imports across codebase
- Better refactoring support
- Clearer intent

**Enforcement:**

- 🔍 ESLint rule: `import/no-default-export`

---

## 2️⃣ TypeScript Requirements

### 2.1 Strict Mode REQUIRED ✅

**Rule:** All TypeScript MUST compile with `strict: true`.

```json
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "noImplicitThis": true,
    "alwaysStrict": true
  }
}
```

**Enforcement:**

- 🔍 CI: `pnpm typecheck` fails if violations
- 🔍 Pre-commit hook

### 2.2 Explicit Return Types for Exported Functions ✅

**Rule:** All exported functions/components MUST have explicit return types.

```typescript
// ✅ CORRECT
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

// ❌ WRONG - Implicit return type
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

**Enforcement:**

- 🔍 ESLint rule: `@typescript-eslint/explicit-module-boundary-types`

### 2.3 No `any` Type ⚠️

**Rule:** MUST NOT use `any` type. Use `unknown` or proper types.

```typescript
// ✅ CORRECT
function handleEvent(event: React.MouseEvent<HTMLButtonElement>) {
  // ...
}

// ❌ WRONG - Using any
function handleEvent(event: any) {
  // ...
}
```

**Enforcement:**

- 🔍 ESLint rule: `@typescript-eslint/no-explicit-any` (error level)

---

## 3️⃣ Styling Requirements

### 3.1 CVA for All Variants ✅

**Rule:** All component variants MUST be defined using `class-variance-authority` (CVA).

```typescript
// ✅ CORRECT
import { cva, type VariantProps } from "class-variance-authority"

const buttonVariants = cva(
  "base-classes",
  {
    variants: {
      variant: { default: "...", secondary: "..." },
      size: { sm: "...", lg: "..." }
    }
  }
)

// ❌ WRONG - Conditional classes without CVA
const Button = ({ variant }) => {
  const classes = variant === 'default' ? 'bg-primary' : 'bg-secondary'
  return <button className={classes} />
}
```

**Rationale:**

- Type-safe variants
- Composable variants
- Consistent pattern across all components

**Enforcement:**

- 🔍 Code review

### 3.2 cn() for className Merging ✅

**Rule:** MUST use `cn()` utility to merge classNames.

```typescript
// ✅ CORRECT
<button className={cn(buttonVariants({ variant, size }), className)} />

// ❌ WRONG - Manual concatenation
<button className={`${buttonVariants({ variant, size })} ${className}`} />

// ❌ WRONG - clsx without tailwind-merge
<button className={clsx(buttonVariants({ variant, size }), className)} />
```

**Rationale:**

- Prevents Tailwind class conflicts (e.g., `px-4 px-2` → `px-2`)
- Handles conditional classes properly

**Enforcement:**

- 🔍 Code review

### 3.3 No Inline Styles ⚠️

**Rule:** MUST NOT use inline `style` prop. Use Tailwind classes.

```typescript
// ✅ CORRECT
<div className="w-32 h-32 bg-primary" />

// ❌ WRONG - Inline styles
<div style={{ width: 32, height: 32, backgroundColor: 'blue' }} />
```

**Exceptions:**

- Dynamic values that cannot be expressed in Tailwind (rare)

**Enforcement:**

- 🔍 Code review

### 3.4 Dark Mode Support REQUIRED ✅

**Rule:** All components MUST support dark mode using `dark:` prefix.

```typescript
// ✅ CORRECT
"bg-background text-foreground dark:bg-background-dark dark:text-foreground-dark";

// ❌ WRONG - No dark mode classes
"bg-white text-black";
```

**Enforcement:**

- 🔍 Visual regression tests in dark mode
- 🔍 Code review

---

## 4️⃣ File Naming Requirements

### 4.1 Framework-Specific Naming REQUIRED ✅

**Rule:** File naming MUST follow framework conventions.

| Framework   | Convention                 | Example               |
| ----------- | -------------------------- | --------------------- |
| **React**   | kebab-case                 | `button.tsx`          |
| **Vue**     | PascalCase                 | `Button.vue`          |
| **Angular** | kebab-case + .component.ts | `button.component.ts` |

**Enforcement:**

- 🔍 Registry validation script
- 🔍 CI checks

### 4.2 Component Names Match File Names ✅

**Rule:** Component name MUST match file name.

```typescript
// ✅ CORRECT
// File: button.tsx
export const Button = ...

// ❌ WRONG
// File: button.tsx
export const MyButton = ...
```

**Enforcement:**

- 🔍 Code review

---

## 5️⃣ Accessibility Requirements

### 5.1 ARIA Attributes REQUIRED ✅

**Rule:** All interactive components MUST have proper ARIA attributes.

```typescript
// ✅ CORRECT - Dialog with proper ARIA
<Dialog>
  <DialogContent aria-labelledby="dialog-title" aria-describedby="dialog-description">
    <DialogTitle id="dialog-title">Title</DialogTitle>
    <DialogDescription id="dialog-description">Description</DialogDescription>
  </DialogContent>
</Dialog>

// ❌ WRONG - Missing ARIA attributes
<div className="dialog">
  <h2>Title</h2>
  <p>Description</p>
</div>
```

**Enforcement:**

- 🔍 Automated accessibility tests (jest-axe)
- 🔍 Code review

### 5.2 Keyboard Navigation REQUIRED ✅

**Rule:** All interactive components MUST be keyboard accessible.

**Requirements:**

- Focusable with Tab
- Activatable with Enter/Space
- Closable with Escape (for modals/dialogs)
- Arrow key navigation (where applicable)

**Enforcement:**

- 🔍 Unit tests verify keyboard interactions
- 🔍 Manual testing

### 5.3 Focus Management REQUIRED ✅

**Rule:** Components MUST manage focus properly.

**Requirements:**

- Focus indicators visible
- Focus trap in modals
- Focus return after modal close
- Skip to content links

**Enforcement:**

- 🔍 Visual regression tests show focus rings
- 🔍 Unit tests verify focus behavior

---

## 6️⃣ CLI Requirements

### 6.1 Monorepo Detection REQUIRED ✅

**Rule:** CLI MUST detect monorepos and let users choose target package.

**Detection Methods:**

- Check for `pnpm-workspace.yaml`
- Check for `lerna.json`
- Check for `turbo.json`
- Check for `nx.json`

**Enforcement:**

- 🔍 CLI unit tests
- 🔍 Integration tests with monorepo fixtures

### 6.2 Dependency Auto-Install REQUIRED ✅

**Rule:** CLI MUST auto-install missing dependencies.

```bash
# User runs:
aneka-ui add button

# CLI must:
# 1. Detect missing dependencies (@radix-ui/react-slot, etc.)
# 2. Detect package manager (npm/pnpm/yarn/bun)
# 3. Auto-install: pnpm add @radix-ui/react-slot
```

**Enforcement:**

- 🔍 CLI integration tests

### 6.3 Conflict Handling REQUIRED ✅

**Rule:** CLI MUST handle file conflicts with interactive prompts.

**Options:**

- Overwrite
- Skip
- Show diff
- Cancel

**Flags:**

- `--overwrite` skips prompts, overwrites all
- `--skip` skips prompts, skips all existing files

**Enforcement:**

- 🔍 CLI integration tests

---

## 7️⃣ Version Requirements

### 7.1 Minimum Version Enforcement ✅

**Rule:** CLI MUST validate minimum versions.

| Dependency   | Minimum Version |
| ------------ | --------------- |
| Node.js      | 18.0.0          |
| TypeScript   | 5.0.0           |
| Tailwind CSS | 3.4.0           |
| React        | 18.0.0          |
| Vue          | 3.3.0           |
| Angular      | 17.0.0          |

**Enforcement:**

- 🔍 CLI: `doctor` command checks versions
- 🔍 CLI: `init` command validates before setup

---

## 8️⃣ Testing Requirements

### 8.1 Minimum Coverage REQUIRED ✅

**Rule:** Code coverage MUST meet minimum thresholds.

| Metric     | Minimum |
| ---------- | ------- |
| Lines      | 80%     |
| Functions  | 80%     |
| Branches   | 75%     |
| Statements | 80%     |

**Enforcement:**

- 🔍 CI fails if coverage below threshold
- 🔍 Vitest config enforces thresholds

### 8.2 Component Tests REQUIRED ✅

**Rule:** All components MUST have unit tests covering:

- ✅ Rendering
- ✅ All variants
- ✅ All sizes
- ✅ Props
- ✅ Events
- ✅ Ref forwarding (React)
- ✅ Disabled state
- ✅ Dark mode

**Enforcement:**

- 🔍 Code review checklist
- 🔍 Coverage report

### 8.3 Visual Regression Tests REQUIRED ✅

**Rule:** All components MUST have Playwright visual tests.

**Test Cases:**

- Default state
- Hover state
- Focus state
- Disabled state
- Dark mode
- All variants

**Enforcement:**

- 🔍 CI runs Playwright tests
- 🔍 Visual diffs reviewed in PR

---

## 9️⃣ Documentation Requirements

### 9.1 Component Documentation REQUIRED ✅

**Rule:** All components MUST have:

- Description
- Props table
- Usage examples
- Variant examples
- Accessibility notes

**Enforcement:**

- 🔍 Code review

### 9.2 JSDoc Comments REQUIRED ✅

**Rule:** All exported types and functions MUST have JSDoc comments.

```typescript
/**
 * Material Design Button Component
 *
 * @example
 * <Button variant="default">Click me</Button>
 */
export const Button = ...
```

**Enforcement:**

- 🔍 ESLint rule: `jsdoc/require-jsdoc`

---

## 🔟 Git & Release Requirements

### 10.1 Conventional Commits REQUIRED ✅

**Rule:** All commits MUST follow [Conventional Commits](https://www.conventionalcommits.org/).

**Format:** `<type>(<scope>): <subject>`

**Types:**

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Formatting
- `refactor`: Code refactoring
- `test`: Tests
- `chore`: Maintenance

**Examples:**

```
feat(button): add loading state
fix(dialog): prevent body scroll on open
docs(readme): update installation instructions
```

**Enforcement:**

- 🔍 Husky commit-msg hook validates format
- 🔍 CI checks commit messages

### 10.2 Changesets REQUIRED ✅

**Rule:** All PRs with code changes MUST include a changeset.

```bash
pnpm changeset
```

**Enforcement:**

- 🔍 CI checks for changeset file
- 🔍 GitHub Action adds comment to PR if missing

---

## 📋 Checklist for New Components

Before submitting a new component:

### Code

- [ ] React: Uses `forwardRef` and `displayName`
- [ ] TypeScript strict mode, no `any`
- [ ] CVA for variants, `cn()` for className merging
- [ ] Dark mode support (`dark:` classes)
- [ ] File naming matches framework convention

### Accessibility

- [ ] Proper ARIA attributes
- [ ] Keyboard navigation works
- [ ] Focus management implemented
- [ ] Focus indicators visible

### Testing

- [ ] Unit tests cover all requirements
- [ ] Visual regression tests added
- [ ] Coverage meets thresholds (80%+)

### Documentation

- [ ] Component documented in docs site
- [ ] JSDoc comments added
- [ ] Usage examples provided
- [ ] Props table complete

### Git

- [ ] Conventional commit message
- [ ] Changeset added
- [ ] CI passes

---

## 📚 Related Specifications

- [Overview & Philosophy](./overview.md) - Core principles
- [Components](./components.md) - Component specifications
- [File Conventions](./file-conventions.md) - Naming rules
- [Testing Requirements](./testing-requirements.md) - Testing details

---

**These critical requirements ensure Aneka UI maintains the highest standards of quality, consistency, and usability.**
