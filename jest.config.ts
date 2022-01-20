/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

export default {
  clearMocks: true,
  collectCoverage: false,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/jest.tsconfig.ts',
    }
  },
  moduleFileExtensions: [
    'js',
    'ts',
    'tsx',
  ],
  preset: 'ts-jest',
  roots: ['<rootDir>/src/'],
  testEnvironment: 'node',
  transform: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga|js|jsx|es6|ts|tsx)$': './node_modules/babel-jest'
  },
};
