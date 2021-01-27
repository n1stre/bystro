module.exports = {
  preset: "ts-jest",
  verbose: true,
  roots: ["<rootDir>/src"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },

  testEnvironment: "node",
  testMatch: ["**/*.(test|spec).(js|ts|tsx)"],
  testPathIgnorePatterns: ["/node_modules/"],

  collectCoverageFrom: ["src/**/*.ts*"],
  coverageDirectory: "test/coverage",
  coveragePathIgnorePatterns: ["/node_modules/"],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};
