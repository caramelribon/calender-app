<template>
  <div class="main__contents">
    <p class="en">Sign up</p>
    <p class="jp fw1 mt04">アカウント登録してください</p>
    <div class="form mt30">
      <div class="colum">
        <label class="fw1">name</label>
        <input
          id="name"
          v-model="userName"
          class="mt10"
          type="name"
          required
          autocomplete="name"
          placeholder="nickname"
        />
      </div>
      <div class="mt30 colum">
        <label class="fw1">email</label>
        <input
          id="email"
          v-model="email"
          class="mt10"
          type="email"
          required
          autocomplete="email"
          placeholder="example.com"
        />
      </div>
      <div class="mt30 colum">
        <label class="fw1">password</label>
        <input
          class="mt10"
          id="password"
          v-model="password"
          type="password"
          autocomplete="current-password"
          placeholder="6文字以上の英数字"
        />
      </div>
      <DefaultButton class="fw1 login-btn" color="#FECBCC" @click="login">Sign up</DefaultButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import DefaultButton from '@/components/button/DefaultButton.vue'
import { useUserStore } from '@/stores/user'
const router = useRouter()
const userStore = useUserStore()

const email = ref('')
const password = ref('')
const userName = ref('')

const login = async () => {
  const userData = {
    email: email.value,
    password: password.value,
    name: userName.value
  }
  await userStore.signUp(userData)
  alert('アカウント登録しました')
  router.push('/')
}
</script>

<style scoped>
.en {
  color: var(--pink);
}
.login-btn {
  margin: 36px auto 0 auto;
  width: 200px;
}
</style>
