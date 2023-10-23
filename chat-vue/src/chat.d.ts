interface FriendMessage {
  id: string
  room: string
  userId: string
  userName: string
  content: string
  messageType: string
  time: string
}

interface GroupMessage {
  id: string
  userId: string
  groupId: string
  content: string
  messageType: string
  time: string
}

interface friendChatItem {
  id:string
  room: string
  friendId: string
  friendName: string
  messageList: FriendMessage[]
}
interface groupChatItem {
  room: string
  groupId: string
  groupName: string
  messageList: GroupMessage[]
}

interface Friend {
  userId: string
  username: string
}

interface User {
  userId: string
  username: string
  avatar: string
}

interface FindAllFriendRes {
  code: number
  friends: User[]
}
