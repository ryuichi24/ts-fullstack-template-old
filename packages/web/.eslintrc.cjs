/* eslint-disable */
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:@typescript-eslint/recommended",
    // type checking
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
  ],
  overrides: [],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    // type checking
    // https://stackoverflow.com/a/69929765/13723015
    tsconfigRootDir: __dirname,
    project: ["tsconfig.eslint.json"],
  },
  plugins: ["react", "@typescript-eslint"],
  rules: {
    "react/react-in-jsx-scope": "off",
  },
  settings: {
    // https://blog.freks.jp/remove-eslint-react-plugin-warning/
    react: {
      version: "detect",
    },
  },
};