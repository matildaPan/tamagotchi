module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  testRegex: '.*\\.test\\.ts$',
  coveragePathIgnorePatterns: ['<rootDir>/node_modules/'],
  coverageReporters: ['lcov', 'json-summary', 'text-summary', 'html'],
  collectCoverageFrom: ['./src/**/*.ts'],
  globals: {
    'ts-jest': {
      isolatedModules: true,
    },
  },
};
