import { View, Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { HomeStackParamList } from '../types';

export const Home = ({
  navigation,
}: NativeStackScreenProps<HomeStackParamList, 'Home'>) => {
  return (
    <View>
      <Text>Home</Text>
    </View>
  );
};
