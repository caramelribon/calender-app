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
      <div style="display: flex; justify-content: center">
        <DefaultButton color="#8BD0FF" @click="save">予定を保存する</DefaultButton>
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
import type { Schedule } from '@/values/Schedule'
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
  emits: ['close', 'save'],
  data() {
    return {
      title: '',
      status: 0,
      color: 0,
      start: '',
      end: '',
      description: '',
      statusOptions: [
        { label: '非公開', value: 0 },
        { label: '閲覧のみ可能', value: 1 },
        { label: '編集可能', value: 2 }
      ]
    }
  },
  mounted: function () {
    this.resetData()
  },
  watch: {
    isOpen: function () {
      this.resetData()
    }
  },
  methods: {
    resetData: function () {
      this.title = ''
      this.color = 0
      this.start = this.toISOStringWithTimezoneOffset(new Date())
      this.end = this.toISOStringWithTimezoneOffset(new Date())
      this.description = ''
    },
    close() {
      this.$emit('close')
    },
    save: function () {
      const newSchedule: Omit<Schedule, 'scheduleId' | 'createUser'> = {
        title: this.title,
        color: this.color,
        start: new Date(this.start),
        end: new Date(this.end),
        description: this.description,
        all: false
      }
      this.$emit('save', newSchedule)
      this.close()
    },
    toISOStringWithTimezoneOffset: function (date: Date): string {
      const pad = function (str: string): string {
        return ('0' + str).slice(-2)
      }
      const year = date.getFullYear().toString()
      const month = pad((date.getMonth() + 1).toString())
      const day = pad(date.getDate().toString())
      const hour = pad(date.getHours().toString())
      const min = pad(date.getMinutes().toString())
      const sec = pad(date.getSeconds().toString())

      return `${year}-${month}-${day}T${hour}:${min}:${sec}`
    }
  }
}
</script>

<style>
</style>