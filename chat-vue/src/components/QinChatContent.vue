<script setup lang="ts">
import { useChatStore } from "../store/modules/chat";
import { storeToRefs } from "pinia";
import { ref } from "vue";

const chatStore = useChatStore();

const { activeRoomInfo } = storeToRefs(chatStore);

const sendMsgStr = ref("");
const sendMsg = () => {
  chatStore.sendMsg(sendMsgStr.value)
}
</script>

<template>
  <div class="chat-content">
    <div class="chat-content-header">
      <span>
        {{ activeRoomInfo.friendName || activeRoomInfo.groupName }}
      </span>
    </div>
    <div class="chat-content-msg-list">
      <el-scrollbar>
        <ul v-for="item in 20">
          <li>
            sadasda
          </li>
        </ul>
      </el-scrollbar>
    </div>
    <div class="chat-content-input">
      <el-input
        v-model="sendMsgStr"
        :rows="3"
        type="textarea"
        placeholder=""
      />
      <div class="send-btn" @click="sendMsg"></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.chat-content {
  width: 100%;
  height: 100%;

  &-header {
    height: 70px;
    line-height: 70px;
    padding-left: 20px;
    font-size: 24px;
    box-shadow: 0 7px 7px -7px #5E5E5E;
  }

  &-msg-list {
    width: 100%;
    padding: 0 10px 10px 10px;
    box-sizing: border-box;
    height: calc(100% - 70px - 100px);
    overflow: hidden;
  }

  &-input {
    position: relative;
    height: 100px;
    width: 100%;
    box-shadow: 0 -7px 7px -7px #5E5E5E;

    .send-btn {
      width: 24px;
      height: 24px;
      background: url("/send.svg");
      background-size: cover;
      position: absolute;
      right: 10px;
      top: 50px;
      cursor: pointer;
    }

    :deep(.el-textarea) {
      position: absolute;
      bottom: 0px;
    }

    :deep(.el-textarea__inner) {
      box-shadow: none;
      box-sizing: border-box;
      border-radius: 0;
      border: #000 1px solid;
    }
  }
}
</style>