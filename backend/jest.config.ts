import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["<rootDir>/src/tests/**/*.test.ts"],
  setupFiles: ["<rootDir>/src/tests/env.ts"],
  setupFilesAfterEnv: ["<rootDir>/src/tests/setup.ts"],
  clearMocks: true
};

export default config;
