import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AppNavigation } from './src/navigation';
import { AuthProvider } from './src/providers/AuthProvider';

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <AppNavigation />
      </AuthProvider>
    </SafeAreaProvider>
  );
}
