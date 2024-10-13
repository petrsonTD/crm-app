import globals from "globals";
import typescriptParser from "@typescript-eslint/parser";
import pluginReact from "eslint-plugin-react";
import pluginImport from "eslint-plugin-import";
import pluginTypeScript from "@typescript-eslint/eslint-plugin";

export default [
  {
    files: ["**/*.{js,js,cjs,jsx,ts,tsx}"],
    languageOptions: {
      globals: globals.browser,
      parser: typescriptParser,
      parserOptions: {
        requireConfigFile: false,
        babelOptions: {
          presets: ["@babel/preset-react", "@babel/preset-typescript"],
        },
        project: "./tsconfig.json",
        ecmaVersion: 2020,
      },
    },
    plugins: {
      import: pluginImport,
      react: pluginReact,
      "@typescript-eslint": pluginTypeScript,
    },
    rules: {
      "import/no-unresolved": "error",
      "import/named": "error",
      "import/default": "error",
      "import/namespace": "error",

      "react/react-in-jsx-scope": "off",
      "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx", ".ts", ".tsx"] }],
      "react/jsx-uses-react": "error",
      "react/jsx-uses-vars": "error",
      "react/jsx-no-undef": "error",

      "@typescript-eslint/no-unused-vars": "warn",

      "no-unused-vars": "warn",
      "no-undef": "error",
      "semi": ["warn", "always"],
      "quotes": ["warn", "double"],
      "indent": ["warn", 2],
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
];