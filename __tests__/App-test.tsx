import React from 'react';
import { render } from '@testing-library/react-native';
import Source from '../App';

it('renders correctly', () => {
  const { getByText } = render(<Source />);
  expect(getByText('AnimeApp')).toBeTruthy();
});
