module.exports = {
  clearMocks: true,
  collectCoverage: false,
  collectCoverageFrom: ["src/**/*.{ts,tsx}", "!src/index.ts", "!src/**/*.d.ts", "!src/**/*/*.types.{ts,tsx}", "!src/**/*.stories.{ts,tsx}"],
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  roots: ["./src"],
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["./jest.setup.js"],
  moduleFileExtensions: ["ts", "tsx", "js"],
  testPathIgnorePatterns: ["node_modules/"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  testMatch: ["**/*.(test|spec).(ts|tsx)"],
  moduleNameMapper: {

  },
};
