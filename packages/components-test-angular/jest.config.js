/** @type {import('jest').Config} */
export default {
  preset: "jest-preset-angular",
  setupFilesAfterEnv: ["<rootDir>/setup-jest.ts"],
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
  },
};
