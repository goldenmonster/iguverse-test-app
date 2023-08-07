import { View, Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { useAuth } from '../providers/AuthProvider';
import { HomeStackParamList } from '../types';

export const Home = ({
  navigation,
}: NativeStackScreenProps<HomeStackParamList, 'Home'>) => {
  const { user } = useAuth();
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
      }}
    >
      <Text style={{ fontSize: 35, fontWeight: 'bold', marginBottom: 20 }}>
        Welcome
      </Text>
      <Text style={{ fontSize: 25, marginBottom: 15 }}>{user.name}</Text>
      <Text style={{ fontSize: 25 }}>{user.email}</Text>
    </View>
  );
};
