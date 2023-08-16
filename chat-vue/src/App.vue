<script setup lang="ts">

import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

const local = zhCn
</script>

<template>
  <el-config-provider :locale="local">
  <router-view/>
  </el-config-provider>
</template>

<style scoped>
</style>
