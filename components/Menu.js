import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';

import { useState, useContext } from 'react';
import { ChatContext } from '../contexts/ChatContext.js';

import { TouchableOpacity, Modal, View, Text, ScrollView, SafeAreaView  } from 'react-native';

export default function Menu({ style }) {

    const [visible, setVisible] = useState(false);

    const { chats, setCurrentChatId, deleteChat } = useContext(ChatContext);
    return(
        <>
         <TouchableOpacity style={style} onPress={() => setVisible(true)} value={visible}>
            <Entypo name="menu" size={35} color="#242852"  />  
         </TouchableOpacity>

         <Modal
            visible={visible}
            animationType="fade"
            onRequestClose={() => setVisible(false)}
        >
            <SafeAreaView style={{ flex: 1, backgroundColor: '#242852', width: '80%' }}>
                <ScrollView style={{ flex: 1, padding: 13, backgroundColor: '#242852' }}>
                    <View>
                        <TouchableOpacity style={style} onPress={() => setVisible(false)}>
                            <Entypo name="menu" size={35} color="#fff"  />  
                        </TouchableOpacity>

                        <TouchableOpacity style={{ position: 'absolute', right: 15, top: 5 }}>
                            <Ionicons name="create-outline" size={25} color="#fff" />
                        </TouchableOpacity>
                    </View>

                    <Text style={{ fontSize: 22, color: '#fff', margin: 20, marginTop: 80 }}>Chats</Text>

                    {chats.map(chat => (
                        <TouchableOpacity 
                            key={chat.id}
                            style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 15, borderBottomWidth: 1, borderBottomColor: '#444' }}
                            onPress={() => {
                                setCurrentChatId(chat.id);
                                setVisible(false);
                            }}
                        >
                            <Text style={{ fontSize: 18, color: '#fff' }}>{chat.label}</Text>
                            <TouchableOpacity onPress={() => deleteChat(chat.id)}>
                                <Ionicons name="trash-outline" size={20} color="#fff" />
                            </TouchableOpacity>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </SafeAreaView>
        </Modal>
        </>
    );
}