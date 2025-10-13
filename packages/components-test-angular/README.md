# Angular Component Tests

Angular component testing for Aneka UI using Jest and Angular Testing Library.

## Overview

This package contains the infrastructure for testing Angular components across all three design systems:

- **Material Design** - Google's Material Design 3 patterns
- **Apple HIG** - Apple Human Interface Guidelines
- **Samsung One UI** - Samsung's One UI design language

## Status

⚠️ **Tests Not Yet Implemented**

This package currently contains:

- ✅ Angular component source files (synced from registry)
- ✅ Test directory structure
- ✅ Jest configuration
- ❌ Actual test files (to be implemented)

## Technology Stack

- **Test Runner**: Jest (with jest-preset-angular)
- **Framework**: Angular 20.3.4
- **Testing Utilities**: Angular Testing Library (to be added)

## Quick Start

```bash
# Sync components from registry
pnpm sync

# Run tests (currently returns success with message)
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:coverage
```

## Project Structure

```
packages/components-test-angular/
├── src-angular/
│   ├── lib/
│   │   └── utils.ts         # Utility functions
│   ├── material/            # Material Design components
│   ├── hig/                 # Apple HIG components
│   └── oneui/               # Samsung One UI components
├── tests-angular/
│   ├── material/            # Material Design tests (empty)
│   ├── hig/                 # Apple HIG tests (empty)
│   └── oneui/               # Samsung One UI tests (empty)
├── jest.config.js           # Jest configuration
└── setup-jest.ts            # Jest setup file
```

## Components Available

Each design system includes components for:

- Button
- Badge
- Card
- Dialog
- Tooltip

## TODO: Implementation Needed

To complete this package, the following is needed:

1. **Add Testing Dependencies**

   ```bash
   pnpm add -D jest-preset-angular @angular/platform-browser-dynamic @angular/platform-browser
   ```

2. **Create Test Files**
   - Create `.spec.ts` files for each component in `tests-angular/`
   - Follow Angular testing best practices
   - Mirror test coverage from React and Vue packages

3. **Update Test Scripts**
   - Replace placeholder scripts with actual Jest commands
   - Configure coverage thresholds

4. **Example Test Structure**

   ```typescript
   import { ComponentFixture, TestBed } from "@angular/core/testing";
   import { ButtonComponent } from "../../src-angular/material/button.component";

   describe("ButtonComponent", () => {
     let component: ButtonComponent;
     let fixture: ComponentFixture<ButtonComponent>;

     beforeEach(async () => {
       await TestBed.configureTestingModule({
         imports: [ButtonComponent],
       }).compileComponents();

       fixture = TestBed.createComponent(ButtonComponent);
       component = fixture.componentInstance;
       fixture.detectChanges();
     });

     it("should create", () => {
       expect(component).toBeTruthy();
     });
   });
   ```

## Test Categories (Planned)

Tests should cover:

1. **Component Creation** - Basic component instantiation
2. **Input Properties** - Variant, size, disabled state
3. **Output Events** - Click events, custom events
4. **Template Rendering** - Content projection, ng-content
5. **Styling** - CSS classes, design-specific patterns
6. **Accessibility** - ARIA attributes, keyboard navigation
7. **Change Detection** - OnPush strategy, input changes

## Best Practices

- Use TestBed for component testing
- Test with standalone components (Angular 14+)
- Mock dependencies when needed
- Test user interactions, not implementation
- Focus on accessibility
- Use fixture.detectChanges() appropriately

## Related Packages

- [`@aneka-ui/components-test-react`](../components-test-react) - React component tests (implemented)
- [`@aneka-ui/components-test-vue`](../components-test-vue) - Vue component tests (implemented)

## Contributing

When implementing tests:

1. Reference React and Vue test patterns for consistency
2. Ensure similar test coverage across all frameworks
3. Follow Angular testing conventions
4. Update this README when tests are added
