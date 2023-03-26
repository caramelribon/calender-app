<template>
  <div class="main__contents">
    <p class="en">Log in</p>
    <p class="jp fw1 mt04">ログインしてください</p>
    <div class="form mt30">
      <div class="colum">
        <label class="fw1">email</label>
        <input
          id="email"
          v-model="email"
          class="mt10"
          type="email"
          autocomplete="email"
          required
          placeholder="example.com"
        />
      </div>
      <div class="mt36 colum">
        <label class="fw1">password</label>
        <input
          class="mt10"
          id="password"
          v-model="password"
          type="password"
          autocomplete="current-password"
          required
          placeholder="6文字以上の英数字"
        />
      </div>
      <DefaultButton class="fw1 login-btn" color="#FFF57F" @click="login">Log in</DefaultButton>
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

const login = async () => {
  const userData = {
    email: email.value,
    password: password.value
  }
  await userStore.signIn(userData)
  alert('ログインしました')
  router.push('/')
}
</script>

<style scoped>
.en {
  color: var(--yellow);
}
.login-btn {
  margin: 36px auto 0 auto;
  width: 200px;
}
</style>
