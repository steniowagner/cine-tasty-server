/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const tsconfig = require("./tsconfig.json");
const { pathsToModuleNameMapper } = require("ts-jest");

/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/*.(test|spec).ts"],
  transform: {
    ".+\\.ts$": "ts-jest",
  },
  modulePaths: ["<rootDir>"],
  moduleNameMapper: pathsToModuleNameMapper(tsconfig.compilerOptions.paths, {
    prefix: "<rootDir>",
  }),
  coverageReporters: ["html", "text"],
};
