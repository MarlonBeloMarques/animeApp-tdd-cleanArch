import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { render } from '@testing-library/react-native';

describe('Presentation: Authentication', () => {
  test('should show text button correct', () => {
    const { getByText } = render(<Authentication />);
    const text = `LET'S BEGIN`;
    const response = getByText(text);
    expect(response).toBeTruthy();
  });
});

const Authentication: React.FC = () => {
  return (
    <View>
      <TouchableOpacity>
        <Text>{`LET'S BEGIN`}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Authentication;
