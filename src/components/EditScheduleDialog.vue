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
        style="margin-top: 15px"
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
        <DefaultButton color="#8BD0FF" @click="save">保存</DefaultButton>
        <DefaultButton color="#D0BFFF" @click="deleteSchedule">削除</DefaultButton>
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
import type { PropType } from 'vue'
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
    },
    schedule: {
      type: Object as PropType<Schedule>,
      required: true
    }
  },
  emits: ['close', 'save', 'delete'],
  data() {
    return {
      title: this.schedule.title,
      color: this.schedule.color,
      start: '',
      end: '',
      description: this.schedule.description,
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
      this.title = this.schedule.title
      this.color = this.schedule.color
      this.start = this.toISOStringWithTimezoneOffset(this.schedule.start)
      this.end = this.toISOStringWithTimezoneOffset(this.schedule.end)
      this.description = this.schedule.description
    },
    close() {
      this.$emit('close')
    },
    save() {
      const start = new Date(this.start)
      const end = new Date(this.end)
      const all =
        start.getFullYear() === end.getFullYear() &&
        start.getMonth() === end.getMonth() &&
        start.getDate() === end.getDate()
      const newSchedule: Schedule = {
        title: this.title,
        color: this.color,
        start: start,
        end: end,
        description: this.description,
        scheduleId: this.schedule.scheduleId,
        all: all,
        createUser: this.schedule.createUser
      }
      this.$emit('save', newSchedule)
      this.close()
    },
    deleteSchedule: function () {
      this.$emit('delete')
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