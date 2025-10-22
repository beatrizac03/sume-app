import React, { useEffect, useRef } from 'react';
import { Text, SafeAreaView, StyleSheet, View, Animated } from 'react-native';

export default function HomeScreen() {
  return (
    <>
      <View style={styles.container}>

        <View style={styles.header}>
          <Text style={styles.title}>Sumé</Text>
        </View>

        <View style={styles.chatContainer}>

        </View>

        <View style={styles.textareaContainer}>

        </View>

      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 30,
    paddingBottom: 30
  },
  header: {
    height: '10%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'blue'
  },
  chatContainer: {
    height: '65%',
    borderColor: 'green',
    borderWidth: 1,
    width: '100%',
  },
  textareaContainer: {
    height: '25%',
    borderColor: 'red',
    borderWidth: 1,
    width: '100%'
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#242852',
  },
});