# Technical Debt & Future Improvements

> This document tracks technical debt and improvements to be made later

## ~~ESLint Configuration~~ ✅ **RESOLVED**

### ~~Re-enable Advanced Linting Rules~~ ✅ **COMPLETED (2025-10-11)**

**Status:** Successfully restored ESLint import plugin and rules

**What was restored:**

1. ✅ **eslint-plugin-import** - Import validation and organization
2. ✅ **eslint-import-resolver-typescript** - TypeScript path resolution in monorepo
3. ✅ **Import order rules** - Enforces consistent import ordering with alphabetization
4. ✅ **Import validation** - Checks for unresolved imports and duplicates

**Changes made:**
- Installed `eslint-plugin-import` and `eslint-import-resolver-typescript`
- Updated `.eslintrc.json` with import plugin configuration
- Configured TypeScript resolver with workspace paths
- Auto-fixed all import ordering issues across CLI and tokens packages
- Refactored `validate-versions.ts` to use named imports from `semver`

**Benefits achieved:**
- ✅ Validates that all imports exist and are resolvable
- ✅ Enforces consistent import ordering (builtin → external → internal → parent → sibling → index)
- ✅ Alphabetizes imports for better readability
- ✅ Catches duplicate imports
- ✅ Provides better TypeScript path resolution in monorepo

---

## Package Updates - Deferred Items

### @types/diff

- Attempted: v8.0.0
- Current: v5.2.3
- Reason: Breaking changes in v8 type definitions
- TODO: Update when CLI code is refactored to support new types

---

## Future Improvements (Optional)

### Type-Aware Linting

**Consideration for future:** Enable stricter type-aware linting rules

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

**Why deferred:** Requires TypeScript project references and can slow down linting significantly in large monorepos. Current setup already provides good type safety through TypeScript compiler itself.

**When to consider:** If team wants extra strictness beyond TypeScript compiler checks.

---

## Last Updated

2025-10-11
