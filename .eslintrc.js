/** @format */

module.exports = {
  parser: '@typescript-eslint/parser', //定義ESLint的解析器
  extends: ['plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'], //定義文件繼承的子規範
  plugins: ['@typescript-eslint'], //定義了該eslint文件所依賴的插件
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // project custom
    'no-unused-vars': 1,
    'no-extend-native': 0,
    'prefer-promise-reject-errors': 0,
    'comma-dangle': ['error', 'always-multiline'],
    camelcase: 'off',
  },
  env: {
    browser: true,
    node: true,
  },
}
