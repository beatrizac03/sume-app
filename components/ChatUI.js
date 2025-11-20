// ChatScreen.js
import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  TextInput, 
  TouchableOpacity, 
  Text, 
  FlatList, 
  StyleSheet, 
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform
} from 'react-native';

import { useContext } from "react";
import { ChatContext } from "../contexts/ChatContext.js";
import uuid from 'react-native-uuid';

import ChatBubble from './ChatBubble.js';
import { sendChatPrompt } from '../api/api.js';

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const ChatUI = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { createChat, currentChatId, addMessageToChat, chats } = useContext(ChatContext);

  useEffect(() => {
    if (!currentChatId) {
      setMessages([]);
      return;
    }

    const chat = chats.find(c => c.id === currentChatId);
    if (chat) {
      setMessages(chat.history);
    }
  }, [currentChatId, chats]);
  
  const flatListRef = useRef(null);

  async function handleSendPrompt() {
    // caso a msg esteja vazia ou esteja carregando, não faz nada
    if (inputMessage.trim() === '' || isLoading) return;
    
    const messageText = inputMessage.trim();

    const userMessage = { 
      id: uuid.v4(), 
      text: messageText, 
      sender: 'user',
      dateTime: new Date().toISOString() 
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInputMessage('');
    setIsLoading(true);

    setTimeout(() => flatListRef.current.scrollToEnd({ animated: true }), 100);
    
    // passa o historico completo de mensagens (const local) para o Gemini
    await requestGemini(newMessages, messageText);
  };

  async function requestGemini(newMessages, questionText) {
    try {
      const geminiText = await sendChatPrompt(newMessages);

      const geminiMessage = {
        id: uuid.v4(),
        text: geminiText,
        sender: 'model',
        dateTime: new Date().toISOString()
      };

      setMessages(prev => [...prev, geminiMessage]);

      // se não houver chat atual, cria um novo
      if (!currentChatId) {
        await createChat(questionText, geminiText);
      } else {
        // adiciona a mensagem ao chat existente
        await addMessageToChat(currentChatId, questionText, geminiText);
      }
      
    } catch (error) {
      console.error("Erro na conversação:", error);
      const errorMessage = {
        id: uuid.v4(),
        text: "Erro: Não foi possível conectar ao Gemini.",
        sender: 'model',
        dateTime: new Date().toISOString()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      setTimeout(() => flatListRef.current.scrollToEnd({ animated: true }), 100);
    }
  }

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
        keyExtractor={item => item.id}
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
          placeholder="Faça uma pergunta à Sumé..."
          placeholderTextColor="#888"
          editable={!isLoading}
          multiline
        />
        <TouchableOpacity
          style={[styles.sendButton, { opacity: isLoading ? 0.5 : 1 }]}
          onPress={handleSendPrompt}
          disabled={isLoading}
        >

          <MaterialCommunityIcons name="send-circle" size={35} color="#61BC50" />
          
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
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#FFF',
    alignItems: 'center',
    height: '20%',
    width: '100%'
  },
  input: {
    flex: 1,
    backgroundColor: '#F0F0F0',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 15,
    fontSize: 16,
    height: '100%'
  },
  sendButton: {
    padding: 5,
    position: 'absolute',
    right: 25,
    bottom: 15,
  },
  sendButtonImage: {
    width: 30,
    height: 30,
  }
});

export default ChatUI;