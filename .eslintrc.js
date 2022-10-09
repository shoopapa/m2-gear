module.exports = {
  root: true,
  extends: '@react-native-community',
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  overrides: [
    {
      files: ['*.ts', '*.tsx', '*.js'],
      rules: {
        'eslint-comments/no-unlimited-disable': 0,
        'eslint-comments/no-unused-disable': 0,
        quotes: [2, 'single', { avoidEscape: true }],
        'react-native/no-inline-styles': 0,
        'prettier/prettier': [
          'warn',
          {
            singleQuote: true,
            semi: true,
            trailingComma: 'all',
          },
        ],
        '@typescript-eslint/no-shadow': ['error'],
        'no-shadow': 'off',
        'no-undef': 'off',
      },
    },
  ],
};
