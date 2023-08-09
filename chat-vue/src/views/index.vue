<script setup lang="ts">
import {io} from "socket.io-client";

const socket = io("http://localhost:3000/events"); // 根据你的服务器地址和端口进行修改

socket.on("connect", () => {
  console.log("Connected to server");
});

socket.on('message', data => console.log(data));
const sendMsg = () => {
  socket.emit("message", "Hello Server",(data:any) => console.log(data)); // 你的消息内容
}
</script>

<template>
  <section>
    <el-button @click="sendMsg">发送信息</el-button>
  </section>
</template>

<style scoped>

</style>