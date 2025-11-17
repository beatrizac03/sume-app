// ChatBubble.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ChatBubble = ({ sender, text }) => {
  const isUser = sender === 'user';
  
  return (
    <View style={[
      styles.bubbleContainer,
      isUser ? styles.userContainer : styles.geminiContainer
    ]}>
      <Text style={isUser ? styles.userText : styles.geminiText}>
        {text}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  bubbleContainer: {
    maxWidth: '80%',
    marginVertical: 4,
    borderRadius: 12,
    padding: 10,
    elevation: 1,
  },
  userContainer: {
    alignSelf: 'flex-end',
    backgroundColor: '#EEEEEE',
  },
  geminiContainer: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFFFFF',
  },
  userText: {
    color: '#000000',
    fontSize: 16,
  },
  geminiText: {
    color: '#000000',
    fontSize: 16,
  },
});

export default ChatBubble;