// ChatScreen.js
import React, { useState, useRef } from 'react';
import { 
  View, 
  TextInput, 
  TouchableOpacity, 
  Text, 
  FlatList, 
  StyleSheet, 
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Image
} from 'react-native';

import ChatBubble from './ChatBubble.js';
import { sendChatPrompt } from '../api/api.js';

const ChatUI = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const flatListRef = useRef(null);

  const handleSend = async () => {
    if (inputMessage.trim() === '' || isLoading) return;

    const userMessage = { 
      id: Date.now(), 
      text: inputMessage.trim(), 
      sender: 'user' 
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInputMessage('');
    setIsLoading(true);

    setTimeout(() => flatListRef.current.scrollToEnd({ animated: true }), 100);

    try {
      const geminiText = await sendChatPrompt(newMessages);

      const geminiMessage = {
        id: Date.now() + 1,
        text: geminiText,
        sender: 'model',
      };

      setMessages(prev => [...prev, geminiMessage]);
      
    } catch (error) {
      console.error("Erro na conversação:", error);
      const errorMessage = {
        id: Date.now() + 1,
        text: "Erro: Não foi possível conectar ao Gemini.",
        sender: 'model',
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      setTimeout(() => flatListRef.current.scrollToEnd({ animated: true }), 100);
    }
  };

  const renderItem = ({ item }) => (
    <ChatBubble sender={item.sender} text={item.text} />
  );

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        style={styles.chatContainer}
        contentContainerStyle={{ paddingHorizontal: 10, paddingBottom: 20 }}
      />
      
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color="#007AFF" />
          <Text style={styles.loadingText}>Sumé está pensando...</Text>
        </View>
      )}

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputMessage}
          onChangeText={setInputMessage}
          placeholder="Digite sua mensagem..."
          editable={!isLoading}
          multiline
        />
        <TouchableOpacity
          style={[styles.sendButton, { opacity: isLoading ? 0.5 : 1 }]}
          onPress={handleSend}
          disabled={isLoading}
        >
          
            <Image source={require('../assets/icon-send.png')} />
          
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: Platform.OS === 'android' ? 30 : 0,
  },
  chatContainer: {
    flex: 1, 
  },
  loadingContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    marginLeft: 10,
    marginBottom: 5,
    alignItems: 'center',
  },
  loadingText: {
    marginLeft: 5,
    color: '#888',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#DDD',
    backgroundColor: '#FFF',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    maxHeight: 100,
    backgroundColor: '#F0F0F0',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 10,
    fontSize: 16,
  },
  sendButton: {
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default ChatUI;