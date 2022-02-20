import React from 'react';
import Authentication from './authentication';

type Props = {
  onPressAuthentication: () => void;
};

const AuthenticationContainer: React.FC<Props> = ({
  onPressAuthentication,
}) => {
  return <Authentication onPressAuthentication={onPressAuthentication} />;
};

export default AuthenticationContainer;
