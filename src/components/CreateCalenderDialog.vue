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
        <DefaultButton color="#BADF73" @click="save">カレンダーを作成</DefaultButton>
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
import type { Calendar } from '@/values/Calendar'
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
  emits: ['close', 'save'],
  data() {
    return {
      name: '',
      status: 0,
      color: 0,
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
    },
    save() {
      const calendar: Omit<Calendar, 'calenderId' | 'createUser' | 'lastUpdateUser'> = {
        name: this.name,
        openState: this.status,
        color: this.color,
        description: this.description,
        createdAt: new Date(),
        updatdAt: new Date(),
        schedules: []
      }
      this.$emit('save', calendar)
      this.close()
    }
  }
}
</script>

<style>
</style>