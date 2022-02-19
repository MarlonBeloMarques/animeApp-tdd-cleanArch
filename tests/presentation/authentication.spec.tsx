import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { fireEvent, render } from '@testing-library/react-native';

describe('Presentation: Authentication', () => {
  test('should show text button correct', () => {
    const { getByTestId } = makeSut();
    const buttonId = 'authentication_id';
    const text = `LET'S BEGIN`;
    const button = getByTestId(buttonId);
    const textButton = button.findByType(Text).props.children;
    expect(textButton).toEqual(text);
  });

  test('should press button with success', () => {
    const { getByTestId, onPressAuthenticationMock } = makeSut(true);

    const buttonId = 'authentication_id';
    const button = getByTestId(buttonId);
    fireEvent.press(button);
    expect(onPressAuthenticationMock).toHaveBeenCalled();
  });

  test('should show title correct with success', () => {
    const { getByTestId } = makeSut();
    const titleText = 'ANIMEAPP';
    const titleId = 'title_id';
    const title = getByTestId(titleId);
    expect(title).toBeTruthy();
    expect(title.props.children).toEqual(titleText);
  });

  test('should show subtitle correct with success', () => {
    const { getByTestId } = makeSut();
    const subtitleText = 'アニメ';
    const subtitleId = 'subtitle_id';
    const subtitle = getByTestId(subtitleId);
    expect(subtitle).toBeTruthy();
    expect(subtitle.props.children).toEqual(subtitleText);
  });

  test('should show description with success', () => {
    const { getByTestId } = makeSut();
    const descriptionId = 'description_id';
    const description = getByTestId(descriptionId);
    expect(description).toBeTruthy();
  });
});

type Props = {
  onPressAuthentication: () => void;
};

const Authentication: React.FC<Props> = ({ onPressAuthentication }) => {
  return (
    <View>
      <View>
        <Text testID="title_id">ANIMEAPP</Text>
        <Text testID="subtitle_id">アニメ</Text>
      </View>
      <Text testID="description_id">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </Text>
      <TouchableOpacity
        testID="authentication_id"
        onPress={onPressAuthentication}
      >
        <Text>{`LET'S BEGIN`}</Text>
      </TouchableOpacity>
    </View>
  );
};

const makeSut = (onPressAuthentication = false) => {
  const onPressAuthenticationMock = jest.fn();

  const { getByTestId } = render(
    renderWithParams({
      screen: Authentication,
      screenProps: {
        onPressAuthentication: onPressAuthentication
          ? onPressAuthenticationMock
          : () => {},
      },
    }),
  );

  return { getByTestId, onPressAuthenticationMock };
};

type Params<C> = {
  screen: React.ComponentType<C>;
  screenProps: C;
};

const renderWithParams = <C extends Record<string, unknown>>(
  params: Params<C>,
) => {
  return React.createElement(params.screen, params.screenProps);
};