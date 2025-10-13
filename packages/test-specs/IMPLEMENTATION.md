# Test Consolidation Implementation Guide

## Problem

Currently, we have **highly duplicated tests** across three frameworks:

- React: 93 button tests
- Vue: 92 button tests
- Angular: 63 button tests

**Total: 248 tests** with ~80% duplication across frameworks.

## Solution

Create a **declarative, framework-agnostic test specification** system that:

1. Defines tests once in JSON format
2. Uses framework-specific runners to execute tests
3. Reduces duplication by ~70%

## Architecture

```
┌─────────────────────────────────┐
│   Test Specifications (JSON)    │
│   @aneka-ui/test-specs          │
│                                  │
│   ├── material/button.spec.json │
│   ├── hig/button.spec.json      │
│   └── oneui/button.spec.json    │
└─────────────────────────────────┘
                 │
                 ├──────────────┬──────────────┐
                 ▼              ▼              ▼
┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐
│  React Runner    │  │   Vue Runner     │  │ Angular Runner   │
│  (Vitest + RTL)  │  │ (Vitest + VTU)   │  │  (Jest + ATL)    │
└──────────────────┘  └──────────────────┘  └──────────────────┘
```

## Implementation Steps

### Phase 1: Specification Layer ✅ COMPLETE

- [x] Create JSON schema for test specifications
- [x] Create Material Design button specification
- [x] Document assertion types and actions
- [x] Add package.json and README

### Phase 2: Test Runners (Next Step)

#### React Runner

```typescript
// packages/test-runner-react/src/runner.ts
import { render, screen } from '@testing-library/react';
import { runTestSpec } from './spec-runner';

export function generateReactTests(spec: TestSpec, Component: any) {
  describe(spec.description, () => {
    Object.entries(spec.tests).forEach(([category, tests]) => {
      describe(category, () => {
        tests.forEach(test => {
          it(test.name, () => {
            const { container } = render(
              <Component {...test.props}>
                {test.children}
              </Component>
            );
            runAssertions(test.assertions, container);
          });
        });
      });
    });
  });
}
```

#### Vue Runner

```typescript
// packages/test-runner-vue/src/runner.ts
import { mount } from "@vue/test-utils";
import { runTestSpec } from "./spec-runner";

export function generateVueTests(spec: TestSpec, Component: any) {
  describe(spec.description, () => {
    Object.entries(spec.tests).forEach(([category, tests]) => {
      describe(category, () => {
        tests.forEach((test) => {
          it(test.name, () => {
            const wrapper = mount(Component, {
              props: test.props,
              slots: { default: test.children },
            });
            runAssertions(test.assertions, wrapper);
          });
        });
      });
    });
  });
}
```

#### Angular Runner

```typescript
// packages/test-runner-angular/src/runner.ts
import { TestBed } from "@angular/core/testing";
import { runTestSpec } from "./spec-runner";

export function generateAngularTests(spec: TestSpec, Component: any) {
  describe(spec.description, () => {
    let fixture, component, compiled;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [Component],
      }).compileComponents();

      fixture = TestBed.createComponent(Component);
      component = fixture.componentInstance;
      compiled = fixture.nativeElement;
    });

    Object.entries(spec.tests).forEach(([category, tests]) => {
      describe(category, () => {
        tests.forEach((test) => {
          it(test.name, () => {
            Object.assign(component, test.props);
            fixture.detectChanges();
            runAssertions(test.assertions, compiled);
          });
        });
      });
    });
  });
}
```

### Phase 3: Usage in Test Files

#### Before (Duplicated)

```typescript
// React test - 200+ lines
it("should render filled variant", () => {
  render(<Button variant="filled">Filled</Button>);
  expect(screen.getByRole("button")).toHaveClass("bg-primary");
});

// Vue test - 200+ lines (same logic, different API)
it("should render filled variant", () => {
  const wrapper = mount(Button, {
    props: { variant: "filled" },
    slots: { default: "Filled" }
  });
  expect(wrapper.classes()).toContain("bg-primary");
});

// Angular test - 200+ lines (same logic, different API)
it("should render filled variant", () => {
  component.variant = "filled";
  fixture.detectChanges();
  expect(button?.classList.contains("bg-primary")).toBe(true);
});
```

#### After (Consolidated)

```typescript
// React test - ~10 lines
import { generateReactTests } from "@aneka-ui/test-runner-react";
import { Button } from "@/components/material/button";
import buttonSpec from "@aneka-ui/test-specs/material/button.spec.json";

generateReactTests(buttonSpec, Button);

// Vue test - ~10 lines
import { generateVueTests } from "@aneka-ui/test-runner-vue";
import Button from "@/components/material/Button.vue";
import buttonSpec from "@aneka-ui/test-specs/material/button.spec.json";

generateVueTests(buttonSpec, Button);

// Angular test - ~10 lines
import { generateAngularTests } from "@aneka-ui/test-runner-angular";
import { ButtonComponent } from "@/components/material/button.component";
import buttonSpec from "@aneka-ui/test-specs/material/button.spec.json";

generateAngularTests(buttonSpec, ButtonComponent);
```

## Benefits

### Before

- **248 tests** across 3 frameworks
- **~740 lines** of duplicated test code
- **3× maintenance burden** (update in 3 places)
- **Inconsistencies** between frameworks

### After

- **1 specification** (~150 lines JSON)
- **3 test runners** (~100 lines each)
- **3 test files** (~10 lines each)
- **Total: ~480 lines** (35% reduction)
- **Single source of truth**
- **Perfect consistency**

## Metrics

| Metric             | Before             | After     | Improvement         |
| ------------------ | ------------------ | --------- | ------------------- |
| Total Lines        | ~740               | ~480      | 35% reduction       |
| Maintenance Points | 3                  | 1         | 67% reduction       |
| Consistency Issues | Common             | None      | 100% improvement    |
| Framework Tests    | 248                | 248       | No loss of coverage |
| Time to Add Test   | 3× (per framework) | 1× (once) | 67% faster          |

## Next Steps

1. ✅ Create test specification package
2. ⏭️ Implement React test runner
3. ⏭️ Implement Vue test runner
4. ⏭️ Implement Angular test runner
5. ⏭️ Migrate Material button tests
6. ⏭️ Verify all tests pass
7. ⏭️ Migrate remaining components
8. ⏭️ Add to CI/CD pipeline

## Migration Strategy

### Gradual Migration (Recommended)

1. Keep existing tests running
2. Add new test runner alongside
3. Verify identical behavior
4. Remove old tests once confident
5. Repeat for each component

### Big Bang (Alternative)

1. Implement all runners at once
2. Migrate all specs in one PR
3. Higher risk, faster completion

## Conclusion

This approach provides a **scalable, maintainable solution** for testing components across multiple frameworks while maintaining 100% test coverage and improving developer experience.
