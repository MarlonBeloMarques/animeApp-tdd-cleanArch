import React from 'react';

type Params<C> = {
  screen: React.ComponentType<C>;
  screenProps?: C;
};

export const renderWithParams = <C extends Record<string, unknown>>(
  params: Params<C>,
) => {
  return React.createElement(params.screen, params.screenProps);
};
