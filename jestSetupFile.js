import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';
import {  } from 'react-native';

jest.mock('react-native-flash-message', () => {
  const React = require('react');
  const { View } = require('react-native');

  return {
    hideMessage: () => jest.fn(),
    showMessage: () => jest.fn(),
    __esModule: true,
    default: jest.fn().mockReturnValue(<View testID='flash_message_id'></View>),
  };
});

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);
jest.mock('react-native-vector-icons/MaterialIcons', () => 'Icon');

