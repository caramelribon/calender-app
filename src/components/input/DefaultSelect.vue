<template>
  <div>
    <label>
      <span v-if="label" class="input-label">{{ label }}</span
      ><select class="input-field" :value="value" @change="updateValue">
        <option v-for="(option, index) in options" :key="index" :value="option.value">{{ option.label }}</option>
      </select>
    </label>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    label: {
      type: String,
      required: true
    },
    value: {},
    options: {
      type: Array<{label: string, value: any}>,
      required: true
    }
  },
  emits: ['input'],
  mounted() {
    this.$emit("input", this.options[0].value);
  },
  methods: {
    updateValue: function (e: Event) {
      this.$emit('input', (<HTMLInputElement>e.target).value)
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