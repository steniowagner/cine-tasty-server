/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const tsconfig = require("./tsconfig.json");
const { pathsToModuleNameMapper } = require("ts-jest");

/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  roots: ["<rootDir>/src"],
  testEnvironment: "node",
  testMatch: ["**/*.(test|spec).ts"],
  transform: {
    ".+\\.ts$": "ts-jest",
  },
  preset: "ts-jest",
  modulePaths: [tsconfig.compilerOptions.baseUrl],
  moduleNameMapper: pathsToModuleNameMapper(tsconfig.compilerOptions.paths),
  coverageReporters: ["html", "text"],
};
