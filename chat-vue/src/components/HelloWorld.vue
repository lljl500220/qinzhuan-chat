<script setup lang="ts">
import { ref } from 'vue'
import {io} from 'socket.io-client'
defineProps<{ msg: string }>()

const count = ref(0)

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
  <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" @click="sendMsg">count is {{ count }}</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >, the official Vue + Vite starter
  </p>
  <p>
    Install
    <a href="https://github.com/vuejs/language-tools" target="_blank">Volar</a>
    in your IDE for a better DX
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
