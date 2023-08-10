<script setup lang="ts">
import {login, register} from "../api/auth";
import {ref} from "vue";
import {useRouter} from "vue-router";
import {ElMessage} from "element-plus";
import {setToken} from "../utils/cookies";
import {useUserInfoStore} from "../store/modules/userInfo";
import Res = HttpType.Res;

const userInfoStore = useUserInfoStore()
const router = useRouter() //路由对象
const user = ref({ //form实体
  username: '',
  password: ''
})
const tip = ref('')
/**
 * 作者：luolj
 * 时间：2023/08/09 09:51:56
 * 功能：登录
 */
const doLogin = () => {
  login(user.value).then((res: Res) => {
    console.log(res)
    if (res.code === 0) {
      ElMessage({
        type: "success",
        message: "登录成功"
      })
      setToken('token', res.data.token as string)
      userInfoStore.setUser(res.data.user)
      router.push({name: 'index'})
    } else {
      tip.value = res.message as string
    }
  })
}
/**
 * 作者：luolj
 * 时间：2023/08/09 15:50:54
 * 功能：注册
 */
const doRegister = () => {
  register(user.value).then((res: Res) => {
    if (res.code === 0) {
      ElMessage({
        type: "success",
        message: "注册成功，将导航至首页"
      })
      setToken('token', res.data.token as string)
      userInfoStore.setUser(res.data.user)
      router.push({name: 'index'})
    } else {
      tip.value = res.message as string
    }
  })
}
const loginDom: any = ref(null)
const registerDom: any = ref(null)
/**
 * 作者：luolj
 * 时间：2023/08/09 15:51:03
 * 功能：表单切换
 */
const changePanel = (val: number) => {
  if (val === 0) {
    loginDom.value.style.transform = 'rotateY(-180deg)'
    registerDom.value.style.transform = 'rotateY(0deg)'
  } else {
    loginDom.value.style.transform = 'rotateY(0deg)'
    registerDom.value.style.transform = 'rotateY(180deg)'
  }
}
</script>

<template>
  <section>
    <div class="container">
      <div class="action-box">
        <div ref="loginDom" class="login">
          <input class="input-box" v-model="user.username" placeholder="用户名">
          <input class="input-box" v-model="user.password" type="password" placeholder="密码">
          <p class="tip" v-if="tip">{{ tip }}</p>
          <p class="login-btn" @click="doLogin">登录</p>
          <p class="register-btn" @click="changePanel(0)">注册</p>
        </div>
        <div ref="registerDom" class="register">
          <input class="input-box" v-model="user.username" placeholder="用户名">
          <input class="input-box" type="password" v-model="user.password" placeholder="密码">
          <p class="tip" v-if="tip">{{ tip }}</p>
          <p class="register-btn" @click="doRegister">注册</p>
          <p class="login-btn" @click="changePanel(1)">登录</p>
        </div>
      </div>
      <div class="msg-box">
        <p>吾身也有涯，而知也无涯</p>
        <h1>秦篆</h1>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
* {
  margin: 0;
  padding: 0;
}

html, body {
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
}

@-webkit-keyframes masked-animation {
  0% {
    transform: rotateZ(0deg);
  }
  100% {
    transform: rotateZ(360deg);
  }
}

section {
  height: 100vh;
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  min-width: 960px;
  min-height: 600px;

  &:before {
    content: "";
    position: absolute;
    top: -100%;
    left: -50%;
    width: 4096px;
    height: 4096px;
    background-image: linear-gradient(200deg, #fff886, #f072e6);
    animation: masked-animation 10s linear infinite;
  }

  .container {
    position: relative;
    width: 44rem;
    height: 30rem;
    display: flex;
    align-items: center;
    background: rgba(255, 255, 255, 0.2);
    -webkit-backdrop-filter: blur(20px);
    backdrop-filter: blur(20px);

    .action-box {
      position: relative;
      height: 28rem;
      margin-left: 1rem;
      width: 24rem;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 2;

      .input-box {
        border: none;
        outline: none;
        border-bottom: 1px #ffffff solid;
        width: 14rem;
        background: transparent;
        color: #ffffff;
        letter-spacing: 2px;
        font-size: 1rem;
        line-height: 1rem;
        height: 2rem;

        &:focus {
          background-color: transparent !important;
        }

        &::-webkit-input-placeholder {
          color: #ffffff;
        }
      }

      .login {
        position: absolute;
        height: 26rem;
        width: 22rem;
        backface-visibility: hidden;
        transform-style: preserve-3d;
        transition: all .7s ease;
        z-index: 2;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background: rgba(241, 237, 165, 0.3);
        gap: 30px;

        .tip {
          position: absolute;
          left: 4rem;
          color: red;
          font-size: 12px;
        }
      }

      .register {
        @extend .login;
        background: rgba(161, 55, 185, 0.3);
        transform: rotateY(-180deg);
        z-index: 1;
      }

      .login-btn {
        display: block;
        width: 14rem;
        height: 2rem;
        line-height: 2rem;
        color: #ffffff;
        text-align: center;
        letter-spacing: 15px;
        transition: background-color .5s ease;
        cursor: pointer;

        &:hover {
          background-color: rgba(240, 114, 230, 0.4);
        }
      }

      .register-btn {
        @extend .login-btn;

        &:hover {
          background-color: rgba(240, 167, 114, 0.4);
        }
      }
    }

    .msg-box {
      position: absolute;
      height: 26rem;
      width: 18rem;
      right: 1rem;
      z-index: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      //align-items: center;
      font-size: 2rem;
      gap: 2rem;
      writing-mode: vertical-lr;

      h1 {
        color: #dea666;
      }

      p {
        color: #de6f64;
        background-image: -webkit-linear-gradient(top,
            #dea666,
            #b96972 25%,
            #e88a57 50%,
            #804170 75%,
            #a596cd 100%);
        -webkit-text-fill-color: transparent;
        -webkit-background-clip: text;
        -webkit-background-size: 200% 100%;
      }
    }
  }
}
</style>