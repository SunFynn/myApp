module.exports = {
  collectCoverage: true,
  testURL: 'http://localhost:8000',
  verbose: false,
  extraSetupFiles: ['./tests/setupTests.js'],
  globals: {
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION: false,
    localStorage: null,
  },
  collectCoverageFrom: ['src/utils/utils.ts'],
  moduleNameMapper: {
    '~/(.*)': '<rootDir>/src/',
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@@/(.*)$': '<rootDir>/src/.umi/$1',
  },
};
