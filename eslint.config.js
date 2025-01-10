import js from "@eslint/js";

export default [
  js.configs.recommended,

  {
    ignores: ["node_modules", "eslint.config.js"],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
      globals: {
        process: "readonly",
        __dirname: "readonly",
        console: "readonly"
      },
    },
    rules: {
      indent: ['error', 4],
      "no-unused-vars": ["error", { argsIgnorePattern: '^_' }],
      semi: ["warn", "always"],
      quotes: ["error", "single"],
      "no-console": "off"
    }
  }
]