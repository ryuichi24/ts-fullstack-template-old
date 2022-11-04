/* eslint-disable */
module.exports = {
    env: {
        es2021: true,
    },
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        // type checking
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
    ],
    overrides: [],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        tsconfigRootDir: __dirname,
        project: ["tsconfig.config.json"],
    },
    plugins: ["@typescript-eslint"],
    ignorePatterns: ["**/__generated__/*ts"],
    rules: {
        "@typescript-eslint/require-await": "off",
    },
};
