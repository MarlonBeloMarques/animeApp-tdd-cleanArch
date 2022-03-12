import { Theme } from '@react-navigation/native';
import { getTheme } from '~/presentation/helpers';

const primary = getTheme('primary');
const text = getTheme('text');

const contextTheme: Theme = {
  dark: false,
  colors: {
    primary: primary,
    background: primary,
    card: primary,
    text: text,
    border: primary,
    notification: primary,
  },
};

export default contextTheme;
