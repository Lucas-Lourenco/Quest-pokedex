
export default {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.jsx?$": "babel-jest"
  },
  moduleFileExtensions: ["js", "jsx"],
  testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[tj]s?(x)"],
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  setupFiles: ["<rootDir>/jest.setup.js"] // aqui juntamos os dois
};
