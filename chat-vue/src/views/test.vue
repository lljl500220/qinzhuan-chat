<script setup lang="ts">
import {ref} from "vue";
import {findUserApi} from "../api/friend"
import {debounceTime, distinctUntilChanged, filter, from, Subject, switchMap} from 'rxjs';

const inputStr = ref('')
const inputObs = new Subject<string>()
inputObs.pipe(
    debounceTime(500),
    filter((value: string) => value !== ''),
    distinctUntilChanged(),
    switchMap( (value: string) => {
       return from(findUserApi({data: value}))
    })).subscribe((result: any) => {
  console.log(result)
})
const input = (value: string) => {
  inputObs.next("1")
  inputObs.next("2")
  setTimeout(()=>{
    inputObs.next("3")
  },1000)
}
</script>

<template>
  <el-input placeholder="测试" v-model="inputStr" @input="input"/>
  <img src="/loading.gif"/>

  <input type="file"/>
</template>

<style scoped lang="scss">
body,html{
  background-color: #f072e6;
}
</style>