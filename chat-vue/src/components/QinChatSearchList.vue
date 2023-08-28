<script setup lang="ts">
import QinChatListItem from "./QinChatListItem.vue";
import {useChatStore} from "../store/modules/chat";

const chatStore = useChatStore()
chatStore.initChatList()
const list = chatStore.chatList
</script>

<template>
  <el-scrollbar>
    <qin-chat-list-item v-for="item in list" :item="item"/>
  </el-scrollbar>
</template>

<style scoped lang="scss">

</style>