import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import {PaperProvider} from "react-native-paper";
import FlashMessage from "react-native-flash-message";
import { AuthProvider } from '@/context/AuthContext';


import {QueryClient, QueryClientProvider} from '@tanstack/react-query';


// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                retry: 2,
            },
        },
    })

    const whiteTheme = {
        ...DefaultTheme,
        colors: {
            ...DefaultTheme.colors,
            background: 'white',
        }
    };

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
      <PaperProvider>
        <AuthProvider>
          <ThemeProvider value={whiteTheme}>
              <QueryClientProvider client={queryClient}>
              <Stack>
                <Stack.Screen name="index" options={{ headerShown: false }} />
              </Stack>
              </QueryClientProvider>
            <FlashMessage position="top" />
            <StatusBar style="auto" />
          </ThemeProvider>
        </AuthProvider>
      </PaperProvider>
  );
}
