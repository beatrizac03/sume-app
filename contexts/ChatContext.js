import { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from 'react-native-uuid';

export const ChatContext = createContext();

export function ChatProvider({ children }) {
  const [chats, setChats] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null);

  // Carregar chats ao abrir o app
  useEffect(() => {
    loadChats();
  }, []);

  async function loadChats() {
    const saved = await AsyncStorage.getItem("@chats");
    if (saved) setChats(JSON.parse(saved));
  }

  async function saveChats(newChats) {
    setChats(newChats);
    await AsyncStorage.setItem("@chats", JSON.stringify(newChats));
  }

  async function createEmptyChat() {
    const newChat = {
      id: uuid.v4(),
      history: []
    };

    const updated = [...chats, newChat];
    await saveChats(updated);

    setCurrentChatId(newChat.id);
    return newChat;
  }

  // CRIAR CHAT (igual seu utils)
  async function createChat(question, answer) {
    const newChat = {
      id: uuid.v4(),
      history: [
        {
          id: uuid.v4(),
          sender: "user",
          text: question,
          dateTime: new Date().toISOString()
        },
        {
          id: uuid.v4(),
          sender: "model",
          text: answer,
          dateTime: new Date().toISOString()
        },
      ]
    };

    const updated = [...chats, newChat];
    await saveChats(updated);

    setCurrentChatId(newChat.id);
    return newChat;
  }

  // ADICIONAR MENSAGEM A UM CHAT ESPECIFICO
  async function addMessageToChat(chatId, question, answer) {
    const updated = chats.map(chat => {
      if (chat.id === chatId) {
        return {
          ...chat,
          history: [
            ...chat.history,
            {
              id: uuid.v4(),
              sender: "user",
              text: question,
              dateTime: new Date().toISOString()
            },
            {
              id: uuid.v4(),
              sender: "model",
              text: answer,
              dateTime: new Date().toISOString()
            }
          ]
        };
      }
      return chat;
    });

    await saveChats(updated);
  }

  function getChat(chatId) {
    return chats.find(c => c.id === chatId);
  }

  async function deleteChat(chatId) {
    const updated = chats.filter(c => c.id !== chatId);
    await saveChats(updated);

    // se o chat deletado era o atual, zera
    if (currentChatId === chatId) {
      setCurrentChatId(null);
    }
  }

  return (
    <ChatContext.Provider
      value={{
        chats,
        currentChatId,
        setCurrentChatId,
        createChat,
        addMessageToChat,
        getChat,
        deleteChat,
        createEmptyChat
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}
