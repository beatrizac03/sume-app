import React from 'react';
import { Text, SafeAreaView, StyleSheet, View, Platform } from 'react-native';

import ChatUI from '../../components/ChatUI.js'; 
import Menu from '../../components/Menu.js';

export default function HomeScreen() {

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>

        <View style={styles.header}>
          <Menu style={styles.menu}  />
          <Text style={styles.title}>Sumé IA</Text>
        </View>

        <View style={styles.chatWrapper}>
          <ChatUI />
        </View>

        <View style={styles.footer}></View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start', 
  },
  header: {
    height: 60,
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    paddingHorizontal: 15,
    position: 'relative',
  },
  menu: {
    position: 'absolute',
    left: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#242852',
  },
  chatWrapper: {
    flex: 1,
  },
  footer: {
    height: 0,
  },
});