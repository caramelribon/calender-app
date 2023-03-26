<template>
  <div>
    <label>
      <span v-if="label" class="input-label">{{ label }}</span>
      <div style="display: flex; justify-content: space-between">
        <select class="input-field" :value="value" @change="updateValue">
          <option v-for="(option, index) in options" :key="index" :value="option.value">
            {{ option.label }}
          </option>
        </select>
        <div class="display-color" :style="`background: ${displayColor}`"></div>
      </div>
    </label>
  </div>
</template>
  
  <script lang="ts">
import { colors, getColorData, type Color } from '@/utils/color'
export default {
  props: {
    label: {
      type: String,
      required: true
    },
    value: {
      type: Number
    }
  },
  data() {
    return {
      options: colors
    }
  },
  emits: ['input'],
  mounted() {
    if (!this.value) {
      this.$emit('input', this.options[0].value)
    }
  },
  computed: {
    displayColor: function () {
      return getColorData(this.value)
    }
  },
  methods: {
    updateValue: function (e: Event) {
      this.$emit('input', parseInt((<HTMLInputElement>e.target).value))
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
  width: 80%;
  display: inline-block;
  font-size: 20px;
}

.display-color {
  height: 60px;
  width: 60px;
}
</style>