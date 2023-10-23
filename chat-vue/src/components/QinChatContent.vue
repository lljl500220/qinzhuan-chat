<script setup lang="ts">
import {useChatStore} from "../store/modules/chat";
import {storeToRefs} from "pinia";
import {onMounted, ref} from "vue";
import {useUserInfoStore} from "../store/modules/userInfo";
import {fromEvent, Observable} from "rxjs";

const chatStore = useChatStore();
const userInfoStore = useUserInfoStore()

const {activeRoomInfo} = storeToRefs(chatStore);

const sendMsgStr = ref("");
const sendMsg = () => {
  chatStore.sendFriendMsg(sendMsgStr.value)
}

const emojis = ['😃', '😄', '😁', '😆', '😅', '🤣', '😂', '🫠', '😉', '😊', '😇', '🥰', '😍', '🤩', '😘', '😗', '😚', '🥲',
  '🤗', '🫡', '🤐']
const getEmoji = (emoji: string) => {
  sendMsgStr.value += emoji
}

// const uploadImg = (file:File) => {
//   const formData = new FormData();
//   formData.append('file', file);
//   axios.post('http://localhost:3000/users/upload', formData, {
//     headers: {
//       Authorization: 'Bearer ' + getToken(),
//     }
//   }).then((res: any) => {
//     console.log(res)
//   })
// }
const chooseFileInput = ref<HTMLInputElement>()
const inputObs = ref<Observable<any>>()
onMounted(() => {
  inputObs.value = fromEvent(chooseFileInput.value as HTMLInputElement, 'change')
  inputObs.value.subscribe(() => {

  })
})
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
        <ul v-for="msg in activeRoomInfo.messageList" :key="msg.id">
          <li class="msg-item" v-if="msg.userId !== userInfoStore.user.userId">
            <div class="msg-avatar">
              {{ activeRoomInfo.friendName[0] || activeRoomInfo.groupName[0] }}
            </div>
            <div class="msg-content">
              {{ msg.content }}
            </div>
          </li>
          <li class="msg-item right" v-else>
            <div class="msg-content">
              {{ msg.content }}
            </div>
            <div class="msg-avatar">
              {{ activeRoomInfo.friendName[0] || activeRoomInfo.groupName[0] }}
            </div>
          </li>
        </ul>
      </el-scrollbar>
    </div>
    <div class="chat-content-input">
      <el-popover placement="top" :width="200" trigger="click">
        <template #reference>
          <span>😀😇</span>
        </template>
        <div style="display: flex;flex-wrap: wrap;gap: 4px ">
          <div style="font-family: sans-serif" @click="getEmoji(item)" v-for="item in emojis" :key="item">{{ item }}</div>
        </div>
      </el-popover>
      <input type="file" ref="chooseFileInput"/>
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
    padding: 10px;
    box-sizing: border-box;
    height: calc(100% - 70px - 100px);
    overflow: hidden;

    ul {
      padding: 0;
      margin: 0;;
    }

    .msg-item {
      font-family: sans-serif;
      list-style-type: none;
      display: flex;
      flex-direction: row;
      gap: 10px;
      margin-bottom: 20px;

      .msg-avatar {
        width: 40px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        background-color: antiquewhite;
        border-radius: 50%;
      }

      .msg-content {
        line-height: 36px;
        padding: 2px 15px;
        box-sizing: border-box;
        background-color: antiquewhite;
        border-radius: 10px;
      }
    }

    .right {
      justify-content: flex-end;

      .msg-avatar {
        background-color: rgb(51, 161, 236);
      }

      .msg-content {
        background-color: rgb(51, 161, 236);
      }
    }
  }

  &-input {
    position: relative;
    height: 100px;
    width: 100%;
    box-shadow: 0 -7px 7px -7px #5E5E5E;
    display: flex;
    font-family: sans-serif;

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