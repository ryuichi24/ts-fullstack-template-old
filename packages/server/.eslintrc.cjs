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
        project: ["tsconfig.eslint.json"],
    },
    plugins: ["@typescript-eslint"],
    rules: {
        "@typescript-eslint/require-await": "off",
    },
};
