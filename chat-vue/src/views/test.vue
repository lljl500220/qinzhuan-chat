<script setup lang="ts">
import {ref} from "vue";
import {findUserApi} from "../api/friend"
import {debounceTime, distinctUntilChanged, filter, from, Subject, switchMap} from 'rxjs';

const inputStr = ref('')
const inputObs = new Subject<string>()
inputObs.pipe(
    debounceTime(1000),
    filter((value: string) => value !== ''),
    distinctUntilChanged(),
    switchMap( (value: string) => {
       return from(findUserApi({data: value}))
    })).subscribe((result: any) => {
  console.log(result)
})
const input = (value: string) => {
  inputObs.next(value)
}

// const debounce = (func: Function, duration = 1000) => {
//   let timerId = 0;
//   return function (...arg:any) {
//     clearTimeout(timerId)
//     timerId = setTimeout(() => {
//       func.apply(this,arg)
//     }, duration)
//   }
// }
//
// const new_input = debounce(input)
</script>

<template>
  <el-input placeholder="测试" v-model="inputStr" @input="input"/>
  <img src="/loading.gif"/>
</template>

<style scoped lang="scss">
body,html{
  background-color: #f072e6;
}
</style>