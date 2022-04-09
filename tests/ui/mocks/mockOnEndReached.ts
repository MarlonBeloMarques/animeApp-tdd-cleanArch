export const onEndReachedThresholdStub = 20;

export const layoutMeasurementStub = {
  height: 100,
  width: 100,
};
export const contentSizeStub = {
  width: 100,
  height: 500,
};

export type ContentOffset = {
  x: number;
  y: number;
};

export type ContentSize = {
  width: number;
  height: number;
};

export type LayoutMeasurement = {
  width: number;
  height: number;
};

type ParamsMockOnEndReached = {
  contentOffset: ContentOffset;
  contentSize: ContentSize;
  layoutMeasurement: LayoutMeasurement;
  waitForEndReached: boolean;
};

export const mockOnEndReached = ({
  contentOffset,
  contentSize,
  layoutMeasurement,
  waitForEndReached,
}: ParamsMockOnEndReached) => {
  const mockedOnEndReached = jest
    .fn()
    .mockImplementation((onEndReachedThreshold) => {
      if (waitForEndReached) {
        return false;
      }

      return (
        layoutMeasurement.height + contentOffset.y >=
        contentSize.height - onEndReachedThreshold
      );
    });

  return mockedOnEndReached;
};
