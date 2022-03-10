import { render } from '@testing-library/react-native';
import Main from '~/main';
import { Authentication } from '~/presentation/screens';
import { renderWithParams } from '../ui/helpers';

describe('Main', () => {
  test('should initial with Authentication screen', () => {
    const { UNSAFE_getByType } = render(renderWithParams({ screen: Main }));
    expect(UNSAFE_getByType(Authentication)).toBeTruthy();
  });
});
