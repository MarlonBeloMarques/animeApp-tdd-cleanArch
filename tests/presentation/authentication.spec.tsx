import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { render } from '@testing-library/react-native';

describe('Presentation: Authentication', () => {
  test('should show text button correct', () => {
    const { getByTestId } = render(<Authentication />);
    const buttonId = 'authentication_id';
    const text = `LET'S BEGIN`;
    const button = getByTestId(buttonId);
    const textButton = button.findByType(Text).props.children;
    expect(textButton).toEqual(text);
  });
});

const Authentication: React.FC = () => {
  return (
    <View>
      <TouchableOpacity testID="authentication_id">
        <Text>{`LET'S BEGIN`}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Authentication;
