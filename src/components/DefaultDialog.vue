<template>
  <teleport to="body">
    <div class="modal" v-show="isOpen" @click="close"></div>
    <div class="modal-content" v-show="isOpen">
      <div class="modal-body">
        <slot name="body" :onClose="close"></slot>
      </div>
      <div class="modal-footer">
        <slot name="footer" :onClose="close"></slot>
      </div>
    </div>
    <div v-if="isOpen"></div>
  </teleport>
</template>
<script lang="ts">
export default {
  props: {
    isOpen: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {}
  },
  emits: ['close'],
  methods: {
    close: function () {
      this.$emit('close')
    }
  }
}
</script>
<style scoped>
.modal {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 900;
}

.modal-content {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.5);
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  width: 500px;
  height: auto;
  border-radius: 20px;
  padding: 20px;
  padding: 40px 50px;
  z-index: 900;
}

.modal-body {
  width: 100%;
}

.modal-footer {
  padding-top: 20px;
}
</style>