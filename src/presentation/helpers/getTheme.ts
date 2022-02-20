import { colors, radius, spacings, typography } from '~/presentation/themes';

const theme = {
  ...colors,
  ...radius,
  ...typography,
  ...spacings,
};

const getTheme = <K extends keyof typeof theme>(key: K): typeof theme[K] =>
  theme[key];

export default getTheme;
