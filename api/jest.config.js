const redwoodConfig = require('@redwoodjs/testing/config/jest/api')

module.exports = {
  ...redwoodConfig,
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.ts', '!src/graphql/*.ts'],
}
