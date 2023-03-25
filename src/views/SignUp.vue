<template>
  <div class="main__contents">
    <CreateCalenderDialogVue :is-open="true" @close="()=>{}"></CreateCalenderDialogVue>
  </div>
</template>

<script lang="ts">
import CreateCalenderDialogVue from '@/components/CreateScheduleDialog.vue';
import { defineComponent } from 'vue'

export default defineComponent({
    components: { CreateCalenderDialogVue }
})
</script>

<style scoped></style>
