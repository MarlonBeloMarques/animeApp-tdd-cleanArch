type EventDataParams = {
  contentOffset: {
    x: number;
    y: number;
  };
};

export const mockEventData = (params: EventDataParams) => {
  return {
    nativeEvent: {
      contentOffset: params.contentOffset,
      contentSize: {
        height: 500,
        width: 100,
      },
      layoutMeasurement: {
        height: 100,
        width: 100,
      },
    },
  };
};
