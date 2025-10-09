/**
 * Samsung One UI Design Tokens
 * Based on Samsung's One UI design system
 * Characterized by bold, rounded elements with generous spacing
 */

export const oneuiTokens = {
  /**
   * Spacing scale (generous spacing for one-handed use)
   */
  spacing: {
    xs: "0.75rem", // 12px
    sm: "1.25rem", // 20px
    md: "2rem", // 32px
    lg: "2.5rem", // 40px
    xl: "4rem", // 64px
    "2xl": "5rem", // 80px
  },

  /**
   * Border radius values (notably rounded)
   */
  radius: {
    none: "0",
    xs: "0.375rem", // 6px
    sm: "0.5rem", // 8px
    md: "1rem", // 16px
    lg: "1.5rem", // 24px
    xl: "2rem", // 32px
    "2xl": "2.5rem", // 40px
    full: "9999px",
  },

  /**
   * Prominent shadows (more visible depth)
   */
  shadows: {
    0: "none",
    1: "0 2px 8px 0 rgb(0 0 0 / 0.08)",
    2: "0 4px 12px 0 rgb(0 0 0 / 0.1)",
    3: "0 8px 16px 0 rgb(0 0 0 / 0.12)",
    4: "0 12px 24px 0 rgb(0 0 0 / 0.14)",
    5: "0 16px 32px 0 rgb(0 0 0 / 0.16)",
  },

  /**
   * Typography settings (clear, bold text)
   */
  typography: {
    transform: "none",
    weight: "600", // Bold for readability
    tracking: "normal",
    lineHeight: {
      tight: "1.3",
      normal: "1.5",
      relaxed: "1.7",
    },
  },

  /**
   * Motion and animation (smooth, slightly slower)
   */
  motion: {
    duration: {
      fast: "200ms",
      base: "250ms",
      slow: "350ms",
      slower: "450ms",
    },
    easing: {
      standard: "cubic-bezier(0.33, 0, 0.2, 1)",
      decelerate: "cubic-bezier(0, 0, 0.2, 1)",
      accelerate: "cubic-bezier(0.33, 0, 1, 1)",
      bounce: "cubic-bezier(0.68, -0.55, 0.27, 1.55)",
    },
  },

  /**
   * Component-specific tokens
   */
  components: {
    button: {
      height: {
        sm: "2.5rem", // 40px
        default: "3rem", // 48px
        lg: "3.5rem", // 56px
      },
      padding: {
        sm: "0.75rem 1.25rem",
        default: "1rem 1.75rem",
        lg: "1.25rem 2.25rem",
      },
      radius: "1rem", // 16px (notably rounded)
    },
    card: {
      radius: "1rem", // 16px
      padding: "1.25rem", // 20px
      shadow: "0 4px 12px 0 rgb(0 0 0 / 0.1)",
      border: "2px",
    },
    badge: {
      radius: "9999px", // Pill shape
      padding: "0.25rem 0.75rem",
      fontSize: "0.875rem", // 14px
      fontWeight: "700", // Bold
      border: "2px",
    },
  },
} as const;

export type OneuiTokens = typeof oneuiTokens;
