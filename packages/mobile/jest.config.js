module.exports = {
  preset: 'react-native',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  displayName: {
    name: 'MOBILE',
    color: 'yellow',
  },
  setupFiles: ['./jest.setup.js'],
  testMatch: ['**/*.spec.(ts|tsx)'],
};
