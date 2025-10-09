/**
 * Material Design 3 Design Tokens
 * Based on Google's Material Design Guidelines
 * https://m3.material.io
 */

export const materialTokens = {
  /**
   * Spacing scale (8pt grid system)
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
   * Border radius values
   */
  radius: {
    none: "0",
    xs: "0.125rem", // 2px
    sm: "0.25rem", // 4px
    md: "0.5rem", // 8px
    lg: "0.75rem", // 12px
    xl: "1rem", // 16px
    full: "9999px",
  },

  /**
   * Elevation shadows (Material Design elevation system)
   */
  shadows: {
    0: "none",
    1: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    2: "0 2px 4px 0 rgb(0 0 0 / 0.1)",
    4: "0 4px 8px 0 rgb(0 0 0 / 0.12)",
    6: "0 6px 10px 0 rgb(0 0 0 / 0.14)",
    8: "0 8px 12px 0 rgb(0 0 0 / 0.16)",
    12: "0 12px 17px 0 rgb(0 0 0 / 0.19)",
    16: "0 16px 24px 0 rgb(0 0 0 / 0.22)",
    24: "0 24px 38px 0 rgb(0 0 0 / 0.25)",
  },

  /**
   * Typography settings
   */
  typography: {
    transform: "uppercase",
    weight: "500",
    tracking: "0.05em", // 0.5px letter spacing
    lineHeight: {
      tight: "1.25",
      normal: "1.5",
      relaxed: "1.75",
    },
  },

  /**
   * Motion and animation
   */
  motion: {
    duration: {
      fast: "150ms",
      base: "200ms",
      slow: "300ms",
      slower: "400ms",
    },
    easing: {
      standard: "cubic-bezier(0.4, 0, 0.2, 1)",
      decelerate: "cubic-bezier(0, 0, 0.2, 1)",
      accelerate: "cubic-bezier(0.4, 0, 1, 1)",
      sharp: "cubic-bezier(0.4, 0, 0.6, 1)",
    },
  },

  /**
   * Component-specific tokens
   */
  components: {
    button: {
      height: {
        sm: "2rem", // 32px
        default: "2.5rem", // 40px
        lg: "3rem", // 48px
      },
      padding: {
        sm: "0.75rem 1rem",
        default: "1rem 1.5rem",
        lg: "1.25rem 2rem",
      },
      radius: "0.25rem", // 4px
    },
    card: {
      radius: "0.5rem", // 8px
      padding: "1rem", // 16px
      shadow: "0 2px 4px 0 rgb(0 0 0 / 0.1)",
    },
    badge: {
      radius: "9999px",
      padding: "0.125rem 0.5rem",
      fontSize: "0.75rem", // 12px
    },
  },
} as const;

export type MaterialTokens = typeof materialTokens;
