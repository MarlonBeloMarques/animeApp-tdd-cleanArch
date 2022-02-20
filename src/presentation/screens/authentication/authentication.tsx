import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

type Props = {
  onPressAuthentication: () => void;
};

const Authentication: React.FC<Props> = ({ onPressAuthentication }) => {
  return (
    <View>
      <View>
        <Text testID="title_id">ANIMEAPP</Text>
        <Text testID="subtitle_id">アニメ</Text>
      </View>
      <Text testID="description_id">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </Text>
      <TouchableOpacity
        testID="authentication_id"
        onPress={onPressAuthentication}
      >
        <Text>{`LET'S BEGIN`}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Authentication;
