# Technical Debt & Future Improvements

> This document tracks technical debt and improvements to be made later

## ESLint Configuration

### Re-enable Advanced Linting Rules (TODO)

**When:** After upgrading to ESLint 9 with flat config (better monorepo support)

**What to restore:**

1. **eslint-plugin-import** - Import validation and organization
   ```json
   {
     "plugins": ["import"],
     "extends": [
       "plugin:import/recommended",
       "plugin:import/typescript"
     ]
   }
   ```

2. **Type-aware linting rules**
   ```json
   {
     "extends": [
       "plugin:@typescript-eslint/recommended-requiring-type-checking"
     ],
     "parserOptions": {
       "project": true
     }
   }
   ```

3. **Import order rules**
   ```json
   {
     "rules": {
       "import/order": ["error", {
         "groups": ["builtin", "external", "internal", "parent", "sibling", "index"],
         "newlines-between": "always",
         "alphabetize": { "order": "asc" }
       }]
     }
   }
   ```

**Why removed:** Configuration issues with TypeScript resolver in monorepo setup

**Benefits when restored:**
- Validates imports exist
- Enforces consistent import ordering
- Catches unsafe `any` usage
- Better type safety checking
- Prevents circular dependencies

---

## Package Updates - Deferred Items

### @types/diff
- Attempted: v8.0.0
- Current: v5.2.3
- Reason: Breaking changes in v8 type definitions
- TODO: Update when CLI code is refactored to support new types

---

*Last updated: 2025-10-11*
