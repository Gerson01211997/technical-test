module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['jest-fixed-jsdom'],
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@repository/(.*)$': '<rootDir>/src/services/repository/$1',
    '^@products/(.*)$': '<rootDir>/src/modules/products/$1',
  },
  transform: {
    '^.+\\.(ts|tsx)$': ['@swc/jest'],
  },
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/app/**/*',
    '!src/**/*.d.ts',
    '!src/setupTests.ts',
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  coverageReporters: ['text', 'lcov', 'html'],
  
};