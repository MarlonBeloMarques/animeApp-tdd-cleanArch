module.exports = {
  preset: 'react-native',
  verbose: true,
  setupFilesAfterEnv: [
    "@testing-library/jest-native/extend-expect"
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  collectCoverage: true,
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};