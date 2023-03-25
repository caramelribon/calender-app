<template>
  <DefaultDialog :isOpen="isOpen" @close="close">
    <template #body>
      <DefaultInput
        label="カレンダー名"
        :value="name"
        @input="(val) => (name = val)"
        placeholder="カレンダー名"
      />
      <DefaultSelect
        style="margin-top: 10px"
        label="ステータス"
        :value="status"
        @input="(val) => (status = val)"
        placeholder="カレンダー名"
        :options="statusOptions"
      />
      <ColorInput
        :value="color"
        @input="
          (val) => {
            color = val
          }
        "
        style="margin-top: 10px"
        label="カラー"
      ></ColorInput>
      <DefaultTextArea
        style="margin-top: 10px"
        label="詳細"
        :value="description"
        @input="(val) => (description = val)"
        placeholder="カレンダーの詳細"
      />
    </template>
    <template #footer>
      <div style="display: flex; justify-content: center">
        <DefaultButton color="#BADF73">カレンダーを作成</DefaultButton>
      </div>
    </template>
  </DefaultDialog>
</template>

<script lang="ts">
import ColorInput from '@/components/input/ColorInput.vue'
import DefaultDialog from './DefaultDialog.vue'
import DefaultInput from '@/components/input/DefaultInput.vue'
import DefaultSelect from '@/components/input/DefaultSelect.vue'
import DefaultTextArea from '@/components/input/DefaultTextArea.vue'
import DefaultButton from '@/components/button/DefaultButton.vue'
export default {
  components: {
    DefaultDialog,
    DefaultInput,
    DefaultSelect,
    ColorInput,
    DefaultTextArea,
    DefaultButton
  },
  props: {
    isOpen: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      name: '',
      status: 0,
      color: undefined,
      description: '',
      statusOptions: [
        { label: '非公開', value: 0 },
        { label: '閲覧のみ可能', value: 1 },
        { label: '編集可能', value: 2 }
      ]
    }
  },
  methods: {
    close() {
      this.$emit('close')
    }
  }
}
</script>

<style>
</style>