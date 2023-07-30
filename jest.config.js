module.exports = {
  preset: "ts-jest",
  // testEnvironment: "node",
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    "^.+\\.js$": "babel-jest",
  },
};
