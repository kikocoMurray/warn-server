/** @format */
module.exports = {
  //定義ESLint的解析器
  parser: '@typescript-eslint/parser',
  //定義了該eslint文件所依賴的插件
  plugins: [
    '@typescript-eslint'
  ],
  //定義文件繼承的子規範
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  rules: {
    'generator-star-spacing': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
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
