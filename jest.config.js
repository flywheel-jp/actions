module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  verbose: true,
  moduleNameMapper: {
    "^common/(.*)$": "<rootDir>/common/src/$1",
  },
}
