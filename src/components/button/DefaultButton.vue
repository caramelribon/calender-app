<template>
  <div class="btn-default" :style="`background: ${color}`">
    <slot></slot>
  </div>
</template>
<script lang="ts">
export default {
  name: 'DefaultButton',
  props: {
    color: {
      type: String,
      required: true
    }
  }
}
</script>
<style scoped>
.btn-default {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 18px 32px;
  gap: 10px;

  width: 256px;
  height: 60px;
  border: 1px solid #000000;
  border-radius: 30px;

  flex: none;
  order: 4;
  flex-grow: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
}
</style>