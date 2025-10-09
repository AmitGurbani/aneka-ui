import fetch from "node-fetch";

import type { RegistryIndex, RegistryItem } from "../types/registry.js";
import { registryIndexSchema, registryItemSchema } from "../types/registry.js";
import { logger } from "./logger.js";

/**
 * Base URL for the Aneka UI registry
 */
const REGISTRY_URL =
  process.env.ANEKA_REGISTRY_URL || "https://aneka-ui.com/registry";

/**
 * Fetches the registry index
 */
export async function fetchRegistryIndex(): Promise<RegistryIndex> {
  try {
    const response = await fetch(`${REGISTRY_URL}/index.json`);

    if (!response.ok) {
      throw new Error(`Failed to fetch registry: ${response.statusText}`);
    }

    const data = await response.json();
    return registryIndexSchema.parse(data);
  } catch (error) {
    logger.error("Failed to fetch registry index");
    throw error;
  }
}

/**
 * Fetches a component from the registry
 */
export async function fetchComponent(
  name: string,
  framework: "react" | "vue" | "angular",
  style: "material" | "hig" | "oneui"
): Promise<RegistryItem> {
  try {
    const url = `${REGISTRY_URL}/${framework}/${style}/${name}.json`;
    const response = await fetch(url);

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(
          `Component "${name}" not found for ${framework} (${style} style)`
        );
      }
      throw new Error(`Failed to fetch component: ${response.statusText}`);
    }

    const data = await response.json();
    return registryItemSchema.parse(data);
  } catch (error) {
    logger.error(`Failed to fetch component "${name}"`);
    throw error;
  }
}

/**
 * Fetches multiple components from the registry
 */
export async function fetchComponents(
  names: string[],
  framework: "react" | "vue" | "angular",
  style: "material" | "hig" | "oneui"
): Promise<RegistryItem[]> {
  const components = await Promise.allSettled(
    names.map((name) => fetchComponent(name, framework, style))
  );

  const results: RegistryItem[] = [];
  const errors: string[] = [];

  for (let i = 0; i < components.length; i++) {
    const result = components[i];
    if (result?.status === "fulfilled") {
      results.push(result.value);
    } else if (result?.status === "rejected") {
      errors.push(`${names[i]}: ${result.reason}`);
    }
  }

  if (errors.length > 0) {
    logger.warn("Some components could not be fetched:");
    errors.forEach((error) => logger.error(error));
  }

  return results;
}

/**
 * Checks if a component exists in the registry
 */
export async function componentExists(
  name: string,
  framework: "react" | "vue" | "angular",
  style: "material" | "hig" | "oneui"
): Promise<boolean> {
  try {
    await fetchComponent(name, framework, style);
    return true;
  } catch {
    return false;
  }
}
