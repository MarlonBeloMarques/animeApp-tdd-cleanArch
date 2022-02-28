import { NativeScrollEvent } from 'react-native';

export const mockOnEndReached = () => {
  const mockedOnEndReached = jest
    .fn()
    .mockImplementation(
      (
        onEndReachedThreshold: number,
        { layoutMeasurement, contentOffset, contentSize }: NativeScrollEvent,
      ) => {
        return (
          layoutMeasurement.height + contentOffset.y >=
          contentSize.height - onEndReachedThreshold
        );
      },
    );

  return mockedOnEndReached;
};
