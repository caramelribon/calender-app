<template>
  <div>
    <label>
      <span v-if="label" class="input-label">{{ label }}</span
      ><textarea class="input-field" :value="value" @input="onInput" :placeholder="placeholder"></textarea>
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
    },
    placeholder: {
      type: String
    }
  },
  emits: ['input'],
  methods: {
    onInput: function (e: Event) {
      this.$emit('input', (<HTMLInputElement>e.target).value)
        console.log((<HTMLInputElement>e.target).value);
        console.log(this.value);
    }
  }
}
</script>

<style scoped>
.input-label {
  display: block;
  font-family: 'Noto Sans JP';
  font-style: normal;
  font-weight: 100;
  font-size: 20px;
  line-height: 100%;
  color: #000000;
  margin-bottom: 10px;
}

.input-field {
  background: #f5f5f5;
  border: 1px solid #d2d1d1;
  border-radius: 10px;
  height: 60px;
  width: 100%;
  font-size: 20px;
}
</style>