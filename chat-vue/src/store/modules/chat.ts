import {defineStore} from "pinia";
import {ref} from "vue";
import store from "../index";
import {io} from "socket.io-client";
import userInfoStoreHook from "./userInfo";

export const useChatStore = defineStore('chatStore', () => {
    const chatList = ref<ChatItem[]>([]) //会话列表
    const activeRoom = ref({id: 'luolj'})
    const socket = ref<any>(null) //会话对象
    //初始化socket
    const initSocket = () => {
        const userInfo = userInfoStoreHook()
        //连接socket.io服务
        socket.value = io("http://localhost:3000/events", {
            query: {
                userId: userInfo.user.userId
            }
        }); // 根据你的服务器地址和端口进行修改
        socket.on("connect", () => {
            console.log("Connected to server");
        });
        socket.on('disconnectMessage', (data: any) => console.warn(data));
        //收到添加好友的通知
        socket.on('addFriend', (data: string) => {
            console.log(data)
        })
        //收到群聊消息，包括私聊
        socket.on('message', (data: string) => {
            console.log(data)
        })
    }
    //初始化已经加入的群聊列表和好友列表
    const initChatList = () => {
        chatList.value = [
            {
                friendId: 'luolj',
                friendName: 'luolj',
                messageList: []
            }, {
                groupId: 'qinzhuan',
                groupName: '秦篆聊天室',
                messageList: []
            },
        ]
        setTimeout(() => {
            chatList.value.push({
                groupId: 'cat',
                groupName: '瞎猫聊天室',
                messageList: []
            })
            chatList.value[0].messageList.unshift({
                content: "aaa", id: "", messageType: "string", time: "10:50", userId: ""
            })
        }, 5000)
    }
    return {chatList, activeRoom, initChatList, initSocket}
})

export default function chatStoreHook() {
    return useChatStore(store)
}