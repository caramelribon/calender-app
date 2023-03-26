<template>
  <div>
    <label class="label">
      <span v-if="label" class="input-label">{{ label }}</span
      ><input class="input-field" :value="value" @input="onInput" type="datetime-local" />
    </label>
  </div>
</template>
  
  <script lang="ts">
export default {
  props: {
    label: {
      type: String
    },
    value: {
      type: String
    }
  },
  emits: ['input'],
  methods: {
    onInput: function (e: Event) {
      this.$emit('input', (<HTMLInputElement>e.target).value)
    }
  }
}
</script>
  
  <style scoped>
.label {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.input-label {
  display: inline-block;
  font-weight: 100;
  font-size: 20px;
  line-height: 100%;
  color: #000000;
}

.input-field {
  display: inline-block;
  height: 60px;
  font-size: 20px;
  position: relative;
  border: 0;
  box-sizing: border-box;
}

input::-webkit-datetime-edit {
  border-radius: 10px;
  height: 100%;
  align-items: center;
  display: flex;
}

input[type='datetime-local' i]::-webkit-calendar-picker-indicator {
  background: rgb(139, 208, 255) url(/src/assets/calendar_month.svg) no-repeat center/80%;
  border-radius: 10px;
  height: 40px;
  width: 40px;
  opacity: 1;
  background-repeat: no-repeat;
  outline: none;
  padding: 2px;
  cursor: pointer;
}
</style>