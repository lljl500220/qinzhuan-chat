import { defineStore } from "pinia";
import { ref } from "vue";
import store from "../index";
import { io } from "socket.io-client";
import userInfoStoreHook from "./userInfo";
import { findAllFriendApi } from "../../api/friend.ts";

export const useChatStore = defineStore("chatStore", () => {
  const chatList = ref<ChatItem[]>([]); //会话列表
  const activeRoomInfo = ref<ChatItem>({ id: "", messageList: [] });
  const activeRoom = ref({ id: "" });
  const socket = ref<any>(null); //会话对象
  //初始化socket
  const initSocket = () => {
    const userInfo = userInfoStoreHook();
    //连接socket.io服务
    socket.value = io("http://localhost:3000/events", {
      query: {
        userId: userInfo.user.userId
      }
    }); // 根据你的服务器地址和端口进行修改
    socket.value.on("connect", () => {
      console.log("Connected to server");
    });
    socket.value.on("disconnectMessage", (data: any) => console.warn(data));
    // 收到群聊消息，包括私聊
    socket.value.on("sendMsg", (data: string) => {
      console.log(data);
    });
  };
  const joinRoom = (id: string) => {
    socket.value.emit("joinRoom", id);
  };
  const sendMsg = (data: string) => {
    socket.value.emit("sendMsg", { room: activeRoomInfo.value.id, msg: data });
  };
  //初始化已经加入的群聊列表和好友列表
  const initChatList = () => {
    findAllFriendApi().then((res: FindAllFriendRes) => {
      const userInfo = userInfoStoreHook();
      for (let friend of res.friends) {
        chatList.value.push({ friendId: friend.userId, friendName: friend.username, messageList: [], id: [userInfo.user.userId, friend.userId].sort().join("-") });
      }
    });
  };
  const getActiveInfo = () => {
    for (let chat of chatList.value) {
      if (chat.friendId === activeRoom.value.id || chat.groupId === activeRoom.value.id) {
        activeRoomInfo.value = chat;
        joinRoom(chat.id);
        break;
      }
    }
  };
  return { chatList, activeRoom, activeRoomInfo, initChatList, initSocket, getActiveInfo, joinRoom, sendMsg };
});

export default function chatStoreHook() {
  return useChatStore(store);
}