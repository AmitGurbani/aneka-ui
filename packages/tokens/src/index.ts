/**
 * Aneka UI Design Tokens
 * Framework-agnostic design tokens for Material Design, Apple HIG, and Samsung One UI
 */

import { materialTokens } from "./material.js";
import { higTokens } from "./hig.js";
import { oneuiTokens } from "./oneui.js";

export { materialTokens, type MaterialTokens } from "./material.js";
export { higTokens, type HigTokens } from "./hig.js";
export { oneuiTokens, type OneuiTokens } from "./oneui.js";

/**
 * Union type of all design token sets
 */
export type DesignTokens = typeof materialTokens | typeof higTokens | typeof oneuiTokens;

/**
 * Design system style names
 */
export type DesignSystemStyle = "material" | "hig" | "oneui";

/**
 * Get tokens for a specific design system
 */
export function getTokens(style: DesignSystemStyle): DesignTokens {
  switch (style) {
    case "material":
      return materialTokens;
    case "hig":
      return higTokens;
    case "oneui":
      return oneuiTokens;
    default:
      throw new Error(`Unknown design system style: ${style}`);
  }
}
