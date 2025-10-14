export default {
  // Registry files need special eslint rule to ignore unresolved imports
  'registry/**/*.{ts,tsx,vue}': [
    'eslint --fix --rule "import/no-unresolved: off"',
    'prettier --write',
  ],
  // All other TypeScript/JavaScript/Vue files (excluding registry and config files)
  '*.{ts,tsx,js,jsx,vue}': (filenames) => {
    // Filter out registry files and lint-staged config since they're handled separately
    const nonRegistryFiles = filenames.filter(
      (file) => !file.includes('registry/') && !file.includes('.lintstagedrc')
    );
    if (nonRegistryFiles.length === 0) return [];
    return [
      `eslint --fix ${nonRegistryFiles.join(' ')}`,
      `prettier --write ${nonRegistryFiles.join(' ')}`,
    ];
  },
  // JSON and Markdown files
  '*.{json,md}': ['prettier --write'],
};
