<script setup lang="ts">
import {io} from "socket.io-client";
import {useUserInfoStore} from "../store/modules/userInfo.ts";
import {addFriendApi} from "../api/friend.ts";
const user = useUserInfoStore().user

const socket = io("http://localhost:3000/events",{
  query:{
    userId:user.userId
  }
}); // 根据你的服务器地址和端口进行修改

socket.on("connect", () => {
  console.log("Connected to server");
});

socket.on('disconnectMessage', data => console.warn(data));
socket.on('addFriend',(data:string)=>{
  console.log(data)
})
const sendMsg = () => {
}
const addFriend = () => {
  addFriendApi({userId:user.userId,friendId:'6518703c-f08e-4133-8197-6ec9b06e4cec'})
}
</script>

<template>
  <section>
    <el-button @click="sendMsg">发送信息</el-button>
    <el-button @click="addFriend">加好友</el-button>
  </section>
</template>

<style scoped>

</style>