import { z } from "zod";

/**
 * Schema for registry component entries
 */
export const registryItemSchema = z.object({
  name: z.string(),
  type: z.enum(["component", "util"]),
  framework: z.enum(["react", "vue", "angular"]),
  style: z.enum(["material", "hig", "oneui"]),
  files: z.array(
    z.object({
      path: z.string(),
      content: z.string().optional(),
      type: z.enum(["component", "util", "style"]),
    })
  ),
  dependencies: z.array(z.string()).optional(),
  devDependencies: z.array(z.string()).optional(),
  registryDependencies: z.array(z.string()).optional(),
  description: z.string().optional(),
  version: z.string().optional(),
});

export type RegistryItem = z.infer<typeof registryItemSchema>;

/**
 * Schema for the registry index
 */
export const registryIndexSchema = z.array(
  z.object({
    name: z.string(),
    type: z.enum(["component", "util"]),
    description: z.string(),
    frameworks: z.array(z.enum(["react", "vue", "angular"])),
    styles: z.array(z.enum(["material", "hig", "oneui"])),
  })
);

export type RegistryIndex = z.infer<typeof registryIndexSchema>;
