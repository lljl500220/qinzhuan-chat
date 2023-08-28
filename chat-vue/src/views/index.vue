<script setup lang="ts">
import {Plus, Search} from "@element-plus/icons-vue";
import { onMounted, ref, watch } from "vue";
import QinChatList from "../components/QinChatList.vue";
import { useUserInfoStore } from "../store/modules/userInfo";
import { findUserApi,addFriendApi } from "../api/friend";
import { ElMessage } from "element-plus";
import { useChatStore } from "../store/modules/chat";
import QinChatContent from "../components/QinChatContent.vue";

const searchGroupWord = ref('')
const searchFriendWord = ref('')

const userInfoStore = useUserInfoStore()
const chatStore = useChatStore()

const showFindForm = ref(false)

const friendList = ref<Friend[]>([])
interface FindUserRes{
  code:number
  data:{
    users:[]
  },
  message:string
}
watch(() => searchFriendWord.value, (n:string) => {
  if (n !== ''){
    findUserApi({data:n}).then((res:FindUserRes)=>{
      friendList.value = res.data.users
    })
  }
});
const addFriend = (id:string,name:string) =>{
  addFriendApi({userId:userInfoStore.user.userId,friendId:id}).then((res:FindUserRes)=>{
    if (res.code === 0){
      ElMessage.success('添加成功，去发起会话吧！')
      chatStore.chatList.unshift({
        id:[userInfoStore.user.userId,id].sort().join('-'),
        friendId: id,
        friendName: name,
        messageList: []
      })
    }else {
      ElMessage.warning(res.message)
    }
  })
}
onMounted(() => {
  chatStore.initSocket()
});
</script>

<template>
  <div class="chat">
    <div class="chat-my">
      <div class="chat-my-name">
        {{userInfoStore.user.username[0]}}
      </div>
    </div>
    <div class="chat-friend">
      <div class="chat-friend-search">
        <div class="chat-friend-search-input">
          <el-input
              v-model="searchGroupWord"
              class="w-50 m-2"
              placeholder=""
              :prefix-icon="Search as any"
          />
        </div>
        <div class="chat-friend-search-add">
          <el-icon @click="showFindForm = true">
            <Plus/>
          </el-icon>
        </div>
      </div>
      <div class="chat-friend-list">
        <qin-chat-list/>
      </div>
    </div>
    <div class="chat-room">
      <qin-chat-content></qin-chat-content>
    </div>
  </div>
  <el-dialog title="加好友" v-model="showFindForm" top="30vh" width="500px">
    <el-input v-model="searchFriendWord" clearable placeholder="id或用户名"></el-input>
    <div class="search-friend-list">
      <ul>
        <li v-for="friend in friendList">
          <span>{{friend.username}}</span>
          <el-button type="primary" size="small" round plain @click="addFriend(friend.userId,friend.username)">加好友</el-button>
        </li>
      </ul>
    </div>
  </el-dialog>
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
    text-align: center;
    &-name{
      color: #fff;
      font-size: 44px;
      text-shadow: #FFF 1px 0 10px,#FFF 1px 0 10px,#FFF 1px 0 10px;
    }
  }

  &-friend {
    height: 100%;
    width: 300px;
    background: rgb(231,231,231);
    box-sizing: border-box;
    border-right: rgb(231,231,231) 1px solid;

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
  }
}
.search-friend-list{
  width: 100%;
  ul{
    padding: 10px;
  }
  li{
    width: 100%;
    list-style-type: none;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
}
</style>