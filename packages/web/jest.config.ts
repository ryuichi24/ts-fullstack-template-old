import type { Config } from "jest";

// https://jestjs.io/docs/configuration
const config: Config = {
    preset: "ts-jest",
    testEnvironment: "jsdom",
    roots: ["<rootDir>/src"],
    // https://zenn.dev/kohski/articles/typescript_jest
    collectCoverage: true,
    collectCoverageFrom: ["**/*.tsx", "!**/node_modules/**"],
    coverageDirectory: "coverage",
    coverageReporters: [],
    // https://www.valentinog.com/blog/jest-coverage/
    coverageThreshold: {
        global: {
            lines: 0,
        },
    },
    // display describe text and test name
    verbose: true
};

export default config;
