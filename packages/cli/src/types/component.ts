/**
 * Represents a component with its metadata and files
 */
export interface Component {
  name: string;
  type: "component" | "util";
  framework: "react" | "vue" | "angular";
  style: "material" | "hig" | "oneui";
  files: ComponentFile[];
  dependencies?: string[];
  devDependencies?: string[];
  registryDependencies?: string[];
  description?: string;
  version?: string;
}

/**
 * Represents a component file
 */
export interface ComponentFile {
  path: string;
  content: string;
  type: "component" | "util" | "style";
}

/**
 * Result of adding a component
 */
export interface AddComponentResult {
  component: Component;
  action: "added" | "skipped" | "overwritten";
  dependencies: string[];
}
