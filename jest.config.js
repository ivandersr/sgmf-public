const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { compilerOptions } = require('./tsconfig.json');

module.exports = {
  clearMocks: true,

  collectCoverage: true,

  collectCoverageFrom: [
    '<rootDir>/src/modules/**/services/*.ts',
  ],

  coverageDirectory: 'coverage',

  testEnvironment: 'node',
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/src/',
  }),
  preset: 'ts-jest',
  testMatch: ['**/*.spec.ts'],
};
