import 'react-native';
import React from 'react';
import App from '../App';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import {Text} from 'react-native';

it('renders correctly', () => {
  const rendered = renderer.create(<App />);
  const root = rendered.root;
  expect(root.findByType(Text).props.children).toEqual('AnimeApp');
});
