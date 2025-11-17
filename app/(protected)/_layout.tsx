import React, { useEffect } from 'react';
import { Stack, useRouter } from 'expo-router';
import { useAuth } from '../../src/hooks/useAuth';

export default function ProtectedLayout() {
  const { state } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!state.isAuthenticated) {
      router.replace('/login');
    }
  }, [state.isAuthenticated]);

  return <Stack screenOptions={{ headerShown: false }} />;
}


// import React, { useEffect } from 'react';
// import { useRouter } from 'expo-router';
// import { useAuth } from '../../src/hooks/useAuth';
// import { View, ActivityIndicator } from 'react-native';

// export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
//   const { state } = useAuth();
//   const router = useRouter();

//   useEffect(() => {
//     if (!state.isAuthenticated) {
//       router.replace('/login');
//     }
//   }, [state.isAuthenticated]);

//   if (!state.isAuthenticated) {
//     return (
//       <View
//         style={{
//           flex: 1,
//           justifyContent: 'center',
//           alignItems: 'center',
//           backgroundColor: '#0A0F20',
//         }}
//       >
//         <ActivityIndicator color="#5AAFFF" size="large" />
//       </View>
//     );
//   }

//   return <>{children}</>;
// }
