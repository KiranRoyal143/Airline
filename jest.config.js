module.exports = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: [
    "<rootDir>/src/setupTests.js", // Use <rootDir> to reference the root of the project
  ],
  transform: {
    "^.+\\.jsx?$": "babel-jest",
  },
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/src/mocks/fileMock.js", // Use <rootDir> for fileMock
    "\\.(css|less)$": "<rootDir>/src/mocks/styleMock.js", // Use <rootDir> for styleMock
  },
};
