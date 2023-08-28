interface Message {
    id:string
    userId:string
    friendId?:string
    groupId?:string
    content:string
    messageType:string
    time:string
}
interface ChatItem {
    groupId?:string
    friendId?:string
    friendName?:string
    groupName?:string
    messageList:Message[]
}