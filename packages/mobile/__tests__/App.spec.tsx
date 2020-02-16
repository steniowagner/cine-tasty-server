import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import App from '../App';

// Note: test renderer must be required after react-native.

describe('some', () => {
  it('renders correctly', () => {
    renderer.create(<App />);
    expect(true).toBe(true);
  });
});
