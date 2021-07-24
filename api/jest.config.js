const redwoodConfig = require('@redwoodjs/testing/config/jest/api')

module.exports = {
  ...redwoodConfig,
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/functions/*.ts',
    '!src/graphql/*.ts',
  ],
}
