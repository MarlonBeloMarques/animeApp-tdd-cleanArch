import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { fireEvent, render } from '@testing-library/react-native';

describe('Presentation: Authentication', () => {
  test('should show text button correct', () => {
    const { getByTestId } = render(
      <Authentication onPressAuthentication={() => {}} />,
    );
    const buttonId = 'authentication_id';
    const text = `LET'S BEGIN`;
    const button = getByTestId(buttonId);
    const textButton = button.findByType(Text).props.children;
    expect(textButton).toEqual(text);
  });

  test('should press button with success', () => {
    const onPressAuthenticationMock = jest.fn();
    const { getByTestId } = render(
      <Authentication onPressAuthentication={onPressAuthenticationMock} />,
    );
    const buttonId = 'authentication_id';
    const button = getByTestId(buttonId);
    fireEvent.press(button);
    expect(onPressAuthenticationMock).toHaveBeenCalled();
  });
});

type Props = {
  onPressAuthentication: () => void;
};

const Authentication: React.FC<Props> = ({ onPressAuthentication }) => {
  return (
    <View>
      <TouchableOpacity
        testID="authentication_id"
        onPress={onPressAuthentication}
      >
        <Text>{`LET'S BEGIN`}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Authentication;
