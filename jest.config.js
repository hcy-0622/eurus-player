/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

module.exports = {
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '.(css|less|scss|styl)$': 'identity-obj-proxy',
    '@/hooks': '<rootDir>/src/hooks',
    '@/utils': '<rootDir>/src/utils',
  },
}
