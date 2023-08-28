<script setup lang="ts">
import {computed, onMounted, PropType, ref, watch} from "vue";
import {useChatStore} from "../store/modules/chat";

const chatStore = useChatStore()
//色彩集合
const colors = ['#D2357D', '#806D9E', '#2D2E36', '#93B5CF', '#2376B7', '#66A9C9', '#1A6840', '#A4CAB6', '#FCD337', '#DDC871']
//头像dom
const avatar: any = ref()

const props = defineProps({
  item: {
    type: Object as PropType<ChatItem>,
    required: true
  }
})

const name = props.item.groupName ? props.item.groupName : props.item.friendName //群组名或者好友名
const id = (props.item.groupId ? props.item.groupName : props.item.friendId) || '' //群组id或者好友id
const isGroup = props.item.groupName //是否是群组
const color = colors[Math.floor(Math.random() * 10)] //随机色
const isDot = ref(false) //是否有新消息
watch(props.item?.messageList, () => {
  isDot.value = true
})
const isActive = computed(() => {
  return id === chatStore.activeRoom.id
}) //是否选中

/**
 * 作者：luolj
 * 时间：2023/08/28 17:27:03
 * 功能：改变当前组件的选中状态
 */
const changeActive = () => {
  chatStore.activeRoom.id = id
  chatStore.getActiveInfo()
}

onMounted(() => {
  avatar.value.style.background = color //头像颜色
})
</script>

<template>
  <div class="chat-friend-item" :class="{'is-active':isActive}" @click="changeActive">
    <el-badge :is-dot="isDot">
      <div ref="avatar" class="item-avatar">{{ name[0] }}</div>
    </el-badge>
    <div class="item-info">
      <div class="item-name-time">
        <span>{{ name }}</span>
        <el-tag size="small" :color="color">{{ isGroup ? '群组' : '个人' }}</el-tag>
        <span>{{ item.messageList[0]?.time }}</span>
      </div>
      <div class="item-preview">
        {{ item.messageList[0]?.messageType === 'img' ? '[图片]' : item.messageList[0]?.content }}
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.chat-friend-item {
  height: 60px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  padding: 0 10px;
  box-sizing: border-box;
  align-items: center;
  justify-content: space-between;

  &:hover {

  }

  .item-avatar {
    height: 50px;
    width: 50px;
    line-height: 50px;
    text-align: center;
    font-size: 30px;
    color: #fff;
    border-radius: 4px;
    font-family: DengKuanYYG, sans-serif;
  }

  .item-info {
    width: calc(100% - 55px);
    height: 50px;

    span:nth-child(3) {
      float: right;
    }

    :deep(.el-tag__content) {
      color: #fff;
    }
  }
  transition: all .4s;
  &:hover{
    background-color: rgb(217, 215, 215);
  }
}
.is-active{
  background-color: rgb(208, 202, 202) !important;
}

span{
  user-select: none;
}
</style>