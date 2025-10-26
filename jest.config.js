const nextJest = require('next/jest');
const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig');

const createJestConfig = nextJest({
  dir: './',
});
const customJestConfig = {
  preset: 'ts-jest',
  moduleNameMapper: {
    '\\.(scss|sass)$': 'identity-obj-proxy',
    ...pathsToModuleNameMapper(compilerOptions.paths, {
      prefix: '<rootDir>/src/',
    }),
  },
  testPathIgnorePatterns: ['/node_modules/', '/.next/'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transformIgnorePatterns: ['/node_modules/(?!(next-translate|@testing-library)/)'],
  testEnvironmentOptions: {
    customExportConditions: [''],
  },
  testEnvironment: 'jest-fixed-jsdom',
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
    '^.+\\.mjs$': ['babel-jest', { presets: ['next/babel'] }],
  },
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  moduleDirectories: ['node_modules', 'src'],
  setupFilesAfterEnv: ['@testing-library/jest-dom'],
  collectCoverageFrom: ['src/**/{!(.test.),}.{js,ts,tsx}'],
};
module.exports = async () => ({
  ...(await createJestConfig(customJestConfig)()),
  transformIgnorePatterns: ['/node_modules/(?!(jose|@panva)/)'],
});
