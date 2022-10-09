module.exports = {
  root: true,
  extends: "@react-native-community",
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      rules: {
        "react-native/no-inline-styles": 0,
        'prettier/prettier': [
          'warn',
          {
            singleQuote: true,
            semi: true,
            trailingComma: 'all',
          },
        ],
        "@typescript-eslint/no-shadow": ["error"],
        "no-shadow": "off",
        "no-undef": "off",
      },
    },
  ],
};
