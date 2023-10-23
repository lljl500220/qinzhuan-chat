import { defineStore } from 'pinia'
import { ref } from 'vue'
import store from '../index'
import { io } from 'socket.io-client'
import userInfoStoreHook from './userInfo'
import { findAllFriendApi } from '../../api/friend'

const userInfo = userInfoStoreHook()
export const useChatStore = defineStore('chatStore', () => {
  const chatFriendList = ref<friendChatItem[]>([]) // 好友会话列表
  // const chatGroupList = ref<groupChatItem[]>([]) // 群聊会话列表
  const activeRoomInfo = ref<friendChatItem | groupChatItem>({
    friendId: '',
    friendName: '',
    groupId: '',
    groupName: '',
    room: '',
    messageList: []
  })
  const activeRoom = ref({ room: '' })
  const socket = ref<any>(null) // 会话对象
  // 初始化socket
  const initSocket = () => {
    // 连接socket.io服务
    socket.value = io('http://localhost:3000/events', {
      query: {
        userId: userInfo.user.userId
      }
    }) // 根据你的服务器地址和端口进行修改
    socket.value.on('connect', () => {
      console.log('Connected to server')
    })
    socket.value.on('disconnectMessage', (data: any) => { console.warn(data) })
    // 收到群聊消息，包括私聊
    socket.value.on('sendFriendMsg', (data: any) => {
      setFriendMsg(data.room, data)
    })
  }
  // 加入一个房间
  const joinRoom = (id: string) => {
    socket.value.emit('joinRoom', id)
  }
  // 发送好友消息
  const sendFriendMsg = (data: string, messageType = 'str') => {
    socket.value.emit('sendFriendMsg',
      {
        room: activeRoomInfo.value.id,
        content: data,
        userId: userInfo.user.userId,
        username: userInfo.user.username,
        messageType
      })
  }
  // 获取到消息放入队列
  const setFriendMsg = (id: string, data) => {
    for (let i = 0; i < chatFriendList.value.length; i++) {
      if (chatFriendList.value[i].id === id) {
        chatFriendList.value[i].messageList.push(data)
      }
    }
  }
  // 初始化已经加入的群聊列表和好友列表
  const initChatList = () => {
    findAllFriendApi().then((res: FindAllFriendRes) => {
      for (const friend of res.friends) {
        chatFriendList.value.push({
          friendId: friend.userId,
          friendName: friend.username,
          messageList: [],
          id: [userInfo.user.userId, friend.userId].sort().join('-')
        })
      }
    })
  }
  const getActiveInfo = () => {
    for (const chat of chatFriendList.value) {
      if (chat.friendId === activeRoom.value.id || chat.groupId === activeRoom.value.id) {
        activeRoomInfo.value = chat
        joinRoom(chat.id)
        break
      }
    }
  }
  return { chatFriendList, activeRoom, activeRoomInfo, initChatList, initSocket, getActiveInfo, sendFriendMsg, joinRoom, setFriendMsg }
})

export default function chatStoreHook () {
  return useChatStore(store)
}
