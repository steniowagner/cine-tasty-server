import React from 'react';
import { render } from 'react-native-testing-library';
import Test from '../App';

describe('Hello', () => {
  it('renders the correct message', () => {
    const { queryByText } = render(<Test />);
    expect(queryByText('TESTING!')).not.toBeNull();
  });
});
