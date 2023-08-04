import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Home } from '../screens/Home';

const MainStack = createNativeStackNavigator();

export const MainNavigation = () => {
  return (
    <MainStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <MainStack.Screen name="Home" component={Home} />
    </MainStack.Navigator>
  );
};
