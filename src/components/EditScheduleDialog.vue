<template>
  <DefaultDialog :isOpen="isOpen" @close="close">
    <template #body>
      <DefaultInput
        label="タイトル"
        :value="title"
        @input="(val) => (title = val)"
        placeholder="タイトル"
      />
      <DateInput
        style="margin-top: 10px"
        label="開始"
        :value="start"
        @input="(val) => (start = val)"
        placeholder="開始日"
      />
      <DateInput
        style="margin-top: 10px"
        label="終了"
        :value="end"
        @input="(val) => (end = val)"
        placeholder="終了日"
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
      <div style="display: flex; justify-content: space-around">
        <DefaultButton color="#8BD0FF">保存</DefaultButton>
        <DefaultButton color="#D0BFFF">削除</DefaultButton>
      </div>
    </template>
  </DefaultDialog>
</template>

<script lang="ts">
import ColorInput from '@/components/input/ColorInput.vue'
import DefaultDialog from './DefaultDialog.vue'
import DefaultInput from '@/components/input/DefaultInput.vue'
import DateInput from '@/components/input/DateInput.vue'
import DefaultTextArea from '@/components/input/DefaultTextArea.vue'
import DefaultButton from '@/components/button/DefaultButton.vue'
export default {
  components: {
    DefaultDialog,
    DefaultInput,
    DateInput,
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
      title: '',
      status: 0,
      color: undefined,
      start: undefined,
      end: undefined,
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