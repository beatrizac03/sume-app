import React, { useEffect } from 'react';

import { ChatProvider } from './contexts/ChatContext.js';

import { Text, SafeAreaView, StyleSheet } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

import SplashScreen from './screens/Splash/index';
import HomeScreen from './screens/Home/index';

import * as SplashScreenExpo from 'expo-splash-screen';
import { useFonts } from 'expo-font';

SplashScreenExpo.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    DMSans: require('./assets/fonts/DMSans-VariableFont_opsz,wght.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded) SplashScreenExpo.hideAsync();
  }, [fontsLoaded]);

  if (!fontsLoaded) return null; // ainda carregando

  return (
    <ChatProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={defaultOptions}>
          {/* <Stack.Screen name="splash" component={SplashScreen} options={splashOptions} /> */}
          <Stack.Screen name="home" component={HomeScreen} options={homeOptions} />
        </Stack.Navigator>
      </NavigationContainer>
    </ChatProvider>
  );
}

const defaultOptions = {
  // headerStyle: {
  //   backgroundColor: '#24CBAF',
  // },
  // headerTintColor: 'white',
};

const homeOptions = {
  title: '',
  headerShown: false
};

const splashOptions = {
  title: '',
  headerShown: false
};

