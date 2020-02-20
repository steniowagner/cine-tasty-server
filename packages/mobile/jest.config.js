module.exports = {
  preset: 'react-native',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'jsx', 'node'],
  displayName: {
    name: 'MOBILE',
    color: 'yellow',
  },
  testPathIgnorePatterns: ['/node_modules/', '/e2e/'],
  setupFiles: ['./jest.setup.js'],
  testMatch: ['**/*.spec.(ts|tsx)'],
};
