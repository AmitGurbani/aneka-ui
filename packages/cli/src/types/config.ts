import { z } from "zod";

/**
 * Schema for the aneka-ui.json configuration file
 */
export const configSchema = z.object({
  $schema: z.string().optional(),
  framework: z.enum(["react", "vue", "angular"]),
  style: z.enum(["material", "hig", "oneui"]),
  aliases: z.object({
    components: z.string(),
    utils: z.string(),
  }),
  tailwind: z.object({
    config: z.string(),
    css: z.string(),
  }),
  resolvedPaths: z
    .object({
      components: z.string(),
      utils: z.string(),
      tailwindConfig: z.string(),
      tailwindCss: z.string(),
    })
    .optional(),
});

export type Config = z.infer<typeof configSchema>;

/**
 * Default configuration values
 */
export const defaultConfig: Partial<Config> = {
  $schema: "https://aneka-ui.com/schema.json",
  aliases: {
    components: "@/components",
    utils: "@/lib/utils",
  },
  tailwind: {
    config: "tailwind.config.js",
    css: "src/app/globals.css",
  },
};
