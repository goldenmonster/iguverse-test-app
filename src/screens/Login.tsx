import { View, Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { AuthStackParamList } from '../types';

export const Login = ({
  navigation,
}: NativeStackScreenProps<AuthStackParamList, 'Login'>) => {
  return (
    <View>
      <Text>Login</Text>
    </View>
  );
};
