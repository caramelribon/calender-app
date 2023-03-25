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
          placeholder="6文字以上の英数字"
        />
      </div>
      <DefaultButton class="fw1 login-btn" color="#FFF57F">Log in</DefaultButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineComponent } from 'vue'
import DefaultButton from '@/components/button/DefaultButton.vue'
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
