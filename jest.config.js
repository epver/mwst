module.exports = {
  coverageDirectory: '../coverage',
  moduleFileExtensions: ['js', 'ts', 'json'],
  rootDir: 'src',
  testEnvironment: 'node',
  testRegex: '.spec.ts$',
  transform: {'^.+\\.(t|j)s$': 'ts-jest'},
};