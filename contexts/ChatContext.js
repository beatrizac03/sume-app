import { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { v4 as uuid } from "uuid";

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

  // CRIAR CHAT (igual seu utils)
  async function createChat(question, answer) {
    const newChat = {
      id: uuid(),
      history: [
        {
          id: uuid(),
          role: "user",
          content: question,
          dateTime: new Date().toISOString()
        },
        {
          id: uuid(),
          role: "assistant",
          content: answer,
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
          history: [...chat.history, { question, answer }]
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
        deleteChat
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}
