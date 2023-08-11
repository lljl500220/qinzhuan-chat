<script setup lang="ts">
import {io} from "socket.io-client";
import {useUserInfoStore} from "../store/modules/userInfo";
import {addFriendApi, findUserAndGroup} from "../api/friend";
import {onMounted, ref} from "vue";
import Res = HttpType.Res;

const user = useUserInfoStore().user

const socket = io("http://localhost:3000/events", {
  query: {
    userId: user.userId
  }
}); // 根据你的服务器地址和端口进行修改

socket.on("connect", () => {
  console.log("Connected to server");
});

socket.on('disconnectMessage', data => console.warn(data));
socket.on('addFriend', (data: string) => {
  console.log(data)
})
const sendMsg = () => {
}
const addFriend = () => {
  addFriendApi({userId: user.userId, friendId: '6518703c-f08e-4133-8197-6ec9b06e4cec'})
}

interface ListItem {
  value: string
  label: string
}

const list = ref<ListItem[]>([])
const options = ref<ListItem[]>([])
const value = ref<string[]>([])
const loading = ref(false)

onMounted(() => {
  list.value = states.map((item) => {
    return {value: `value:${item}`, label: `label:${item}`}
  })
})

const remoteMethod = (query: string) => {
  findUserAndGroup({data:query}).then((res:Res)=>{
    console.log(res)
  })
}

const states = [
  'Alabama',
  'Alaska',
  'Arizona',
  'Arkansas',
  'California',
  'Colorado',
  'Connecticut',
  'Delaware',
  'Florida',
  'Georgia',
  'Hawaii',
  'Idaho',
  'Illinois',
  'Indiana',
  'Iowa',
  'Kansas',
  'Kentucky',
  'Louisiana',
  'Maine',
  'Maryland',
  'Massachusetts',
  'Michigan',
  'Minnesota',
  'Mississippi',
  'Missouri',
  'Montana',
  'Nebraska',
  'Nevada',
  'New Hampshire',
  'New Jersey',
  'New Mexico',
  'New York',
  'North Carolina',
  'North Dakota',
  'Ohio',
  'Oklahoma',
  'Oregon',
  'Pennsylvania',
  'Rhode Island',
  'South Carolina',
  'South Dakota',
  'Tennessee',
  'Texas',
  'Utah',
  'Vermont',
  'Virginia',
  'Washington',
  'West Virginia',
  'Wisconsin',
  'Wyoming',
]

</script>

<template>
  <section class="main">
    <div class="main-bg"></div>
    <div class="main-content">
      <div class="header">
        <div class="search-box">
          找好友/群聊
          <el-select
              v-model="value"
              multiple
              filterable
              remote
              placeholder="id/名称"
              reserve-keyword
              :remote-method="remoteMethod"
              :loading="loading"
          >
            <el-option-group
                key="用户"
                label="用户"
            >
              <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
              />
            </el-option-group>
            <el-option-group
                key="群聊"
                label="群聊"
            >
              <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
              />
            </el-option-group>
          </el-select>
        </div>
        <div class="sys-title">
          秦篆
        </div>
      </div>
      <div class="left">
        <el-scrollbar>
          <p v-for="item in 20" :key="item" class="scrollbar-demo-item">{{ item }}</p>
        </el-scrollbar>
      </div>
      <div class="msg-content">主体</div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.main {
  position: absolute;
  height: 100%;
  width: 100%;
  min-width: 1000px;
  min-height: 700px;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;

  &-bg {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100vw;
    background: url("../../public/pc_bg.webp");
    background-size: cover;
    -webkit-filter: blur(5px);
    -moz-filter: blur(5px);
    -o-filter: blur(5px);
    -ms-filter: blur(5px);
    filter: blur(5px);
    z-index: -1;
  }

  &-content {
    position: relative;
    height: 500px;
    width: 900px;

    .header {
      width: 100%;
      height: 50px;
      background-image: linear-gradient(90deg, rgba(255, 248, 134, 0.2), rgba(240, 134, 230, 0.2));
      position: relative;
      display: flex;
      align-items: center;
      box-shadow: 0 -1px rgba(255, 255, 255, 0.5) inset;

      .search-box {
        display: flex;
        align-items: center;
        gap: 5px;
        font-size: 16px;
        color: #ffffff;

        :deep(.el-select__input) {
          color: #ffffff;
          --el-input-border-color: #ffffff;
          --el-input-focus-border-color: #ffffff;
          --el-input-height: 28px;
        }

        :deep(.el-input__inner) {
          --el-input-height: 28px;
        }

        :deep(.el-input__wrapper) {
          --el-input-focus-border-color: #ffffff;
          --el-select-input-focus-border-color: #ffffff;
          --el-input-height: 28px;
          background: transparent;

          &:focus {
            background-color: transparent !important;
          }

          &::-webkit-input-placeholder {
            color: #ffffff;
          }
        }

      }

      .sys-title {
        position: absolute;
        right: 10px;
        letter-spacing: 10px;
        color: #ffffff;
        font-size: 20px;
        text-shadow: #FC0 1px 0 10px;
      }
    }

    .left {
      width: 150px;
      height: 450px;
      background: rgba(255, 255, 255, 0.2);
      box-shadow: -1px 0 rgba(255, 255, 255, 0.5) inset;
    }

    .msg-content {
      position: absolute;
      right: 0;
      bottom: 0;
      width: 750px;
      height: 450px;
      //float: right;
      background: rgba(255, 255, 255, 0.2);
    }
  }
}
</style>