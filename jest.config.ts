import type { Config } from "jest";

export const config: Config = {
  collectCoverageFrom: ["src/**/*.{js,jsx,ts,tsx}"],
  coveragePathIgnorePatterns: [
    "src/db/migrations",
    "src/db/seeders",
    "src/db/models",
    "src/db/template",
    "src/config",
    "src/db/index.ts",
    "src/gql/index.ts",
    "src/gql/schema.ts",
  ],
  preset: "ts-jest",
  testEnvironment: "node",
};

export default config;
