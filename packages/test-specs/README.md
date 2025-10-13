# @aneka-ui/test-specs

Framework-agnostic test specifications for Aneka UI components.

## Overview

This package contains declarative test specifications in JSON format that can be used to generate tests for React, Vue, and Angular implementations of the same component. This eliminates duplication and ensures consistent test coverage across all frameworks.

## Structure

```
test-specs/
├── schema.json              # JSON schema for test specifications
├── material/
│   ├── button.spec.json    # Material Design button tests
│   ├── card.spec.json      # Material Design card tests
│   └── ...
├── hig/
│   └── ...
└── oneui/
    └── ...
```

## Test Specification Format

Test specifications are written in JSON and define:

- **Component metadata**: Name, design system, description
- **Test categories**: Rendering, variants, sizes, styling, interactions, accessibility
- **Test cases**: Each with props, children, actions, and assertions

### Example

```json
{
  "component": "Button",
  "designSystem": "material",
  "tests": {
    "variants": [
      {
        "name": "should render filled variant",
        "props": { "variant": "filled" },
        "children": "Filled",
        "assertions": [
          { "type": "hasClass", "value": "bg-primary" },
          { "type": "hasClass", "value": "text-primary-foreground" }
        ]
      }
    ]
  }
}
```

## Assertion Types

- `exists` - Element exists in the DOM
- `tagName` - Element has specific tag name
- `hasText` - Element contains specific text
- `hasClass` - Element has CSS class
- `notHasClass` - Element does not have CSS class
- `hasAttribute` - Element has attribute with value
- `hasRole` - Element has ARIA role
- `handlerCalled` - Event handler was called
- `handlerNotCalled` - Event handler was not called

## Action Types

- `click` - Click the element
- `focus` - Focus the element
- `blur` - Remove focus from element
- `type` - Type text into element
- `hover` - Hover over element

## Usage

Test runners for each framework read these specifications and generate actual test code:

- **React**: Uses `@testing-library/react` and Vitest
- **Vue**: Uses `@vue/test-utils` and Vitest
- **Angular**: Uses Angular Testing Library and Jest

## Benefits

1. **Single Source of Truth**: One specification for all frameworks
2. **Consistency**: Identical tests across React, Vue, and Angular
3. **Maintainability**: Update once, apply everywhere
4. **Reduced Duplication**: ~70% reduction in test code
5. **Framework Agnostic**: Add new frameworks easily

## Future Enhancements

- Visual regression testing specifications
- Performance testing specifications
- E2E test specifications
- Test generation CLI tool
