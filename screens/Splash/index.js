import React, { useEffect, useRef } from 'react';
import { Text, SafeAreaView, StyleSheet, View, Animated } from 'react-native';

export default function SplashScreen( {navigation} ) {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animação: aparece em 1s
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    // Depois de 3s, vai pra Home
    const timer = setTimeout(() => {
      navigation.navigate('home');
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Sumé</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#242852',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    color: '#fff',
    fontFamily: 'DMSans', 
    fontWeight: '700', 
    fontSize: 45,
    color: '#fff',
  }
});