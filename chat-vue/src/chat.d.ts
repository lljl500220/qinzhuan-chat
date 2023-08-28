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
    id:string
    groupId?:string
    friendId?:string
    friendName?:string
    groupName?:string
    messageList:Message[]
}

interface Friend{
    userId:string
    username:string
}

interface User {
    userId: string
    username: string
    avatar: string
}

interface FindAllFriendRes {
    code:number
    friends:User[]
}