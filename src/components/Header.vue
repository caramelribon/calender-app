<template>
  <header>
    <div class="header">
      <p class="fs48 lh100 app-name" @click="toHome">Calenshare</p>
      <div class="btn-group" v-if="!userStore.user">
        <DefaultButton class="fw1" color="#fff57f" @click="toLogin">login</DefaultButton>
        <DefaultButton class="fw1" color="#fecbcc" @click="toSinup"> sign up</DefaultButton>
      </div>
      <div v-else>
        <DefaultButton class="fw1 calender-btn" color="#d0bfff" @click="toLogout"
          >log out</DefaultButton
        >
      </div>
    </div>
  </header>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import DefaultButton from '@/components/button/DefaultButton.vue'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const userStore = useUserStore()

const toHome = () => {
  router.push('/')
}
const toLogin = () => {
  router.push('/login')
}
const toSinup = () => {
  router.push('/signup')
}
const toLogout = () => {
  router.push('/logout')
}
</script>

<style scoped>
header {
  width: 100%;
  height: 92px;
  padding: 16px 32px;
}
.app-name {
  color: var(--white);
  font-weight: 900;
  -webkit-text-stroke: 1px #000000;
  cursor: pointer;
}
.btn-group {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 36px;
}
.header {
  display: flex;
  justify-content: space-between;
}
</style>
