<script setup lang="ts">
import QinChatListItem from "./QinChatListItem.vue";
import {useChatStore} from "../store/modules/chat";
import {storeToRefs} from "pinia";

const chatStore = useChatStore()
chatStore.initChatList()
const {chatFriendList,chatGroupList} = storeToRefs(chatStore)
</script>

<template>
  <el-scrollbar>
    <qin-chat-list-item v-for="item in chatFriendList" :item="item" :key="item.friendId"/>
    <qin-chat-list-item v-for="item in chatGroupList" :item="item" :key="item.groupId"/>
  </el-scrollbar>
</template>

<style scoped lang="scss">

</style>