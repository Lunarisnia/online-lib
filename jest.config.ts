import type { Config } from "jest";

export const config: Config = {
  collectCoverageFrom: ["src/**/*.{js,jsx,ts,tsx}"],
  coveragePathIgnorePatterns: [
    "src/config",
  ],
  preset: "ts-jest",
  testEnvironment: "node",
};

export default config;
