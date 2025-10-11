import fs from "fs/promises";
import path from "path";

/**
 * Monorepo configuration
 */
export interface MonorepoInfo {
  isMonorepo: boolean;
  type?: "pnpm" | "lerna" | "turbo" | "nx";
  packages: string[];
  rootPath: string;
}

/**
 * Detects if the project is a monorepo and returns package information
 */
export async function detectMonorepo(cwd: string): Promise<MonorepoInfo> {
  try {
    // Check for pnpm workspace
    const pnpmWorkspacePath = path.join(cwd, "pnpm-workspace.yaml");
    try {
      const content = await fs.readFile(pnpmWorkspacePath, "utf-8");
      const packages = await findPackages(cwd, content);
      return {
        isMonorepo: true,
        type: "pnpm",
        packages,
        rootPath: cwd,
      };
    } catch {
      // Not a pnpm workspace
    }

    // Check for lerna.json
    const lernaPath = path.join(cwd, "lerna.json");
    try {
      const content = await fs.readFile(lernaPath, "utf-8");
      const config = JSON.parse(content);
      const packages = await findPackagesFromGlobs(
        cwd,
        config.packages || ["packages/*"]
      );
      return {
        isMonorepo: true,
        type: "lerna",
        packages,
        rootPath: cwd,
      };
    } catch {
      // Not a lerna monorepo
    }

    // Check for turbo.json
    const turboPath = path.join(cwd, "turbo.json");
    try {
      await fs.access(turboPath);
      // Turbo uses package.json workspaces
      const packageJson = JSON.parse(
        await fs.readFile(path.join(cwd, "package.json"), "utf-8")
      );
      if (packageJson.workspaces) {
        const packages = await findPackagesFromGlobs(
          cwd,
          Array.isArray(packageJson.workspaces)
            ? packageJson.workspaces
            : packageJson.workspaces.packages
        );
        return {
          isMonorepo: true,
          type: "turbo",
          packages,
          rootPath: cwd,
        };
      }
    } catch {
      // Not a turbo monorepo
    }

    // Check for nx.json
    const nxPath = path.join(cwd, "nx.json");
    try {
      await fs.access(nxPath);
      const packages = await findNxProjects(cwd);
      return {
        isMonorepo: true,
        type: "nx",
        packages,
        rootPath: cwd,
      };
    } catch {
      // Not an nx monorepo
    }

    return {
      isMonorepo: false,
      packages: [cwd],
      rootPath: cwd,
    };
  } catch {
    return {
      isMonorepo: false,
      packages: [cwd],
      rootPath: cwd,
    };
  }
}

/**
 * Finds packages from pnpm-workspace.yaml content
 */
async function findPackages(cwd: string, content: string): Promise<string[]> {
  const lines = content.split("\n");
  const packagesIndex = lines.findIndex((line) => line.includes("packages:"));

  if (packagesIndex === -1) {
    return [];
  }

  const globs: string[] = [];
  for (let i = packagesIndex + 1; i < lines.length; i++) {
    const line = lines[i]?.trim();
    if (!line || line.startsWith("#")) continue;
    if (!line.startsWith("-")) break;
    const glob = line.replace(/^-\s*['"]?/, "").replace(/['"]?\s*$/, "");
    globs.push(glob);
  }

  return findPackagesFromGlobs(cwd, globs);
}

/**
 * Finds packages from glob patterns
 */
async function findPackagesFromGlobs(
  cwd: string,
  globs: string[]
): Promise<string[]> {
  const packages: string[] = [];

  for (const glob of globs) {
    const pattern = glob.replace(/\/\*$/, "");
    const dir = path.join(cwd, pattern);

    try {
      const entries = await fs.readdir(dir, { withFileTypes: true });
      for (const entry of entries) {
        if (entry.isDirectory()) {
          const pkgPath = path.join(dir, entry.name);
          try {
            await fs.access(path.join(pkgPath, "package.json"));
            packages.push(pkgPath);
          } catch {
            // Not a package
          }
        }
      }
    } catch {
      // Directory doesn't exist
    }
  }

  return packages;
}

/**
 * Finds Nx projects
 */
async function findNxProjects(cwd: string): Promise<string[]> {
  const workspacePath = path.join(cwd, "workspace.json");
  const packages: string[] = [];

  try {
    const content = await fs.readFile(workspacePath, "utf-8");
    const workspace = JSON.parse(content);

    for (const project of Object.values(workspace.projects) as {
      root: string;
    }[]) {
      packages.push(path.join(cwd, project.root));
    }
  } catch {
    // Try angular.json as fallback
    try {
      const angularPath = path.join(cwd, "angular.json");
      const content = await fs.readFile(angularPath, "utf-8");
      const angular = JSON.parse(content);

      for (const project of Object.values(angular.projects) as {
        root: string;
      }[]) {
        packages.push(path.join(cwd, project.root));
      }
    } catch {
      // No projects found
    }
  }

  return packages;
}
