module.exports = {
  roots: ['<rootDir>/src'],
  testMatch: ['**/*.spec.ts'],
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/app.ts',
    '!src/graphql/datasources/index.ts',
    '!<rootDir>/node_modules/',
    '!<rootDir>/src/config/**/*.ts',
    '!<rootDir>/src/**/*.stub.ts',
  ],
  displayName: {
    name: 'SERVER',
    color: 'red',
  },
  coverageThreshold: {
    global: {
      statements: 100,
      functions: 100,
      branches: 80,
      lines: 100,
    },
  },
  coverageReporters: ['html', 'text'],
};
