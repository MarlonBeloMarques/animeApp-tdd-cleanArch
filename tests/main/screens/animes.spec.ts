import { NativeScrollEvent } from 'react-native';
import { onEndReached } from '../../../src/main/factories/screens/animesFactory';

describe('Main: Screens', () => {
  test('should return onEndReached on failure when waitForEndReached is true', async () => {
    const endReached = onEndReached(20, true, {
      layoutMeasurement: { height: 0 },
      contentOffset: { y: 0 },
      contentSize: { height: 0 },
    } as NativeScrollEvent);

    expect(endReached).toEqual(false);
  });
});
