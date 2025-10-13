/* eslint-env node */
/** @type {import('jest').Config} */
module.exports = {
  preset: "jest-preset-angular",
  setupFilesAfterEnv: ["<rootDir>/setup-jest.ts"],
  testMatch: ["<rootDir>/tests-angular/**/*.spec.ts"],
  testPathIgnorePatterns: ["/node_modules/", "/dist/"],
  collectCoverageFrom: [
    "src-angular/**/*.ts",
    "!src-angular/**/*.spec.ts",
    "!src-angular/**/index.ts",
  ],
  coverageDirectory: "coverage",
  coverageReporters: ["text", "json", "html"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src-angular/$1",
    "^@aneka-ui/test-runner-angular$":
      "<rootDir>/../test-runner-angular/src/index.ts",
    "^@aneka-ui/test-specs/(.*)$": "<rootDir>/../test-specs/$1",
  },
  transform: {
    "^.+\\.(ts|js|html)$": [
      "jest-preset-angular",
      {
        tsconfig: "<rootDir>/tsconfig.spec.json",
        stringifyContentPathRegex: "\\.(html|svg)$",
      },
    ],
  },
};
