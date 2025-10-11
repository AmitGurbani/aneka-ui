# @aneka-ui/tokens

Design tokens for Material Design, Apple HIG, and Samsung One UI.

## Installation

```bash
npm install @aneka-ui/tokens
# or
pnpm add @aneka-ui/tokens
```

## Usage

```typescript
import { materialTokens, higTokens, oneuiTokens } from "@aneka-ui/tokens";

// Use Material Design tokens
console.log(materialTokens.spacing.md); // "1.5rem"
console.log(materialTokens.radius.sm); // "0.25rem"

// Use Apple HIG tokens
console.log(higTokens.spacing.md); // "1.5rem"
console.log(higTokens.radius.md); // "0.75rem"

// Use Samsung One UI tokens
console.log(oneuiTokens.spacing.md); // "2rem"
console.log(oneuiTokens.radius.lg); // "1.5rem"
```

### Import Specific Design System

```typescript
import { materialTokens } from "@aneka-ui/tokens/material";
import { higTokens } from "@aneka-ui/tokens/hig";
import { oneuiTokens } from "@aneka-ui/tokens/oneui";
```

### Dynamic Token Selection

```typescript
import { getTokens } from "@aneka-ui/tokens";

const style = "material"; // or 'hig' or 'oneui'
const tokens = getTokens(style);
```

## Token Categories

Each design system includes tokens for:

- **Spacing**: Scale of spacing values
- **Radius**: Border radius values
- **Shadows**: Elevation/shadow values
- **Typography**: Font settings
- **Motion**: Animation durations and easing functions
- **Components**: Component-specific tokens

## Design System Differences

### Material Design

- 8pt grid system
- Uppercase button text
- Medium letter spacing
- 200ms base animation duration
- 4px button radius

### Apple HIG

- Clean, minimal shadows
- Sentence case text
- Tight letter spacing (-0.025em)
- 150ms base animation duration
- 6px button radius
- Spring-like animations
- Scale-down on press (0.98)

### Samsung One UI

- Generous spacing for one-handed use
- Bold text (600 weight)
- Prominent shadows
- 250ms base animation duration
- 16px button radius
- Large, rounded elements

## License

MIT
