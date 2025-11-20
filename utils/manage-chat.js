import { v4 as uuid } from "uuid";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function loadChats() {
  const json = await AsyncStorage.getItem("@chats");
  return json ? JSON.parse(json) : [];
}

export async function createChat(firstQuestion, firstAnswer) {

    const chats = await loadChats();

    const newChat = {
        id: uuid(),
        label: firstQuestion,
        history: [
        { question: firstQuestion, answer: firstAnswer }
        ]
    };

    const updated = [...chats, newChat];

    await AsyncStorage.setItem("@chats", JSON.stringify(updated));

    return newChat;

}

export async function addMessageToChat(chatId, question, answer) {
  let chats = await loadChats();

  chats = chats.map(chat => {
    if (chat.id === chatId) {
      return {
        ...chat,
        history: [...chat.history, { question, answer }]
      };
    }
    return chat;
  });

  await AsyncStorage.setItem("@chats", JSON.stringify(chats));
}

export async function getChat(chatId) {
  const chats = await loadChats();
  return chats.find(c => c.id === chatId);
}

export async function deleteChat(chatId) {
  const chats = await loadChats();
  const updated = chats.filter(c => c.id !== chatId);

  await AsyncStorage.setItem("@chats", JSON.stringify(updated));
}