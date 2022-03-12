module.exports = {
  preset: 'react-native',
  verbose: true,
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testRegex: '\\.spec\\.ts',
  collectCoverageFrom: [
    '<rootDir>/tests/**/*.{ts,tsx}',
    '<rootDir>/src/**/*.{ts,tsx}',
    '!<rootDir>/src/**/index.ts',
    '!<rootDir>/tests/**/index.ts',
    '!<rootDir>/tests/integration/*.{ts,tsx}',
    '!<rootDir>/src/presentation/themes/**',
    '!<rootDir>/src/presentation/helpers/**',
    '!<rootDir>/src/presentation/assets/**',
    '!<rootDir>/src/main/types/**'
  ],
  setupFiles: ['<rootDir>/jestSetupFile.js'],
  testPathIgnorePatterns: ['<rootDir>/node_modules/'],
  transformIgnorePatterns: [
    'node_modules/(?!(@react-native|react-native|react-native-size-matters)/)',
  ],
  moduleNameMapper: {
      ".+\\.(css|style|less|sass|scss|png|jpg|ttf|woff|woff2)$": "identity-obj-proxy"
  },
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};