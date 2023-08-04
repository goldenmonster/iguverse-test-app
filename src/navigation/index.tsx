import { NavigationContainer } from '@react-navigation/native';

import { useAuth } from '../providers/AuthProvider';

import { AuthNavigation } from './AuthNavigation';
import { MainNavigation } from './MainNavigation';

export const AppNavigation = () => {
  const { isLoggedIn } = useAuth();
  return (
    <NavigationContainer>
      {!isLoggedIn && <AuthNavigation />}
      {isLoggedIn && <MainNavigation />}
    </NavigationContainer>
  );
};
