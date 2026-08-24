import React, { useState, useEffect, useMemo } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator, View } from 'react-native';

import Onboarding from './screens/Onboarding';
import Profile from './screens/Profile';
import Home from './screens/Home';

const Stack = createNativeStackNavigator();
export const AuthContext = React.createContext();

export default function App() {
  const [state, setState] = useState({
    isLoading: true,
    isOnboardingCompleted: false,
  });

  useEffect(() => {
    (async () => {
      try {
        const value = await AsyncStorage.getItem('user');
        if (value !== null) {
          setState({ isLoading: false, isOnboardingCompleted: true });
        } else {
          setState({ isLoading: false, isOnboardingCompleted: false });
        }
      } catch (e) {
        setState({ isLoading: false, isOnboardingCompleted: false });
      }
    })();
  }, []);

  const authContext = useMemo(
    () => ({
      completeOnboarding: async (data) => {
        try {
          await AsyncStorage.setItem('user', JSON.stringify(data));
          setState({ isLoading: false, isOnboardingCompleted: true });
        } catch (e) {
          console.error(e);
        }
      },
      logOut: async () => {
        try {
          await AsyncStorage.clear();
          setState({ isLoading: false, isOnboardingCompleted: false });
        } catch (e) {
          console.error(e);
        }
      },
    }),
    []
  );

  if (state.isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#495E57" />
      </View>
    );
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator>
          {state.isOnboardingCompleted ? (
            <>
              <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
              <Stack.Screen name="Profile" component={Profile} />
            </>
          ) : (
            <Stack.Screen name="Onboarding" component={Onboarding} options={{ headerShown: false }} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
