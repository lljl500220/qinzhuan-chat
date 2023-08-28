<script setup lang="ts">
import {Plus, Search} from "@element-plus/icons-vue";
import {ref} from "vue";
import QinChatList from "../components/QinChatList.vue";

const searchWord = ref('')
</script>

<template>
  <div class="chat">
    <div class="chat-my"></div>
    <div class="chat-friend">
      <div class="chat-friend-search">
        <div class="chat-friend-search-input">
          <el-input
              v-model="searchWord"
              class="w-50 m-2"
              placeholder=""
              :prefix-icon="Search as any"
          />
        </div>
        <div class="chat-friend-search-add">
          <el-icon>
            <Plus/>
          </el-icon>
        </div>
      </div>
      <div class="chat-friend-list">
        <qin-chat-list/>
      </div>
    </div>
    <div class="chat-room"></div>
  </div>
</template>

<style scoped lang="scss">
.chat {
  width: 900px;
  height: 600px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  overflow: hidden;
  outline: var(--chat-deauft-color) 1px solid;

  &-my {
    height: 100%;
    width: 60px;
    background: rgb(46, 46, 46);
  }

  &-friend {
    height: 100%;
    width: 300px;
    background: rgb(231,231,231);

    &-search {
      width: 100%;
      height: 70px;
      background: #fff;
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      align-items: center;
      gap: 10px;

      .chat-friend-search-input {
        padding: 10px;

        :deep(.el-input__wrapper) {
          border-radius: 0;
          background-color: var(--chat-deauft-color);
          transition: all .2s;
        }

        :deep(.is-focus) {
          background-color: #fff;
          box-shadow: 0 0 0 1px var(--chat-deauft-color) inset;
        }
      }

      &-add {
        height: 30px;
        width: 30px;
        border-radius: 4px;
        background-color: var(--chat-deauft-color);
        color: #fff;
        font-size: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all .2s;

        &:hover {
          background-color: rgb(129, 126, 126);
          color: #000;
        }
      }
    }

    &-list {
      height: calc(100% - 70px);
    }
  }

  &-room {
    height: 100%;
    width: 540px;
    background: #c50617;
  }
}
</style>