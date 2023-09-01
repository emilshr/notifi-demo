/** @type {import("eslint").Linter.Config} */
const config = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true
  },
  plugins: ["@typescript-eslint"],
  extends: [
    "plugin:@typescript-eslint/recommended-type-checked",
    "plugin:@typescript-eslint/stylistic-type-checked",
    "custom"
  ],
  ignorePatterns: ["**/*.js"],
  rules: {
    "@typescript-eslint/consistent-type-imports": [
      "warn",
      {
        prefer: "type-imports",
        fixStyle: "inline-type-imports"
      }
    ],
    "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    "@typescript-eslint/no-misused-promises": 0,
    "@typescript-eslint/no-floating-promises": 0,
    "@typescript-eslint/consistent-type-definitions": 0,
    "@typescript-eslint/prefer-nullish-coalescing": 0
  },
  env: {
    jest: true,
  }
};

module.exports = config;
