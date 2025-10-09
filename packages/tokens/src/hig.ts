/**
 * Apple Human Interface Guidelines Design Tokens
 * Based on Apple's HIG for iOS, iPadOS, and macOS
 * https://developer.apple.com/design/human-interface-guidelines
 */

export const higTokens = {
  /**
   * Spacing scale (consistent with Apple's spacing system)
   */
  spacing: {
    xs: "0.5rem", // 8px
    sm: "1rem", // 16px
    md: "1.5rem", // 24px
    lg: "2rem", // 32px
    xl: "3rem", // 48px
    "2xl": "4rem", // 64px
  },

  /**
   * Border radius values (Apple's rounded corners)
   */
  radius: {
    none: "0",
    xs: "0.25rem", // 4px
    sm: "0.375rem", // 6px
    md: "0.75rem", // 12px
    lg: "1rem", // 16px
    xl: "1.25rem", // 20px
    "2xl": "1.5rem", // 24px
    full: "9999px",
  },

  /**
   * Subtle shadows (Apple's minimal shadow approach)
   */
  shadows: {
    0: "none",
    1: "0 1px 3px 0 rgb(0 0 0 / 0.08)",
    2: "0 2px 6px 0 rgb(0 0 0 / 0.1)",
    3: "0 4px 12px 0 rgb(0 0 0 / 0.08)",
    4: "0 8px 16px 0 rgb(0 0 0 / 0.1)",
    5: "0 12px 24px 0 rgb(0 0 0 / 0.12)",
  },

  /**
   * Typography settings (San Francisco font characteristics)
   */
  typography: {
    transform: "none",
    weight: "600", // Semi-bold for emphasis
    tracking: "-0.025em", // Tight tracking for Apple aesthetic
    lineHeight: {
      tight: "1.2",
      normal: "1.4",
      relaxed: "1.6",
    },
  },

  /**
   * Motion and animation (Apple's spring-like animations)
   */
  motion: {
    duration: {
      fast: "120ms",
      base: "150ms",
      slow: "250ms",
      slower: "350ms",
    },
    easing: {
      standard: "cubic-bezier(0.36, 0, 0.66, -0.56)", // Spring-like
      decelerate: "cubic-bezier(0, 0, 0.58, 1)",
      accelerate: "cubic-bezier(0.42, 0, 1, 1)",
      spring: "cubic-bezier(0.68, -0.55, 0.27, 1.55)",
    },
  },

  /**
   * Interaction effects
   */
  interactions: {
    scale: "0.98", // Scale down on press
    opacity: "0.7", // Reduce opacity on press
  },

  /**
   * Component-specific tokens
   */
  components: {
    button: {
      height: {
        sm: "2rem", // 32px
        default: "2.75rem", // 44px (iOS touch target)
        lg: "3.25rem", // 52px
      },
      padding: {
        sm: "0.5rem 1rem",
        default: "0.75rem 1.5rem",
        lg: "1rem 2rem",
      },
      radius: "0.375rem", // 6px
    },
    card: {
      radius: "0.75rem", // 12px
      padding: "1rem", // 16px
      shadow: "0 2px 6px 0 rgb(0 0 0 / 0.1)",
    },
    badge: {
      radius: "0.375rem", // 6px (slightly rounded, not pill)
      padding: "0.125rem 0.5rem",
      fontSize: "0.75rem", // 12px
      border: "1px",
    },
  },
} as const;

export type HigTokens = typeof higTokens;
