import type { Config } from "jest";

const config: Config = {
  testMatch: ["<rootDir>/**/__tests__/**/*.test.ts"],
  preset: "ts-jest",
  testEnvironment: "node",
};

export default config;
