import {defineStore} from "pinia";
import {ref} from "vue";
import store from "../index";

interface User {
    userId: string
    username: string
    avatar: string
}

export const useUserInfoStore = defineStore('userInfo', () => {
    const user = ref<User>({
        avatar: "", userId: "", username: ""
    })

    const setUser = (data: User) => {
        user.value = data
    }

    return {user, setUser}
})

export default function userInfoStoreHook() {
    return useUserInfoStore(store)
}